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
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import reducers from './reducer'
import './config'
import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import Register from './container/register/register'


import 'antd-mobile/dist/antd-mobile.min.css'
import './index.css'
const store =createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

function Boss(){
  return <h2>BOSS页面</h2>
}

ReactDom.render(
  (<Provider store={store}>
     <BrowserRouter>
       <div>
         <AuthRoute></AuthRoute>
         <Route path='/login' component={Login}></Route>
         <Route path='/boss' component={Boss}></Route>
         <Route path='/bossinfo' component={BossInfo}></Route>
         <Route path='/register' component={Register}></Route>
       </div>
     </BrowserRouter>
  </Provider>),
  document.getElementById('root')

)