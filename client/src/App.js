import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Home from './components/Home'
import AuthenticatedComponent from './components/AuthenticatedComponent';
import SignUpPage from './components/SignUpPage'

function App(props) {
  const [user, setUser] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    axios.get('/getUser', {headers: { Authorization: `Bearer ${jwt}` }})
      .then( res => { 
        setUser(res.data) 
        props.history.push('/authenticated')
      })
      .catch( err => {
        localStorage.removeItem('jwt');
        props.history.push('/signup')
    })
  }, [authenticate])

  return (
    <React.Fragment>
      {jwt && 
        <Route path='/authenticated' render={
          props => (<AuthenticatedComponent {...props} user={user} setAuthenticate={setAuthenticate}/>)}
        />
      }
      <Route path='/signup' render={
        props => (<SignUpPage {...props} setAuthenticate={setAuthenticate}/>)}
        />
      <Route exact path="/" component={Home}/>
    </React.Fragment>
  );
}

export default withRouter(App);
