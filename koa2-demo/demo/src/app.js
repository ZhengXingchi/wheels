import  React  from  'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import 'antd/dist/antd.css'
import './assets/common.sass'
import routes from './routes'


export default ()=>(
  <Switch>
    {
      routes.map(({name,component,exact=true,path})=>(
        <Route path={path} key={name} component={component} exact={exact}/>
      ))
    }
  </Switch>
)