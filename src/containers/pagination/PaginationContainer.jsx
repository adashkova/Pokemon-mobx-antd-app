import React from 'react';
import MainStore from '../../stores/MainStore';
import { observer } from 'mobx-react-lite';

import { Pagination } from 'antd';
import './pagination.css';
import 'antd/dist/antd.css';

const PaginationContainer = observer(({ page }) => {
  const store = MainStore;

  const initPage = page === 0 ? 1 : +page;

  const setPage = (page, pageSize) => {
    console.log(page, pageSize);
    store.offset = page * 20;
    store.per_page = pageSize;
    window.location.assign(`http://localhost:3000/?page=${page}`);
  };

  return !store.name && !store.type ? (
    <Pagination
      onChange={(page, pageSize) => {
        setPage(page, pageSize);
      }}
      defaultCurrent={initPage}
      total={954}
      pageSize={store.per_page}
      style={{
        marginLeft: '20px',
      }}
    />
  ) : (
    <div></div>
  );
});

export default PaginationContainer;
