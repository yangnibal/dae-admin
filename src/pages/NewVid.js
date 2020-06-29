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
    @observable time = ""
    @observable subject = ""
    @observable vid = []
    @observable isFilein = false

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
        const { store } = this.props
        axios.post("https://api.daeoebi.com/videos/", ({
            name: this.name,
            time: this.time,
            subject: this.subject,
            group: this.group,
            grade: this.schoolyear
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            
            this.props.history.push("/inf/vid")
        })
        .catch(err => {
            
        })
    }
    @action saveInfo = () => {
        sessionStorage.setItem("name", this.name)
        sessionStorage.setItem("time", this.time)
        sessionStorage.setItem("iframe", this.iframe)
    }
    @action fileChange = (e) => {
        this.vid = e.target.files[0]
        this.isFilein = !this.isFilein
    }

    componentDidMount(){
        if(sessionStorage.getItem("name")!==null)
            this.name = sessionStorage.getItem("name")
        
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
                    <input value={this.name} onChange={this.handleChange} name="name" className="newstudent-content-input" placeholder="동영상 이름"/>
                    <input onChange={this.fileChange} id="file" type="file" style={{display: "none"}}/>
                    <label htmlFor="file" className="newstudent-content-input">{this.isFilein===false ? "동영상 추가" : this.vid['name']}</label>
                    <input value={this.subject} onChange={this.handleChange} name="subject" className="newstudent-content-input" placeholder="동영상 관련 과목"/>
                    <DropDown placeholder="동영상 활용 학년" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="동영상 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.infgroupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/groups/new" onClick={() => this.saveInfo()} className="newstudent-content-group-add">그룹 추가</Link>
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