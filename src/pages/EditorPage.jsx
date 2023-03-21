import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ACTIONS from '../Actions';
import Client from '../Components/Client/Client'
import Editor from '../Components/Editor/Editor'
import { initSocket } from '../socket';

const EditorPage = () => {

  const socket = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();

  const handleErrors = (err) => {
    console.log('socket error => ', err)
    toast.error("Socket connection failed, try again later.", {
      icon: "☹"
    })
    reactNavigator('/')

  }

  const handleConnect = (con) => {
    toast('Connected to the room!', {
      icon: '🙋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  }

  const [clients, setClients] = useState([])

  useEffect(() => {
    const init = async () => {
      // as soon as initsocket calls our client gets connected to our server
      socket.current = await initSocket();

      socket.current.on("connect-error", (err) => handleErrors(err))
      socket.current.on("connect-failed", (err) => handleErrors(err))
      socket.current.on("connect", (con) => {
        handleConnect(con)
      })

      // hitting a event to send it to server that i have opened the editor page and join me
      socket.current.emit(ACTIONS.JOIN, {
        roomId: location.state.roomId,
        userName: location.state?.userName
      })

      // Litening for joined event
      socket.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
        // dont notify client itself
        if (userName !== location.state.userName) {
          toast.success(`${userName} joined the room`, {
            duration: 5000
          });
        }
        setClients(clients)
      })

      socket.current.on(ACTIONS.LEAVE, ({ userName, socketId }) => {

        toast.success(`${userName} left the room`, {
          duration: 5000
        })

        setClients(prev => {
          return prev.filter((client) => {
            return client.socketId !== socketId
          })
        })
      })

    }

    init()

  }, [])

  if (!location.state) {

    <Navigate to="/" />
  }




  const handleCopyBtnClick = (e) => {
    toast.success('Copied to clipboard!')
  }


  return (
    <>
      <div className="editorWrapper">

        {/* ---------------------------------------------- */}

        <div className="left">
          {/* just to make it flexbox */}
          <div className="leftInner">
            <div className="logo">
              <img src="/code-sync.png" className='logoImg' alt="code-sync-logo" />
            </div>
            <h5>Connected</h5>
            <div className="clientsList">
              {
                clients.map((item, index) => <Client key={index} socketId={item.socketId} username={item.userName} />)
              }
            </div>
          </div>
          <div className="buttons">
            <button className="btn copyRoomIdBtn" onClick={handleCopyBtnClick} >Copy Room ID</button>
            <button className="btn leaveBtn">Leave</button>
          </div>
        </div>

        {/* ---------------------------------------------- */}

        <div className="right">
          <Editor />
        </div>

      </div>
    </>
  )
}

export default EditorPage