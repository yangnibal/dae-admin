import React from 'react'
import './Content.scss'

const VidContent = ({name, subject, grade, group, time, watchVid, update, remove}) => {
    return(
        <div className="vidcontent-container">
            <div className="vidcontent-text">{name}</div>
            <div className="vidcontent-text">{subject}</div>
            <div className="vidcontent-text">{grade==="" ? "전체" : grade}</div>
            <div className="vidcontent-text">{group}</div>
            <div className="vidcontent-text">{time}</div>
            <div className="vidcontent-text" onClick={watchVid}>동영상 시청 하기</div>
            <div className="vidcontent-btns">
                <div className="vidcontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="vidcontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default VidContent