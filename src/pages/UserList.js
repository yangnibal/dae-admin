import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import './List.scss'
import Header from '../components/Header';
import UserContent from '../components/UserContent'
import axios from 'axios'

@inject('store')
@observer
class UserList extends React.Component{
    
    @observable users = []
    @observable name = ""
    @observable username = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action remove = (username) => {
        const { store } = this.props;
        axios.post("http://api.daeoebi.com/users/deleteuser/", ({
            username: username
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    @action update = (username) => {
        this.props.history.push(`/users/${username}/update`)
    }
    @action findUser = () => {
        const { store } = this.props;
        axios.post("http://api.daeoebi.com/users/finduser/", ({
            name: this.name,
            username: this.username
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.users = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        const { store } = this.props 
        axios.get("http://api.daeoebi.com/users/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.users = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const userlist = this.users.map(user => (
            <UserContent
                name={user.name}
                username={user.username}
                id={user.username}
                key={user.id}
                phone_number={user.phone_number}
                email={user.email}
                can_access_1={user.can_access_1}
                can_access_2={user.can_access_2}
                remove={() => this.remove(user.username)}
                update={() => this.update(user.username)}
            />
        ))
        return(
            <div className="user-container">
                <Header/>
                <div className="user-content-container">
                    <div className="user-content-header-container">
                        <div className="user-content-header-left">
                            <div className="user-content-title">사용자 목록</div>
                            <input className="user-content-search-input-1" value={this.name} onChange={this.handleChange} name="name" placeholder="이름 검색"/>
                            <input className="user-content-search-input-2" value={this.username} onChange={this.handleChange} name="username" placeholder="아이디 검색"/>
                            <div className="user-content-search-btn" onClick={() => this.findUser()}>검색</div>
                        </div>
                        <div className="user-content-header-right">
                        </div>
                    </div>
                    <div className="user-content-body-container">
                        <div className="user-content-body-header">
                            <div className="user-content-body-header-text">사용자 이름</div>
                            <div className="user-content-body-header-text">아이디</div>
                            <div className="user-content-body-header-text">전화번호</div>
                            <div className="user-content-body-header-text">이메일</div>
                            <div className="user-content-body-header-text">1급 정보</div>
                            <div className="user-content-body-header-text">성적 등급 관리</div>
                        </div>
                        <div className="user-content-body">
                            {userlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList

