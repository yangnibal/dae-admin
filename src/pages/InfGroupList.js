import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import { observable, action } from 'mobx'
import axios from 'axios'
import InfGroupContent from '../components/InfGroupContent'

@inject('store')
@observer
class InfGroupList extends React.Component{

    @observable name = ""
    @observable groups = []

    @action findGroup = () => {
        const { store } = this.props
        axios.post("http://api.daeoebi.com/infgroups/findgroup/", ({
            name: this.name
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.groups = res.data
            
        })
        .catch(err => {
            
        })
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action getGroup = () => {
        const { store } = this.props
        axios.get("http://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.groups = res.data['results']
        })
        .catch(err => {
            
        })
    }
    @action update = (id) => {
        this.props.history.push(`/groups/${id}/update`)
    }
    @action remove = (id) => {
        const { store } = this.props
        axios.delete("http://api.daeoebi.com/infgroups/" + id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            alert("삭제 실패")
        })
    }

    componentDidMount(){
        this.getGroup()
    }

    render(){
        const grouplist = this.groups.map(group => (
            <InfGroupContent
                name={group.name}
                key={group.id}
                update={() => this.update(group.id)}
                remove={() => this.remove(group.id)}
            />
        ))
        return(
            <div className="group-container">
                <Header/>
                <div className="group-sticky">
                    <div className="group-header">
                        <div className="group-header-title">그룹 관리</div>
                        <input className="group-header-search" value={this.name} onChange={this.handleChange} name="name" placeholder="그룹 이름"/>
                        <div className="group-header-btn" onClick={() => this.findGroup()}>검색</div>
                    </div>
                    <div className="group-body">
                        <div className="group-body-header">
                            <div className="group-body-header-text">이름</div>
                            <div className="group-body-header-text">이름</div>
                        </div>
                        <div className="group-body-content">
                            {grouplist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfGroupList