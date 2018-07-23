import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import Dashboard from './Dashboard';
import Customer from './Customer';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/dashboard/:pk" component={Dashboard}/>
                <Route exact path="/customer" component={Customer}/>
            </Switch>
        </BrowserRouter>
    )
};

render(<Root/>, document.getElementById('root'));
