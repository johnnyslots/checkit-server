const router = require('express').Router()
const {UserRelationship, User} = require('../db/models')
module.exports = router

router.get('/pending/users/:userId', (req, res, next) => {
  const { userId } = req.params
  UserRelationship.findAll({
    where: {
      userId,
      status: 'pending'
    },
    include: [{
      model: User,
      as: 'friend'
    }]
  })
  .then(pendingFriends => {
    res.json(pendingFriends)
  })
  .catch(next)
})

router.put('/pending/:requestId', (req, res, next) => {
  const id = req.params.requestId
  UserRelationship.findById(id)
  .then(request => {
    return request.update({
      status: 'accepted'
    })
  })
  .then(acceptedRequest => {
    res.status(200).send(acceptedRequest)
  })
  .catch(next)
})
