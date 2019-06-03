import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 
 
import * as serviceWorker from './serviceWorker';
 
 
// import {createStore} from 'redux' //,applyMiddleware,compose,combineReducers
import {createStore,applyMiddleware} from './zxc.redux' //,applyMiddleware,compose,combineReducers

import thunk from './zxc.thunk'
import arraythunk from './zxc.arraythunk'
// import {Provider} from 'react-redux'
import {Provider} from './zxc.react.redux'



import {counter} from "./index.redux"

// import  './demo1.redux.js'
// import Page from './page.js'
import App from './app.js'

 

// ReactDOM.render(<Page/>, document.getElementById('root'));
// ,compose(
// 	applyMiddleware(thunk),
// 	window.devToolsExtension?window.devToolsExtension():f=>f
// )
const store=createStore(counter,applyMiddleware(thunk,arraythunk))
 
ReactDOM.render((<Provider store={store}><App  ></App></Provider>),document.getElementById('root'));

 

 


// function Boss(){
// 	return <h1>BOSS页面</h1>
// }
 
 
//使用react-redux前的写法
// function render(){
// 	ReactDOM.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} addGUNAsync={addGUNAsync}/>, document.getElementById('root'));
// }
// render()
// store.subscribe(render)
 

 
	 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
