import React from 'react';

import NavBar from './navbar/navbar';
import Home from './home';

import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>      
    </div>
  );
}

export default App;
