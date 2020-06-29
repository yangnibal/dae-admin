import React from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { observable, action } from 'mobx'

@inject('store')
@observer
class FileDetail extends React.Component{

    @observable file = ""
    @observable isLoad = false
    
    @action handleLoad = () => {
        this.isLoad = !this.isLoad
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.get("https://api.daeoebi.com/files/" + path + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.file = "https://docs.google.com/viewer?url=" + res.data['file'] + "&embedded=true"
        })
        .catch(err => {
                    
        })
    }

    render(){
        
        return(
            <div style={{width:"100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <iframe onLoad={() => this.handleLoad()} title={this.file} src={this.file} style={{border: "none", width: "100vw", height: "100vh"}}/>
                {this.isLoad===false ? null : <div onClick={() => this.props.history.goBack()} style={{position: "absolute", right: "12px", top: "12px", background: "rgb(209, 209, 209)", width: "120px", height: "40px", color: "white", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", fontWeight: "500", cursor: "pointer"}}>뒤로가기</div>}
            </div>
        )
    }
}

export default FileDetail