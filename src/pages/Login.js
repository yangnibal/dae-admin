import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Logo from '../images/logo2.png'
import axios from 'axios'
import './Account.scss'

@inject('store')
@observer
class Login extends React.Component{

    @observable username = ""
    @observable password = ""
    @observable saveId = false

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        this[name] = checked
    }
    @action superuserLogin = () => {
        axios.post("http://api.daeoebi.com/users/loginsuperuser/", ({
            username: this.username,
            password: this.password
        }))
        .then(res => {
            
            if(res.data==="not superuser"){
                alert("관리자가 아닙니다")
            } else {
                if(this.saveId===true){
                    localStorage.setItem("admin_token", res.data['token'])
                    this.props.history.push("/")
                } else {
                    sessionStorage.setItem("admin_token", res.data['token'])
                    this.props.history.push("/")
                }
            }
        })
        .catch(err => {
            alert("존재하지 않는 사용자입니다")
        })
    }

    componentDidMount(){
        const { store } = this.props
        axios.get("http://api.daeoebi.com/users/logout", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
    }

    render(){
        return(
            <div className="login-container">
                <img src={Logo} alt={Logo} className="login-logo"/>
                <div className="input-container">
                    <span className="selecter">ID</span>
                    <input value={this.username} onChange={this.handleChange} name="username" type="text" className="login-input-username"/>
                </div>
                <div className="input-container">
                    <span className="selecter">비밀번호</span>
                    <input value={this.password} onChange={this.handleChange} name="password" type="password" className="login-input-password"/>
                </div>
                <div className="checkbox-container">
                    <input checked={this.saveId} onChange={this.handleCheckboxChange} name="saveId" id="checkbox" type="checkbox" className="login-input-checkbox"/>
                    <label htmlFor="checkbox"/>
                    <span className="checkbox-text">아이디 저장</span>
                </div>
                <div className="login-btn" onClick={() => this.superuserLogin()}>로그인</div>
            </div>
        )
    }
}

export default Login