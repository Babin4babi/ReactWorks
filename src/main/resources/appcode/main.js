import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './app/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { render } from 'react-dom';
import { createStore } from 'redux';
import todoApp from './reducers/reducer';
import { Provider } from 'react-redux'

let store = createStore(todoApp);

ReactDOM.render(<MuiThemeProvider><Provider store= {store}><div>
    <HomeComponent /> </div></Provider></MuiThemeProvider>, document.getElementById('app'));