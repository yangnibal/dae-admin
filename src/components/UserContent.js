import React from 'react'
import './Content.scss'

const UserContent = ({name, username, phone_number, email, can_access_1, can_access_2, remove, update}) => {
    return(
        <div className="usercontent-container">
            <div className="usercontent-text">{name}</div>
            <div className="usercontent-text">{username}</div>
            <div className="usercontent-text">{phone_number}</div>
            <div className="usercontent-text">{email}</div>
            <div className="usercontent-text">
                <div className="usercontent-checkbox">{can_access_1===true ? "✓" : null}</div>
            </div>
            <div className="usercontent-text">
                <div className="usercontent-checkbox">{can_access_2===true ? "✓" : null}</div>
            </div>
            <div className="usercontent-btns">
                <div className="usercontent-btn" onClick={update}>수정&nbsp;</div>/
                <div className="usercontent-btn" onClick={remove}>&nbsp;삭제</div>
            </div>
        </div>
    )
}

export default UserContent