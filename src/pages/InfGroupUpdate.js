import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Header from '../components/Header';
import axios from 'axios'
import './Update.scss'

@inject('store')
@observer
class InfGroupUpdate extends React.Component{

    @observable name = ""
    @observable id = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action cancel = () => {
        this.props.history.goBack()
    }
    @action update = () => {
        const { store } = this.props
        axios.put("http://api.daeoebi.com/infgroups/" + this.id + "/", ({
            name: this.name,
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.props.history.goBack()
        })
        .catch(err => {
            alert("수정에 실패했습니다.")
            this.props.history.goBack()
        })
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = decodeURI(path.split("/")[4])
        axios.post("http://api.daeoebi.com/infgroups/findgroup/", ({
            name: path
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.name = res.data['name']
            this.id = res.data['id']
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="groupupdate-container">
                <Header/>
                <div className="groupupdate-sticky">
                    <div className="groupupdate-inputs">
                        <input className="groupupdate-input" name="name" value={this.name} onChange={this.handleChange} placeholder="그룹 이름"/>
                    </div>
                    <div className="groupupdate-btns">
                        <div className="groupupdate-btn" onClick={() => this.cancle()}>취소</div>
                        <div className="groupupdate-btn" onClick={() => this.update()}>수정</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfGroupUpdate