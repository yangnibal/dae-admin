import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header'
import { action, observable } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'
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
class PrintFileUpdate extends React.Component{

    @observable file = []
    @observable isFilein = false
    @observable name = ""
    @observable subject = ""
    @observable grade = ""
    @observable group = ""
    @observable uploaded = 0

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action fileChange = (e) => {
        this.file = e.target.files[0]
    }
    @action infgroupChange = (e) => {
        this.group = e.value
    }
    @action cancle = () => {
        this.props.history.goBack()
    }
    @action uploadFile = () => {
        const { store } = this.props
        var self = this
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("subject", this.subject)
        if(this.grade==="전체"){
            formData.append("grade", "")
        } else {
            formData.append("grade", this.grade)
        }
        formData.append("file", "https://d21b5gghaflsoj.cloudfront.net/media/" + this.file['name'])
        formData.append("group", this.group)
        axios.put("https://api.daeoebi.com/printfiles/" + this.id + "/", formData, {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.props.history.goBack()
        })
        .catch(err => {
            console.log(err)
        })
        var params = {
            Bucket: store.bucketName,
            Key: "media/" + this.file['name'],
            Body: this.file,
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

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.id = path.split("/")[4]
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
        axios.get("https://api.daeoebi.com/printfiles/" + this.id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.name = res.data['name']
            this.subject = res.data['subject']
            this.grade = res.data['grade']
            this.group = res.data['group']
            this.file['name'] = res.data['file'].split("https://d21b5gghaflsoj.cloudfront.net/media/")[1]
        })
        .catch(err => {
        })
    }

    render(){
        const { store } = this.props
        return(
            <div className="newfile-container">
                <Header/>
                <div className="newfile-sticky">
                    <input name="name" value={this.name} onChange={this.handleChange} placeholder="교재 이름" className="newfile-input"/>
                    <input name="subject" value={this.subject} onChange={this.handleChange} placeholder="교재 관련 과목" className="newfile-input"/>
                    <input name="grade" value={this.grade} onChange={this.handleChange} placeholder="교재 활용 학년" className="newfile-input"/>
                    <DropDown placeholder="교재 그룹 지정" option={store.infgroup} className="newfile-dropdown" classNamePrefix="react-select" onChange={this.infgroupChange} isMulti={false} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newfile-addgroup-btn">
                        <Link to="/groups/new" onClick={() => this.saveInfo()} className="newfile-addgroup">그룹 추가</Link>
                    </div>
                    <input type="file" id="pdfile" onChange={this.fileChange} value={this.file} style={{display: "none"}}/>
                    <label htmlFor="pdfile" className="newfile-selectfile">{this.uploaded===0 ? this.isFilein===false ? "파일 첨부" : this.file['name'] : this.uploaded+"%"}</label>
                    <div className="newfile-btn">
                        <div className="updatefile-btns" onClick={() => this.cancle()}>취소</div>
                        <div className="updatefile-btns" onClick={() => this.uploadFile()}>수정</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrintFileUpdate