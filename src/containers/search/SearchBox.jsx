import React from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from 'antd';
import 'antd/dist/antd.css';
import MainStore from '../../stores/MainStore';

const SearchBox = observer(() => {
  const { Search } = Input;

  const store = MainStore;

  const onSearch = value => {
    const searchValue = value.toLowerCase();
    if (!value) {
      alert('Please input correct value!');
    }

    if (value && !store.isSearchByType) {
      window.location.assign(`?name=${searchValue}`);
    }

    if (value && store.isSearchByType) {
      window.location.assign(`?type=${searchValue}`);
    }
  };

  return (
    <Search
      placeholder="Search..."
      onSearch={onSearch}
      enterButton
      style={{
        marginBottom: '30px',
        marginRight: '20px',
        width: '30%',
      }}
    />
  );
});

export default SearchBox;
