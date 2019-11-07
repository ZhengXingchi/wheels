import React from 'react'
import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import {Switch,Route} from 'react-router-dom'
export default class App extends React.Component{
  render(){
    return(
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
           <Route path='/login' component={Login}></Route>
       
           <Route path='/bossinfo' component={BossInfo}></Route>
           <Route path='/geniusinfo' component={GeniusInfo}></Route>
           <Route path='/register' component={Register}></Route>
           <Route path='/chat/:user' component={Chat}></Route>
           <Route  component={DashBoard}></Route>
        </Switch>
       </div>

    )
  }
}
