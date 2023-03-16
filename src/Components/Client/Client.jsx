import React from 'react'
import Avatar from "react-avatar"
import "./client.scss"
const Client = ({ socketId, username }) => {
    return (
        <div className="client">
            <Avatar name={username} size="50px" round="14px" />
            <p className='username'>{username}</p>
        </div>
    )
}

export default Client