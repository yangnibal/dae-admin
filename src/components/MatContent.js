import React from 'react'
import './Content.scss'

const MatContent = ({name, subject, grade, group, link, remove, update}) => {
    return(
        <div className="matcontent-container">
            <div className="matcontent-text">{name}</div>
            <div className="matcontent-text">{subject}</div>
            <div className="matcontent-text">{grade}</div>
            <div className="matcontent-text">{group}</div>
            <a href={link} target="blank" className="matcontent-text">해당 자료 보러가기</a>
            <div className="matcontent-btns">
                <div className="matcontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="matcontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default MatContent