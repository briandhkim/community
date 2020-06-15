import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from './navbar/navbar';
import Home from './home';
import Login from './user/login';
import SignUp from './user/signup';
import DefaultError from './errors/defaultError';

import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons';
import './App.css';

function App() {
  return (
    <div className="App grey lighten-5">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route component={DefaultError} />
      </Switch>
    </div>
  );
}

export default App;
