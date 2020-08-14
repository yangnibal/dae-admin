import axios from 'axios'

export function getToken(){
    const ltoken = localStorage.getItem('admin_token')
    const stoken = sessionStorage.getItem('admin_token')
    var token = ""
    if(ltoken===null){
        token = stoken
    } else {
        token = ltoken
    }
    return token
}

const defaultUrl = "https://api.daeoebi.com/"

export function Api(props){
    axios({
        url: defaultUrl + props.url,
        method: props.method,
        data: props.data,
        headers: {
            Authorization: "Token " + getToken()
        }
    })
    .then(res => {
        props.doRes(res)
    })
    .catch(err => {
        props.doErr(err)
    })
}