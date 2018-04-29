const {User} = require('../db/models')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newRec', (data) => {
      socket.broadcast.emit('newRec', data)
    })

    socket.on('requestRec', (data) => {
      console.log('backend socket data!', data)
      socket.broadcast.emit('requestRec', data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
