import { useQuery } from '../../hooks/useQuery';
import PokeCards from '../../containers/PokeCards/PokeCards';
import Header from '../header/Header';
import SearchBox from '../../containers/search/SearchBox';
import PaginationContainer from '../../containers/pagination/PaginationContainer';
import SelectBlock from '../../containers/select/Select';
import ButtonBox from '../button/Button';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  let query = useQuery();

  return (
    <>
      <Header />

      <div className="App">
        <div className="container">
          <div>
            <h3 className="prompt">
              You can search your favorite pokemons by name or select them by
              type. For example: 'BULBASAUR' or 'Poison'
            </h3>
          </div>

          <SearchBox />
          <SelectBlock />
          <ButtonBox page={+query.get('page')} />

          <div className="cards_container">
            <PokeCards />
          </div>
        </div>
        <PaginationContainer page={+query.get('page')} />
      </div>
    </>
  );
}

export default App;
