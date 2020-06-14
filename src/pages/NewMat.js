import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import axios from 'axios'
import './New.scss'

@inject('store')
@observer
class NewMat extends React.Component{

    @observable isSearchable = true
    @observable isClearable = false
    @observable name = ""
    @observable link = ""
    @observable subject = ""
    @observable schoolyear = ""
    @observable group = ""
    
    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action addTest = (name, link, subject, grade, group) => {
        const { store } = this.props
        axios.post("https://api.daeoebi.com/materials/", ({
            name: name,
            link: link,
            subject: subject,
            grade: grade,
            group: group
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.props.history.push("/inf/mat")
        })
        .catch(err => {
            
        })
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action saveInfo = () => {
        sessionStorage.setItem("name", this.name)
        sessionStorage.setItem("link", this.link)
        sessionStorage.setItem("subject", this.subject)
    }

    componentDidMount(){
        if(sessionStorage.getItem("name")!==null)
            this.name = sessionStorage.getItem("name")
        
        if(sessionStorage.getItem("link")!==null)
            this.link = sessionStorage.getItem("link")
        
        if(sessionStorage.getItem("subject")!==null)
            this.subject = sessionStorage.getItem("subject")
        
        const { store } = this.props
        const group = []
        axios.get("https://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + store.getToken()
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
                    <DropDown placeholder="자료 활용 학년" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="자료 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/groups/new" onClick={() => this.saveInfo()} className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newvid-content-btn" onClick={() => this.addTest(this.name, this.link, this.subject, this.schoolyear, this.group)}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewMat