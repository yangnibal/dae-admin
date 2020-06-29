import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from '../images/logo2.png'

const Header = () => {
    const ltoken = localStorage.getItem('admin_token')
    const stoken = sessionStorage.getItem('admin_token')
    var token = ""
    if(ltoken===null){
        token = stoken
    } else {
        token = ltoken
    }
    return (
        <div className="header-container">
            <Link to="/">
                <img src={Logo} alt={Logo} width="190px" height="40px" className="header-logo"/>
            </Link>
            <div className="header-data">
                <Link to="/inf" className="header-data-content">1급 정보</Link>
                <Link to="/" className="header-data-content">성적 등급</Link>
                <Link to="/inf/file" className="header-data-content">교재 출력</Link>
            </div>
            <a target="blank" href="https://blog.naver.com/dreamlearnforu" className="link-dae-home">대외비 블로그<br/>바로가기</a>
            <a target="blank" href="http://dreamrun.itforone.co.kr/bbs/login.php" className="link-dae-app">[대외비 APP 학습 관리]<br/>프로그램 바로가기</a>
            {token===null? <Link className="link-login" to="/account/login">로그인</Link> :
            <span className="span"><Link className="link-login" to="/account/login">로그아웃</Link>&nbsp;/&nbsp;<Link className="link-login" to="/account/edit">내정보 수정</Link></span> }
            <a href="https://www.daeoebi.com" className="admin-btn">user</a>
            <div className="goBack" onClick={() => window.history.back()}>뒤로가기</div>
        </div>
    )
}
//logo 비율=23:5
export default Header