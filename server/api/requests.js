const router = require('express').Router()
const {Request, User} = require('../db/models')
module.exports = router

router.get('/users/:userId', (req, res, next) => {
  const userId = req.params.userId
  Request.findAll({
    where: {
      toId: userId,
      isFulfilled: false
    },
    include: [{
      model: User,
      as: 'from'
    }]
  })
  .then(requests => {
    res.json(requests)
  })
  .catch(next)
})


router.post('/', (req, res, next) => {
  const { category, message } = req.body.requestInfo
  const fromId = req.body.requestInfo.sender.id
  const toId = req.body.toId
  Request.create({
    category,
    message,
    fromId,
    toId
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})
