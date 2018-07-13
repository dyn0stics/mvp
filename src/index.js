import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Dashboard from './Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
      	  <Route exact path="/" component={App} />
          <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
};

render(<Root/>, document.getElementById('root'));
