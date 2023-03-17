import {io} from 'socket.io-client'


// create a socket-client instance so that we can use its method by requiring instance

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }
    // returns socket client instance
    // no need to install env package because react app already has this config we just have to user the REACT_APP_ prefix 
    return io(process.env.REACT_APP_BACKEND_URL,options)
}