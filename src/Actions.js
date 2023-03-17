// create events for server as well as for client so that they can send events using web sockets00

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SUNC_CODE: 'sync-code',
    LEAVE : 'leave'
}

module.exports = ACTIONS;