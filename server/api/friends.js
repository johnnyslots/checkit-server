const router = require('express').Router()
const {UserRelationship, User} = require('../db/models')
module.exports = router

router.get('/pending/users/:userId', (req, res, next) => {
  const { userId } = req.params
  UserRelationship.findAll({
    where: {
      friendId: userId,
      status: 'pending'
    },
    include: [{
      model: User,
      as: 'user'
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
  .then(pendingFriends => {
    res.json(pendingFriends)
  })
  .catch(next)
})

router.put('/pending/:requestId/accept', (req, res, next) => {
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

router.put('/pending/:requestId/dismiss', (req, res, next) => {
  const id = req.params.requestId
  UserRelationship.findById(id)
  .then(request => {
    return request.update({
      status: 'rejected'
    })
  })
  .then(rejectedRequest => {
    res.status(200).send(rejectedRequest)
  })
  .catch(next)
})

router.post('/requests', (req, res, next) => {
  const { currentUserId } = req.body
  const friendId = req.body.userId
  UserRelationship.findOrCreate({
    where: {
      userId: currentUserId,
      friendId
    }
  })
  .spread((item, created) => {
    const friendStatus = {
      friendId,
      status: item.dataValues.status
    }
    res.json(friendStatus)
  })
  .catch(next)

})
