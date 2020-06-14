import React from 'react'
import Header from '../components/Header'
import Bg from '../images/index.png'
import { Link } from 'react-router-dom'
import './Home.scss'

class Home extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                
                <div className="home-content-container">
                    <Link to="/inf" className="home-content"><span className="span-1">1급 정보</span><span>자료 관리</span></Link>
                    <Link to="/users" className="home-content"><span className="span-1">대외비 프로그램</span><span>사용자 관리</span></Link> 
                </div>
                <div className="background-container">
                    <img src={Bg} alt={Bg} className="home-background"/>    
                </div>
            </div>
        )
    }
}

export default Home