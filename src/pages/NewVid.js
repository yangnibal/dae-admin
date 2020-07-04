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
    @observable link = ""
    @observable iframe = ""
    @observable vid = []
    @observable data = []
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
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("time", this.time)
        formData.append("link", this.link)
        formData.append("iframe", this.iframe)
        formData.append("subject", this.subject)
        formData.append("group", this.group)
        formData.append("grade", this.schoolyear)
        formData.append("video", this.vid)
        axios.post("https://api.daeoebi.com/videos/", formData, {
            headers: {
                Authorization: "Token " + store.getToken(),
                'Content-Type': 'multipart/form-data' 
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
        var self = this
        var myVideos = []
        var time = 0;
        var file = e.target.files[0]
        this.vid = file
        myVideos.push(file);
        var video = document.createElement('video');
        video.preload = 'metadata';
        function updateInfos(){
            for (var i = 0; i < myVideos.length; i++) {
                time += myVideos[i].duration
                
            }
        }
        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            var duration = video.duration;
            myVideos[myVideos.length - 1].duration = duration;
            updateInfos();
            var hours = Math.floor(time / 3600);
            time %= 3600;
            var minutes = Math.floor(time / 60);
            var seconds = time % 60;
            seconds = Math.floor(seconds)
            hours = String(hours)
            minutes = String(minutes)
            seconds = String(seconds)
            var arr = [ hours, minutes, seconds ]
            self.data = arr
        }
        video.src = URL.createObjectURL(file)
        setTimeout(() => {
            if(this.data[0]==="0"){
                this.time = this.data[1] + ":" + this.data[2]
            } else {
                this.time = this.data[0] + ":" + this.data[1] + ":" + this.data[2]
            }
        }, 1000)
        
        
        this.isFilein = true
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
                    <input value={this.link} onChange={this.handleChange} name="link" className="newstudent-content-input" placeholder="동영상 링크"/>
                    <input value={this.iframe} onChange={this.handleChange} name="iframe" className="newstudent-content-input" placeholder="동영상 iframe"/>
                    <input value={this.time} onChange={this.handleChange} name="time" className="newstudent-content-input" placeholder="동영상 시간"/>
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