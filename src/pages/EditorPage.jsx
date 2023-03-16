import React, { useState } from 'react'
import Client from '../Components/Client/Client'
import Editor from '../Components/Editor/Editor'

const EditorPage = () => {

  const [clients, setClients] = useState([
    { socketId: 1, username: "Jay panchal" },
    { socketId: 2, username: "avani joshi" },
    { socketId: 2, username: "Kashish shah" },
    { socketId: 2, username: "Sparsh lohana" },
    { socketId: 2, username: "Kareena khan" },
    { socketId: 2, username: "Deep prajapati" },
    { socketId: 2, username: "Pragya" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
    { socketId: 2, username: "Archi shah" },
  ])

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
                clients.map((item, index) => <Client key={index} socketId={item.socketId} username={item.username} />)
              }
            </div>
          </div>
          <div className="buttons">
            <button className="btn copyRoomIdBtn">Copy Room ID</button>
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