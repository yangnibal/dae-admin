import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header'
import { action, observable } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class NewFile extends React.Component{

    @observable file = []
    @observable isFilein = false
    @observable name = ""
    @observable subject = ""
    @observable grade = ""
    @observable group = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action fileChange = (e) => {
        this.file = e.target.files[0]
        this.isFilein = !this.isFilein
    }
    @action infgroupChange = (e) => {
        this.group = e.value
    }
    @action uploadFile = (flag) => {
        const { store } = this.props
        var formData = new FormData()
        formData.append("name", this.name)
        formData.append("subject", this.subject)
        formData.append("grade", this.grade)
        formData.append("file", this.file)
        formData.append("group", this.group)
        axios.post("https://api.daeoebi.com/files/", formData, {
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
                    <input type="file" id="pdfile" onChange={this.fileChange} style={{display: "none"}}/>
                    <label htmlFor="pdfile" className="newfile-selectfile">{this.isFilein===false ? "파일 첨부" : this.file['name']}</label>
                    <div className="newfile-btn">
                        <div className="newfile-btns" onClick={() => this.uploadFile(false)}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewFile