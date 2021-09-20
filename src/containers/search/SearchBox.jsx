import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import MainStore from '../../stores/MainStore';

const SearchBox = observer(() => {
  const { Search } = Input;
  const store = MainStore;

  const history = useHistory();

  const onSearch = value => {
    const searchValue = value.toLowerCase();
    if (!value) {
      alert('Please input correct value!');
    }

    if (value && !store.isSearchByType) {
      history.push(`?name=${searchValue}`);
      store.type = null;
      store.name = searchValue;
      store.fetchWithDetails();
    }

    if (value && store.isSearchByType) {
      history.push(`?type=${searchValue}`);
      store.name = null;
      store.type = searchValue;
      store.fetchWithDetails();
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
