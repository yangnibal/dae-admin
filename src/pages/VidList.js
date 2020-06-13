import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import './List.scss'
import VidContent from '../components/VidContent';

@inject('store')
@observer
class VidList extends React.Component{

    @observable vids = []
    @observable schoolyear = ""
    @observable subject = ""
    @observable group = ""
    
    @action watchVid = (id) => {
        this.props.history.push(`/inf/vid/${id}`)
    }
    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action getGroup = () => {
        const { store } = this.props
        const group = []
        axios.get("http://api.daeoebi.com/infgroups/", {
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
    @action findVid = (subject, grade, group) => {
        const { store } = this.props
        axios.post("http://api.daeoebi.com/videos/findvid/", ({
            grade: grade,
            subject: subject,
            group: group
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.vids = res.data
        })
        .catch(err => {
            
        })
    }
    @action remove = (id) => {
        const { store } = this.props
        axios.delete("http://api.daeoebi.com/videos/" + id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            window.location.reload()
        })
    }
    @action update = (id) => {
        this.props.history.push(`/inf/vid/${id}/update`)
    }

    componentDidMount(){
        const ltoken = localStorage.getItem('admin_token')
        const stoken = sessionStorage.getItem('admin_token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.get("http://api.daeoebi.com/videos", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.vids = res.data['results']
            this.getGroup()
        })
        .catch(err => {
            
        })
    }

    render(){
        const { store } = this.props
        const vidlist = this.vids.map(vid => (
            <VidContent
                name={vid.name}
                grade={vid.grade}
                group={vid.group}
                subject={vid.subject}
                key={vid.id}
                watchVid={() => this.watchVid(vid.id)}
                remove={() => this.remove(vid.id)}
                update={() => this.update(vid.id)}
            />
        ))
        return(
            <div className="vid-container">
                <Header/>
                <div className="vid-sticky">
                    <div className="vid-header">
                        <div className="vid-header-left">    
                            <div className="vid-header-title">동영상 LIST</div>
                            <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.infgroup} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="vid-header-search-btn" onClick={() => this.findVid(this.subject, this.schoolyear, this.group)}>검색</div>
                            <Link className="vid-header-search-btn" to="/groups">그룹 관리</Link>
                        </div>
                        <div className="vid-header-right">
                            <Link to="/inf/vid/new" className="vid-register">동영상 추가</Link>
                        </div>
                    </div>
                    <div className="vid-body">
                        <div className="vid-body-header">
                            <div className="vid-body-header-text">동영상 이름</div>
                            <div className="vid-body-header-text">과목</div>
                            <div className="vid-body-header-text">추천 학년</div>
                            <div className="vid-body-header-text">그룹</div>
                        </div>
                        <div className="vid-content-body">
                            {vidlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VidList