import React, { useEffect, useState } from 'react';
import { Card, Modal, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import MainStore from '../../stores/MainStore';
import './pokeCards.css';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { runInAction } from 'mobx';

const PokeCards = observer(({ query }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foundPokemon, setFoundPokemon] = useState({});

  const { Meta } = Card;
  const store = MainStore;

  const init = () => {
    store.page = +query.get('page');
    store.name = query.get('name');
    store.type = query.get('type');

    store.fetchWithDetails();
  };
  // GET POKEMONS FROM API

  useEffect(() => {
    runInAction(() => {
      init();
    });
  }, []);

  const pokemons = store.pokemonsData;

  // Modal settings

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Show modal

  const onClickShowDetails = id => {
    const newfoundPokemon = pokemons.filter(i => i.id === id);
    setFoundPokemon(newfoundPokemon);
    showModal();
  };
  const onClickRedirect = () => {
    window.location.assign(`http://localhost:3000/?page=${1}`);
    store.name = null;
    store.type = null;
  };

  return (
    <div className="container_items">
      {pokemons &&
        pokemons.map((item, index) => {
          return store.isLoading ? (
            <Spin tip="Loading..."></Spin>
          ) : (
            <div>
              <Card
                key={`${item.id}${item.name}_${index}`}
                hoverable
                className="card"
                style={{ marginRight: '20px', marginBottom: '10px' }}
                cover={
                  <img
                    alt={`img_${item.name}`}
                    src={
                      item.sprites.front_shiny === null
                        ? item.sprites.front_default
                        : item.sprites.front_shiny
                    }
                  />
                }
              >
                <div className="discription">
                  <Meta title={`Name: ${item.name.toUpperCase()}`} />
                  {`Type: ${item.types.map(t => `${t.type.name} `)}`}
                  <Button
                    key={`${item.id}${item.name}`}
                    onClick={() => onClickShowDetails(item.id)}
                    type="primary"
                  >
                    More...
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      {foundPokemon.length && (
        <Modal
          title={
            foundPokemon.length ? foundPokemon[0].name.toUpperCase() : 'Title'
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            {`Abilities: ${foundPokemon[0].abilities.map(
              i => `${i.ability.name}`
            )}`}
          </p>
          <p>{`Types: ${foundPokemon[0].types.map(i => `${i.type.name}`)}`}</p>
          <p>{`Height: ${foundPokemon[0].height}`}</p>
          <p>{`Weight: ${foundPokemon[0].weight}`}</p>
        </Modal>
      )}
      {pokemons.length === 0 && (
        <div>
          <div>No found pokemon. May be you write wrong name! Try again!</div>

          <Link onClick={() => onClickRedirect()} to={`?page=${store.page}`}>
            Back
          </Link>
        </div>
      )}
    </div>
  );
});

export default PokeCards;
