import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UserList from './pages/UserList'
import UserUpdate from './pages/UserUpdate'
import Inf from './pages/Inf';
import VidList from './pages/VidList'
import MatList from './pages/MatList'
import NewMat from './pages/NewMat'
import NewVid from './pages/NewVid'
import NewInfGroup from './pages/NewInfGroup';
 
class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/account/login" component={Login}/>
					<Route exact path="/users" component={UserList}/>
					<Route exact path="/users/:username/update" component={UserUpdate}/>
					<Route exact path="/inf" component={Inf}/>
					<Route exact path="/inf/vid" component={VidList}/>
					<Route exact path="/inf/mat" component={MatList}/>
					<Route exact path="/inf/vid/new" component={NewVid}/>
					<Route exact path="/inf/mat/new" component={NewMat}/>
					<Route exact path="/inf/group/new" component={NewInfGroup}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App