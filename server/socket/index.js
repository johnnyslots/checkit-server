const {User} = require('../db/models')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newRec', (data) => {
      socket.broadcast.emit('newRec', data)
    })

    socket.on('newRecRequest', (data) => {
      socket.broadcast.emit('newRecRequest', data)
    })

    socket.on('friendRequest', (data) => {
      socket.broadcast.emit('friendRequest', data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
