import React from 'react';
import MainStore from '../../stores/MainStore';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './pagination.css';

const PaginationContainer = observer(({ page }) => {
  const store = MainStore;

  const history = useHistory();

  const initPage = page === 0 ? 1 : +page;

  const setPage = (page, pageSize) => {
    store.offset = page * 20;
    store.per_page = pageSize;
    history.push(`?page=${page}`);
    store.page = +page;
    store.fetchWithDetails();
  };

  return !store.name && !store.type ? (
    <>
      <div className="ml">
        <Pagination
          onChange={(page, pageSize) => {
            setPage(page, pageSize);
          }}
          defaultCurrent={initPage}
          total={954}
          pageSize={store.per_page}
        />
      </div>
      <div className="margin"></div>
    </>
  ) : (
    <div></div>
  );
});

export default PaginationContainer;
