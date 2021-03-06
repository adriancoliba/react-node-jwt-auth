import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
        <Switch>
          <App />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
  
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
