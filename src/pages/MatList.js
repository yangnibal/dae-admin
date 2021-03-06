import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import DropDown from '../components/DropDown'
import axios from 'axios'
import MatContent from '../components/MatContent'

@inject('store')
@observer
class MatList extends React.Component{

    @observable isClearable = false
    @observable isSearchable = true
    @observable schoolyear = ""
    @observable subject = ""
    @observable group = ""
    @observable mats = []

    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action findMat = (grade, group, subject) => {
        const { store } = this.props
        axios.post("https://api.daeoebi.com/materials/findmat/", ({
            grade: grade,
            subject: subject,
            group: group
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.mats = res.data
        })
        .catch(err => {
            
        })
    }
    @action getGroup = () => {
        const { store } = this.props
        const ltoken = localStorage.getItem('admin_token')
        const stoken = sessionStorage.getItem('admin_token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const group = []
        axios.get("https://api.daeoebi.com/infgroups/", {
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
            
        })
    }
    @action remove = (id) => {
        const { store } = this.props
        axios.delete("https://api.daeoebi.com/materials/" + id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            window.location.reload()
        })
    }
    @action update = (id) => {
        this.props.history.push(`/inf/mat/${id}/update`)
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
        const { store } = this.props
        axios.get("https://api.daeoebi.com/materials", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.mats = res.data
            const group = []
            axios.get("https://api.daeoebi.com/infgroups/", {
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
                
            })
        })
        .catch(err => {
            
        })
    }

    render(){
        const { store } = this.props
        const matlist = this.mats.map(mat => (
            <MatContent
                name={mat.name}
                subject={mat.subject}
                grade={mat.grade}
                group={mat.group}
                key={mat.id}
                link={mat.link}
                remove={() => this.remove(mat.id)}
                update={() => this.update(mat.id)}
            />
        ))
        return(
            <div className="vid-container">
                <Header/>
                <div className="vid-sticky">
                    <div className="vid-header">
                        <div className="vid-header-left">    
                            <div className="vid-header-title">인터넷 자료 LIST</div>
                            <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.infgroup} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="vid-header-search-btn" onClick={() => this.findMat(this.schoolyear, this.group, this.subject)}>검색</div>
                            <Link className="vid-header-search-btn" to="/groups">그룹 관리</Link>
                        </div>
                        <div className="vid-header-right">
                            <Link to="/inf/mat/new" className="vid-register">자료 추가</Link>
                        </div>
                    </div>
                    <div className="vid-body">
                        <div className="vid-body-header">
                            <div className="mat-body-header-text">자료 이름</div>
                            <div className="mat-body-header-text">과목</div>
                            <div className="mat-body-header-text">추천 학년</div>
                            <div className="mat-body-header-text">그룹</div>
                        </div>
                        <div className="vid-content-body">
                            {matlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MatList