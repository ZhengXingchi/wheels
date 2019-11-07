// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Redirect} from 'react-router-dom'
import reducers from './reducer'
import './config'



import App from './App'

import 'antd-mobile/dist/antd-mobile.min.css'
import './index.css'
const store =createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))



ReactDom.render(
  (<Provider store={store}>
     <BrowserRouter>
       <App></App>
     </BrowserRouter>
  </Provider>),
  document.getElementById('root')

)