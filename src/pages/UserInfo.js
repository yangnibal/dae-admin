import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Api } from '../utils/Api'

function UserInfo(props){

    const [ userInfo, setUserInfo ] = useState({})
    const [ userData, setUserData ] = useState({
        test: 0,
        student: 0,
        score: 0
    })

    useEffect(() => {

        const doRes = (res) => {
            setUserInfo(res.data['user'])
            setUserData({
                test: res.data['test'].length,
                student: res.data['student'].length,
                score: res.data['score'].length
            })
            console.log(res.data)
        }

        const doErr = (err) => {
            console.log(err)
        }

        const data = {
            url: "users/getusers/",
            method: "post",
            data: {
                username: props.match.params.username
            },
            doRes: doRes,
            doErr: doErr
        }
        Api(data)
    }, [props.match.params.username])

    return(
        <div className="userinfo-container">
            <Header/>
            <div className="userinfo-sticky">
                <div className="userinfo-title">{userInfo.name}사용자 정보</div>
                <div className="userinfo-top">
                    <div className="userinfo-top-title">
                        <div className="title-text">아이디</div>
                        <div className="title-text">이메일</div>
                        <div className="title-text">1급 정보</div>
                        <div className="title-text">1급 정보(저장)</div>
                        <div className="title-text">성적 등급 관리</div>
                        <div className="title-text">교재 출력</div>
                        <div className="title-text">교재 출력(저장)</div>
                    </div>
                    <div className="userinfo-top-text">
                        <div className="text-text">{userInfo.username}</div>
                        <div className="text-text">{userInfo.email}</div>
                        <div className="text-text">{userInfo.can_access_1===true ? "사용 가능" : "사용 불가능"}</div>
                        <div className="text-text">{userInfo.can_save_1===true ? "사용 가능" : "사용 불가능"}</div>
                        <div className="text-text">{userInfo.can_access_2===true ? "사용 가능" : "사용 불가능"}</div>
                        <div className="text-text">{userInfo.can_access_3===true ? "사용 가능" : "사용 불가능"}</div>
                        <div className="text-text">{userInfo.can_save_3===true ? "사용 가능" : "사용 불가능"}</div>
                    </div>
                </div>
                <div className="userinfo-bot">
                    <div className="userinfo-bot-title">
                        <div className="title-text">등록 테스트 수</div>
                        <div className="title-text">등록 학생 수</div>
                        <div className="title-text">등록 성적표 수</div>
                    </div>
                    <div className="userinfo-bot-text">
                        <div className="text-text">{userData.test}</div>
                        <div className="text-text">{userData.student}</div>
                        <div className="text-text">{userData.score}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo