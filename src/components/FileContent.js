import React from 'react'

const FileContent = ({name, subject, grade, group, update, remove, seeFiles}) => {
    return(
        <div className="filecontent-container">
            <div className="filecontent-text">{name}</div>
            <div className="filecontent-text">{subject}</div>
            <div className="filecontent-text">{grade}</div>
            <div className="filecontent-text">{group}</div>
            <div className="filecontent-text" onClick={seeFiles}>자료 미리보기</div>
            <div className="filecontent-btns">
                <div className="filecontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="filecontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default FileContent