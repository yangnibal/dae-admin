import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'

@inject('store')
@observer
class VidDetail extends React.Component{

    @observable url = ""
    @observable iframe = ""

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.get("https://api.daeoebi.com/videos/" + path + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.url = res.data['video']
            this.iframe = res.data['iframe']
        })
        .catch(err => {
                    
        })
    }

    render(){
        return(
            <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <Header/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                    {this.iframe==="" ? 
                    <video autoPlay controlsList="nodownload" controls height="720" width="1280" style={{outline: "none"}}>
                        <source src={this.url} type="video/mp4"/>
                    </video> :
                    <iframe src={this.iframe} title={this.iframe}/>
                    }
                </div>
            </div>
        )
    }
}

export default VidDetail