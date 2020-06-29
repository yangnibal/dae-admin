import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header'
import { action, observable } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class FileUpdate extends React.Component{

    @observable pdfile = []
    @observable name = ""
    @observable subject = ""
    @observable grade = ""
    @observable group = ""
    @observable id = ""

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
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("subject", this.subject)
        formData.append("grade", this.grade)
        formData.append("file", this.file)
        formData.append("group", this.group)
        axios.put("https://api.daeoebi.com/files/" + this.id + "/", formData, {
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
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.id = path.split("/")[5]
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
        axios.get("https://api.daeoebi.com/files/" + path + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { store } = this.props
        return(
            <div className="newfile-container">
                <Header/>
                <div className="newfile-sticky">
                    <input name="name" value={this.name} onChange={this.handleChange} placeholder="첨부 파일 이름" className="newfile-input"/>
                    <input name="subject" value={this.subject} onChange={this.handleChange} placeholder="첨부 파일 관련 과목" className="newfile-input"/>
                    <input name="grade" value={this.grade} onChange={this.handleChange} placeholder="첨부 파일 활용 학년" className="newfile-input"/>
                    <DropDown placeholder="첨부 파일 그룹 지정" option={store.infgroup} className="newfile-dropdown" classNamePrefix="react-select" onChange={this.infgroupChange} isMulti={false} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newfile-addgroup-btn">
                        <Link to="/groups/new" onClick={() => this.saveInfo()} className="newfile-addgroup">그룹 추가</Link>
                    </div>
                    <input type="file" id="pdfile" onChange={this.fileChange} value={this.file} style={{display: "none"}}/>
                    <label htmlFor="pdfile" className="newfile-selectfile">파일 첨부</label>
                    <div className="newfile-btn">
                        <div className="updatefile-btns" onClick={() => this.cancle()}>취소</div>
                        <div className="updatefile-btns" onClick={() => this.uploadFile()}>수정</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileUpdate