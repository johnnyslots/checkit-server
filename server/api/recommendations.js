const router = require('express').Router()
const {Recommendation, User, ListItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Recommendation.findAll({
      include: [
      {
        model: User,
        as: 'from'
      },
      {
        model: User,
        as: 'to'
      },
      {
        model: ListItem,
        as: 'item'
      }
    ]
  })
  .then(recs => {
    res.json(recs)
  })
  .catch(next)
})
