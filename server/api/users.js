const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/search/:input', (req, res, next) => {
  const input = req.params.input.toLowerCase()
  User.findAll({
    where: {
      email: {
        $like: `%${input}%`
      }
    }
  })
  .then(users => {
    res.json(users)
  })
  .catch(next)
})

router.get('/:userEmail', (req, res, next) => {
  const email = req.params.userEmail
  User.findOne({
    where: {
      email
    }
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
})

router.put('/push-token', (req, res, next) => {
  const email = req.body.user.email
  const expoPushToken = req.body.token.value
  User.findOne({
    where: {
      email
    }
  })
  .then(user => {
    return user.update({
      expoPushToken
    })
  })
  .then(() => {
    res.sendStatus(200)
  })
  .catch(next)
})
