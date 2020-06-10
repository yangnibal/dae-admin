import React from 'react'
import './New.scss'
import Header from '../components/Header';
import axios from 'axios'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class NewInfGroup extends React.Component{

    @observable name = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action init_data = () => {
        this.name = ""
    }
    @action addGroup = (name, add_more) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/infgroups/", ({
            name: name
        }), {
            headers: {
                Authorization: "Token "+token
            }
        })
        .then(res => {
            if(add_more===false){
                this.init_data()
                this.props.history.goBack()
            } else {
                this.init_data()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="newgroup-container">
                <Header/>
                <div className="newgroup-content-container">
                    <div className="newgroup-content-title">그룹 생성</div>
                    <input name="name" value={this.name} onChange={this.handleChange} className="newgroup-content-input" placeholder="그룹 이름"/>
                    <div className="newgroup-content-btn-container">
                        <div className="newgroup-content-btn" onClick={() => this.addGroup(this.name, false)}>등록</div>
                        <div className="newgroup-content-btn" onClick={() => this.addGroup(this.name, true)}>그룹 추가 등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewInfGroup