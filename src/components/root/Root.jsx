import React from 'react';
import App from '../app/App';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => {
  console.log();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default Root;
