import React from 'react'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import DropDown from '../components/DropDown'
import { observable, action } from 'mobx'
import AWS from 'aws-sdk'

AWS.config.update({
    region: 'ap-northeast-2', 
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-2:aac2d1dd-7488-438f-a18a-2730fa9eed26',
    })
})
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'daeoebi-storage'}
});

@inject('store')
@observer
class VidUpdate extends React.Component{

    @observable name = ""
    @observable link = ""
    @observable vid = []
    @observable subject = ""
    @observable grade = ""
    @observable group = ""
    @observable uploaded = 0
    @observable time = ""
    @observable isFilein = false
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
        var self = this
        var link = this.link.replace("watch?v=", "embed/")
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("time", this.time)
        formData.append("link", link)
        formData.append("subject", this.subject)
        formData.append("group", this.group)
        if(this.grade==="전체"){
            formData.append("grade", "")
        } else {
            formData.append("grade", this.grade)
        }
        formData.append("video", "https://d21b5gghaflsoj.cloudfront.net/" + this.vid['name'])
        axios.put("https://api.daeoebi.com/videos/" + this.id + "/", formData, {
            headers: {
                Authorization: "Token " + store.getToken(),
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then(res => {})
        .catch(err => {})
        var params = {
            Bucket: store.bucketName,
            Key: this.vid['name'],
            Body: this.vid,
            ACL: "public-read"
        }
        s3.upload(params).on("httpUploadProgress", function(e){
            self.uploaded = Math.round(e.loaded / e.total * 100);
        }).send(function(err, data) {
            if (err){
                return;
            }
            self.goBack()
        })
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
    @action getGroup = () => {
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

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.id = path.split("/")[5]
        this.getGroup()
        axios.get("https://api.daeoebi.com/videos/" + this.id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.name = res.data['name']
            this.link = res.data['link']
            this.iframe = res.data['iframe']
            this.subject = res.data['subject']
            this.group = res.data['group']
            this.grade = res.data['grade']
            this.time = res.data['time']
            this.vid['name'] = res.data['video'].split("https://d21b5gghaflsoj.cloudfront.net/")[1]
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
                    <input value={this.name} onChange={this.handleChange} name="name" className="newstudent-content-input" placeholder="동영상 이름"/>
                    {this.isFilein===false ? <input value={this.link} onChange={this.handleChange} name="link" className="newstudent-content-input" placeholder="동영상 링크"/> : null}
                    <input onChange={this.fileChange} id="file" type="file" style={{display: "none"}}/>
                    <label htmlFor="file" className="newstudent-content-input">{this.uploaded===0 ? this.isFilein===false ? "동영상 추가" : this.vid['name'] : this.uploaded+"%"}</label>
                    <input value={this.time} onChange={this.handleChange} name="time" className="newstudent-content-input" placeholder="동영상 시간"/>
                    <input value={this.subject} onChange={this.handleChange} name="subject" className="newstudent-content-input" placeholder="동영상 관련 과목"/>
                    <input value={this.grade} onChange={this.handleChange} name="grade" className="newstudent-content-input" placeholder="동영상 활용 학년"/>
                    <DropDown placeholder="동영상 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-btn-container">
                        <div className="newstudent-content-btn" onClick={() => this.cancle()}>취소</div>
                        <div className="newstudent-content-btn" onClick={() => this.update()}>수정</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VidUpdate