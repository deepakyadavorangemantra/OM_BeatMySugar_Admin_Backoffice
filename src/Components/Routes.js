import React from "react"
import { Route } from "react-router-dom"
import Login from './Login'
import Sidenav from './Sidenav';





const Routes = () => {
    return(
        <div>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/dashboard' component={Sidenav}></Route>
        {window.location.pathname != '/' && window.location.pathname != '/dashboard' ? <Sidenav></Sidenav> : <Route/> }
    
        </div>
    )
}

export default Routes;