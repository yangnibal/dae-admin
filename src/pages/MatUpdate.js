import React from 'react'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import DropDown from '../components/DropDown'
import { observable, action } from 'mobx'

@inject('store')
@observer
class MatUpdate extends React.Component{

    @observable name = ""
    @observable link = ""
    @observable subject = ""
    @observable grade = ""
    @observable group = ""
    @observable id = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action schoolyearChange = (e) => {
        this.grade = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action cancle = () => {
        this.props.history.goBack()
    }
    @action update = () => {
        const { store } = this.props
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("subject", this.subject)
        if(this.grade==="전체"){
            formData.append("grade", "")
        } else {
            formData.append("grade", this.grade)
        }
        formData.append("group", this.group)
        axios.put("https://api.daeoebi.com/materials/" + this.id + "/", formData, {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.props.history.goBack()
        })
        .catch(err => {
            
        })
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.id = path.split("/")[5]
        store.getGroup()
        axios.get("https://api.daeoebi.com/materials/" + this.id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.name = res.data['name']
            this.link = res.data['link']
            this.subject = res.data['subject']
            this.grade = res.data['grade']
            this.group = res.data['group']
            console.log(res)
        })
        .catch(err => {
            
        })
    }

    render(){
        const { store } = this.props
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">1급 정보 세부 항목 입력</div>
                    <input value={this.name} onChange={this.handleChange} name="name" className="newstudent-content-input" placeholder="자료 이름"/>
                    <input value={this.link} onChange={this.handleChange} name="link" className="newstudent-content-input" placeholder="자료 링크"/>
                    <input value={this.subject} onChange={this.handleChange} name="subject" className="newstudent-content-input" placeholder="자료 관련 과목"/>
                    <input value={this.grade} onChange={this.handleChange} name="grade" className="newstudent-content-input" placeholder="자료 활용 학년"/>
                    <DropDown placeholder="자료 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-btn-container">
                        <div className="newstudent-content-btn" onClick={() => this.cancle()}>취소</div>
                        <div className="newstudent-content-btn" onClick={() => this.update()}>수정</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MatUpdate