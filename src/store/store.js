import { observable, action } from 'mobx'
import axios from 'axios'

export default class Store{
    @action getToken(){
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
    @observable schoolyear = [
        { value: "초1", label: "초1" },
        { value: "초2", label: "초2" },
        { value: "초3", label: "초3" },
        { value: "초4", label: "초4" },
        { value: "초5", label: "초5" },
        { value: "초6", label: "초6" },
        { value: "중1", label: "중1" },
        { value: "중2", label: "중2" },
        { value: "중3", label: "중3" },
        { value: "고1", label: "고1" },
        { value: "고2", label: "고2" },
        { value: "고3", label: "고3" },
    ]
    @observable semester = [
        { value: "1학기 중간", label: "1학기 중간" },
        { value: "1학기 기말", label: "1학기 기말" },
        { value: "2학기 중간", label: "2학기 중간" },
        { value: "2학기 기말", label: "2학기 기말" },
        { value: "3월 모의고사", label: "3월 모의고사" },
        { value: "6월 모의고사", label: "6월 모의고사" },
        { value: "9월 모의고사", label: "9월 모의고사" },
        { value: "11월 모의고사", label: "11월 모의고사" },
    ]
    @observable subject = [
        { value: "수학", label: "수학" },
        { value: "영어", label: "영어" },
        { value: "국어", label: "국어" },
        { value: "과학", label: "과학" },
    ]
    @observable group = []
    @observable infgroup = []

    @action getGroup = () => {
        const group = []
        axios.get("http://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + this.getToken()
            }
        })
        .then(res => {
            var data = res.data['results']
            for(var i in data){
                group.push({value: data[i]['name'], label: data[i]['name']})
            }
            this.infgroup = group
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}