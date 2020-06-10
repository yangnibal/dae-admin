import React from 'react'
import './Content.scss'

const VidContent = ({name, subject, grade, group, time, watchVid}) => {
    return(
        <div className="vidcontent-container">
            <div className="vidcontent-text">{name}</div>
            <div className="vidcontent-text">{subject}</div>
            <div className="vidcontent-text">{grade}</div>
            <div className="vidcontent-text">{group}</div>
            <div className="vidcontent-text">{time}</div>
            <div className="vidcontent-text" onClick={watchVid}>동영상 시청 하기</div>
        </div>
    )
}

export default VidContent