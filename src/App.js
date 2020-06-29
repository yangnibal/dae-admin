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
import InfGroupList from './pages/InfGroupList'
import InfGroupUpdate from './pages/InfGroupUpdate'
import VidUpdate from './pages/VidUpdate'
import MatUpdate from './pages/MatUpdate'
import VidDetail from './pages/VidDetail'
import NewFile from './pages/NewFile'
import FileList from './pages/FileList'
import FileDetail from './pages/FileDetail'
import FileUpdate from './pages/FileUpdate'
import SavedVidDetail from './pages/SavedVidDetail'
 
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
					<Route exact path="/groups" component={InfGroupList}/>
					<Route exact path="/inf/vid" component={VidList}/>
					<Route exact path="/inf/mat" component={MatList}/>
					<Route exact path="/inf/vid/new" component={NewVid}/>
					<Route exact path="/inf/mat/new" component={NewMat}/>
					<Route exact path="/groups/new" component={NewInfGroup}/>
					<Route exact path="/groups/:groupname/update" component={InfGroupUpdate}/>
					<Route exact path="/inf/vid/:vidid/update" component={VidUpdate}/>
					<Route exact path="/inf/mat/:matid/update" component={MatUpdate}/>
					<Route exact path="/inf/vid/:vidid" component={VidDetail}/>
					<Route exact path="/inf/file" component={FileList}/>
					<Route exact path="/inf/file/new" component={NewFile}/>
					<Route exact path="/inf/file/:fileid" component={FileDetail}/>
					<Route exact path="/inf/file/:fileid/update" component={FileUpdate}/>
					<Route exact path="/inf/savedvid/:savedvidname" component={SavedVidDetail}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App