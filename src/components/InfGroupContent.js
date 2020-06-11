import React from 'react'

const InfGroupContent = ({name, remove, update}) => {
    return(
        <div className="groupcontent-container">
            <div className="groupcontent-text">{name}</div>
            <div className="groupcontent-btns">
                <div className="groupcontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="groupcontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default InfGroupContent