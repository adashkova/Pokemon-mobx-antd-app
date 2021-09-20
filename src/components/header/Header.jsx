import React from 'react';
import {  useHistory } from 'react-router-dom';
import MainStore from '../../stores/MainStore';
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';

const Header = () => {
  const history = useHistory();
  const store = MainStore;

  const goToHomePage = () => {
    history.push(`/?page=1`);
    store.page = 1;
    store.name = null;
    store.type = null;
    store.isSearchByType = false;
    store.fetchWithDetails();
  };

  return (
    <>
     

      <PageHeader
        className="site-page-header"
        style={{
          backgroundColor: '#FFEF78',
          marginBottom: '20px',
        }}
        title="Poké-library"
        subTitle="From RESTful Pokémon API"
        onBack={() => goToHomePage()}
      />
    </>
  );
};

export default Header;
