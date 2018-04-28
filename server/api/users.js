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
