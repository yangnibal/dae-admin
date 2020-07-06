import React from 'react'

const FileContent = ({name, subject, grade, group, update, remove, seeFiles, link}) => {
    return(
        <div className="filecontent-container">
            <div className="filecontent-text">{name}</div>
            <div className="filecontent-text">{subject}</div>
            <div className="filecontent-text">{grade}</div>
            <div className="filecontent-text">{group}</div>
            <a target="blank" className="filecontent-text" href={`https://docs.google.com/viewer?url=${link}`}>자료 보기</a>
            <div className="filecontent-btns">
                <div className="filecontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="filecontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default FileContent