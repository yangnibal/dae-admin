import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UserList from './pages/UserList'
import UserUpdate from './pages/UserUpdate'
 
class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/account/login" component={Login}/>
					<Route exact path="/users" component={UserList}/>
					<Route exact path="/users/:username/update" component={UserUpdate}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App