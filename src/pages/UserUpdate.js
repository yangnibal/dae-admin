import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import './Update.scss'
import { observable, action } from 'mobx'
import axios from 'axios'

@inject('store')
@observer
class UserUpdate extends React.Component{

    @observable path = ""
    @observable name = ""
    @observable username = ""
    @observable phone_number = ""
    @observable email = ""
    @observable newpassword = ""
    @observable newpasswordcheck = ""
    @observable can_access_1 = false
    @observable can_access_2 = false
    @observable id = ""
    @observable isPwChecked = true

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleToggle = (name) => {
        this[name] = !this[name]
    }
    @action cancle = () => {
        this.props.history.goBack()
    }
    @action update = () => {
        const { store } = this.props
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("username", this.username)
        formData.append("phone_number", this.phone_number)
        formData.append("email", this.email)
        formData.append("can_access_1", this.can_access_1)
        formData.append("can_access_2", this.can_access_2)
        if(this.newpassword!==""&&this.isPwChecked===true){
            formData.append("password", this.newpassword)
        } else if(this.newpassword!==""&&this.isPwChecked===false){
            alert("비밀번호 확인을 해 주시기 바랍니다.")
        }
        axios.patch("https://api.daeoebi.com/users/" + this.id + "/", formData, {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.props.history.goBack()
        })
        .catch(err => {
            alert("사용자 수정에 실패했습니다. 다시 시도해주시기 바랍니다.")
            
        })
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.path = path.split("/")[4]
        axios.post("https://api.daeoebi.com/users/getuserinfo/", ({
            username: this.path
        }),{
            headers: {
                Authorization: "Token " + store.getToken()
            }   
        })
        .then(res => { 
            if(res.data==="no user exist"){
                alert("존재하지 않는 사용자입니다")
                this.props.history.goBack()
            } else {
                this.name = res.data['name']
                this.username = res.data['username']
                this.phone_number = res.data['phone_number']
                this.email = res.data['email']
                this.can_access_1 = res.data['can_access_1']
                this.can_access_2 = res.data['can_access_2']
                this.id = res.data['id']
            }
        })
        .catch(err => {
            alert("존재하지 않는 사용자입니다")
            this.props.history.goBack()
        })
    }

    render(){
        return(
            <div className="userupdate-container">
                <Header/>
                <div className="userupdate-sticky">
                    <div className="userupdate-inputs">
                        <input className="userupdate-input" name="name" value={this.name} onChange={this.handleChange} placeholder="이름"/>
                        <input className="userupdate-input" name="username" value={this.username} onChange={this.handleChange} placeholder="아이디"/>
                        <input className="userupdate-input" name="newpassword" value={this.newpassword} onChange={this.handleChange} placeholder="새 비밀번호(없으시면 공백으로 남겨주세요)"/>
                        <input className="userupdate-input" name="newpasswordcheck" value={this.newpasswordcheck} onChange={this.handleChange} placeholder="새 비밀번호 확인"/>
                        <input className="userupdate-input" name="phone_number" value={this.phone_number} onChange={this.handleChange} placeholder="전화번호"/>
                        <input className="userupdate-input" name="email" value={this.email} onChange={this.handleChange} placeholder="이메일"/>
                        
                    </div>
                    <div className="userupdate-toggle" onClick={() => this.handleToggle("can_access_1")} name="can_access_1">
                        <div className="userupdate-checkbox">{this.can_access_1===true ? "✓" : null}</div>
                        <div>1급 정보 열람 권한</div>
                    </div>
                    <div className="userupdate-toggle" onClick={() => this.handleToggle("can_access_2")} name="can_access_1">
                        <div className="userupdate-checkbox">{this.can_access_2===true ? "✓" : null}</div>
                        <div>성적 등급 프로그램 사용 권한</div>
                    </div>
                    <div className="userupdate-btns">
                        <div className="userupdate-btn" onClick={() => this.cancle()}>취소</div>
                        <div className="userupdate-btn" onClick={() => this.update()}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserUpdate