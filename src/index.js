import React from 'react';
import ReactDOM from 'react-dom';
import MainStore from './stores/MainStore';
import Root from './components/root/Root';

import './index.css';
const store = MainStore;
console.log(store);

ReactDOM.render(<Root />, document.getElementById('root'));
