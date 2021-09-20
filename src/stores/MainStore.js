import { action, makeObservable, observable, runInAction } from 'mobx';
import { service } from '../apiService';

/// Store
class MainStore {
  isLoading = false;
  pokemonsData = [];
  error = undefined;
  name = null;
  type = null;
  isSearchByType = false;
  page = 0;
  referrer = ``;
  per_page = 20;
  offset = 0;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      pokemonsData: observable,
      name: observable,
      type: observable,
      isSearchByType: observable,
      page: observable,
      referrer: observable,
      per_page: observable,
      offset: observable,
      fetchWithDetails: action,
    });
  }

  fetchWithDetails = () => {
    this.isLoading = true;
    this.pokemonsData = [];
    if (
      this.name === null &&
      this.type === null &&
      !this.isSearchByType &&
      !this.page !== 0
    ) {
      this.referrer = `pokemon?limit=${this.per_page}&offset=${
        this.page !== 1 ? this.page * this.per_page : 0 * this.per_page
      }`;
    }
    if (this.name !== null && !this.isSearchByType) {
      this.referrer = `pokemon/${this.name}`;
    }
    if (this.type !== null) {
      this.referrer = `type/${this.type}`;
    }

    return service
      .get(`https://pokeapi.co/api/v2/${this.referrer}`)
      .then(response => {
        if (this.name !== null) {
          runInAction(() => {
            this.pokemonsData.push(response);
            this.isLoading = false;
          });
        } else if (this.type !== null) {
          Promise.all(
            response.pokemon.map(poke =>
              service.get(poke.pokemon.url).then(res => {
                runInAction(() => {
                  this.pokemonsData.push(res);
                  this.isLoading = false;
                });
              })
            )
          );
        } else {
          Promise.all(
            response.results.map(pokemon =>
              service.get(pokemon.url).then(res => {
                runInAction(() => {
                  this.pokemonsData.push(res);
                  this.isLoading = false;
                });
              })
            )
          );
        }
      })
      .catch(err => {
        console.log('Something went wrong. Please restart page)', err);
      });
  };
}

export default new MainStore();
