import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import AuthenticatedComponent from './components/AuthenticatedComponent';
import SignUpPage from './components/SignUpPage'

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/authenticated' component={AuthenticatedComponent}/>
        <Route exact path="/" component={Home}/>
        <Route path='/signup' component={SignUpPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
