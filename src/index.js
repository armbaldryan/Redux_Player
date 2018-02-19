import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import reducer from './reducers';


const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App title="React Redux PlayList" />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
