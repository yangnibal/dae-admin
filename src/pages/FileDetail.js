import React from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { observable, action } from 'mobx'

@inject('store')
@observer
class FileDetail extends React.Component{

    @observable file = ""
    @observable isLoad = false
    @observable url = ""

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
            this.file = "https://docs.google.com/viewerng/viewer?url=" + res.data['file']
            this.url = res.data['file']
        })
        .catch(err => {
                    
        })
        setTimeout(() => {
            if(this.isLoad===false){
                window.location.reload()
            }
        }, 5000)
    }

    render(){
        
        return(
            <div style={{width:"100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "rgb(209, 209, 209)"}}>
                <iframe id="iframe" onLoad={() => this.handleLoad()} title={this.file} src={this.file} style={{border: "none", width: "100vw", height: "100vh"}}/>
                <div style={{position: "fixed", right: "12px", bottom: "12px", background: "rgb(209, 209, 209)", width: "120px", height: "40px", color: "white", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", fontWeight: "500", cursor: "pointer"}}>인쇄하기</div>
            </div>
        )
    }
}

export default FileDetail