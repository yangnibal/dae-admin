import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../components/Header'
import FileContent from '../components/FileContent'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import DropDown from '../components/DropDown'
import axios from 'axios'

@inject('store')
@observer
class FileList extends React.Component{

    @observable grade = ""
    @observable subject = ""
    @observable group = ""

    @action schoolyearChange = (e) => {
        this.grade = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
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
    @action remove = (id) => {
        const { store } = this.props
        axios.delete("https://api.daeoebi.com/files/" + id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {

        })
    }
    @action update = (id) => {
        this.props.history.push(`/inf/file/${id}/update`)
    }
    @action seeFiles = (id) => {
        this.props.history.push(`/inf/file/${id}`)
    }

    componentDidMount(){
        const { store } = this.props
        store.getFiles()
        this.getGroup()
    }

    render(){
        const { store } = this.props
        const filelist = store.files.map(file => (
            <FileContent
                name={file.name}
                subject={file.subject}
                grade={file.grade}
                group={file.group}
                key={file.id}
                link={file.file}
                remove={() => this.remove(file.id)}
                update={() => this.update(file.id)}
                seeFiles={() => this.seeFiles(file.id)}
            />
        ))
        return(
            <div className="file-container">
                <Header/>
                <div className="file-sticky">
                    <div className="file-header">
                        <div className="file-header-left">
                            <div className="file-header-title">파일 출력 가능 자료 LIST</div>
                            <DropDown placeholder="과목" option={store.subject} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학년" option={store.schoolyear} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.infgroup} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="file-header-search-btn" onClick={() => store.findfile(this.subject, this.grade, this.group)}>검색</div>
                            <Link className="file-header-search-btn" to="/groups">그룹 관리</Link>
                        </div>
                        <div className="file-header-right">
                            <Link to="/inf/file/new" className="file-register">첨부 파일 추가</Link>
                        </div>
                    </div>
                    <div className="file-body">
                        <div className="file-body-header">
                            <div className="file-body-header-text">자료 이름</div>
                            <div className="file-body-header-text">과목</div>
                            <div className="file-body-header-text">추천 학년</div>
                            <div className="file-body-header-text">그룹</div>
                        </div>
                        <div className="file-body-content">
                            {filelist}
                        </div>
                        <div className="file-footer">
                            <Link to="/inf/vid" className="file-footer-content">[동영상 자료]이동</Link>
                            <Link to="/inf/mat" className="file-footer-content">[인터넷 검색 자료]이동</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileList