import { observer } from 'mobx-react-lite';

import MainStore from '../../stores/MainStore';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const ButtonBox = observer(() => {
  const store = MainStore;
  const onClick = e => {
    e.preventDefault();

    window.location.assign(`?page=1`);
    store.name = null;
    store.type = null;
  };

  return (
    <>
      <Button onClick={e => onClick(e)} type="primary">
        Back
      </Button>
    </>
  );
});

export default ButtonBox;
