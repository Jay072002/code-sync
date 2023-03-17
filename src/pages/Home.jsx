import React, { useState } from 'react'
import { v4 as uuid } from "uuid"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')

    const createNewRoomId = (e) => {
        e.preventDefault();

        const id = uuid()
        setRoomId(id)
        toast.success('Created a new room', {
            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        })
    }

    const joinRoom = () => {
        if (!roomId || !userName) {
            toast.error("ROOM Id and username is required");
            return;
        }

        // redirect
        navigate(`/editor/${roomId}`, {
            state: {
                userName,
                roomId
            },
            //replace: true //will not create a history stack instead it will replace ==>commented because it does not work if we press back from other page it just navigate to the google home pae because it lost the history stack
        })
    }

    const handleEnterKey = (e) => {
        if (e.code === 'Enter') {
            joinRoom()
        }
    }

    return (
        <>
            <div className="homePageWrapper">
                <div className="formWrapper">
                    <img src="/code-sync.png" className='logoImg' alt="code-sync-logo" />
                    <h6>Paste invitation ROOM ID</h6>
                    <input type="text" placeholder='ROOM ID' name='roomId' value={roomId} onKeyUp={handleEnterKey} onChange={(e) => {
                        setRoomId(e.target.value)
                    }} />
                    <input type="text" placeholder='USERNAME' name='username' value={userName} onKeyUp={handleEnterKey} onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                    <button className='btn joinBtn' onClick={joinRoom} >Join</button>
                    <div>If you don't have an invite then create <a onClick={createNewRoomId} href="#">new room</a></div>
                </div>
            </div>
        </>
    )
}

export default Home