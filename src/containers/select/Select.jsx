import React from 'react';
import { Select } from 'antd';
import MainStore from '../../stores/MainStore';
import { observer } from 'mobx-react-lite';
import 'antd/dist/antd.css';

const SelectBlock = observer(() => {
  const store = MainStore;
  const { Option } = Select;

  function onChange(val) {
    // alert(
    //   'You can write type or name. Example: fire, water or normal or PIKACHU'
    // );
    const selector = val.toLowerCase();
    console.log(selector, val);
    if (selector === 'type') {
      store.isSearchByType = true;
    } else {
      store.isSearchByType = false;
    }
  }

  return (
    <Select
      showSearch
      style={{ width: 200, marginRight: '10px' }}
      placeholder='Search by name'
      optionFilterProp='children'
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      <Option value='name'>Name</Option>;<Option value='type'>Type</Option>;
    </Select>
  );
});

export default SelectBlock;
