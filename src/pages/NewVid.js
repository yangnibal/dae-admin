import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Header from '../components/Header'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'
import axios from 'axios'

@inject('store')
@observer
class NewVid extends React.Component{

    @observable isClearable = false;
    @observable isSearchable = true
    @observable schoolyear = ""
    @observable group = ""
    @observable name = ""
    @observable link = ""
    @observable iframe = ""
    @observable subject = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }    
    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action infgroupChange = (e) => {
        this.group = e.value
    }
    @action addVid = () => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/videos/", ({
            name: this.name,
            link: this.link,
            iframe: this.iframe,
            subject: this.subject,
            group: this.group,
            grade: this.schoolyear
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            console.log(res)
            this.props.history.push("/inf/vid")
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        const { store } = this.props
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const group = []
        axios.get("http://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            var data = res.data['results']
            for(var i in data){
                group.push({value: data[i]['name'], label: data[i]['name']})
            }
            store.infgroup = group
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { store } = this.props 
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">1급 정보 세부 항목 입력</div>
                    <input value={this.name} onChange={this.handleChange} name="name" className="newstudent-content-input" placeholder="동영상 이름"/>
                    <input value={this.link} onChange={this.handleChange} name="link" className="newstudent-content-input" placeholder="동영상 링크"/>
                    <input value={this.iframe} onChange={this.handleChange} name="iframe" className="newstudent-content-input" placeholder="동영상 iframe"/>
                    <input value={this.subject} onChange={this.handleChange} name="subject" className="newstudent-content-input" placeholder="동영상 관련 과목"/>
                    <DropDown placeholder="동영상 활용 학년" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="동영상 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.infgroupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/inf/group/new" className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newvid-content-btn" onClick={() => this.addVid()}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewVid