import React from 'react';
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';

const Header = () => {
  return (
    <PageHeader
      className="site-page-header"
      style={{
        backgroundColor: '#FFEF78',
        marginBottom: '20px',
      }}
      title="Poké-library"
      subTitle="From RESTful Pokémon API"
    />
  );
};

export default Header;
