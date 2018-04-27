const router = require('express').Router()
const {ListItem, Recommendation} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  ListItem.findAll()
  .then(items => {
    res.json(items)
  })
  .catch(next)
})

router.get('/:category', (req, res, next) => {
  const category = req.params.category
  ListItem.findAll({
    where: {
      category
    }
  })
  .then(items => {
    res.json(items)
  })
  .catch(next)
})


