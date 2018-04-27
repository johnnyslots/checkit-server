const router = require('express').Router()
const {Recommendation, User, ListItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // console.log('SESIONS!!', req.session,req.user)
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

//try defaultScope in model instead of eager loading here
router.post('/', (req, res, next) => {
  const category = req.body.category
  const title = req.body.title
  const notes = req.body.notes
  ListItem.findOrCreate({
    where: {
      category,
      title
    }
  })
  .spread((item, create) => {
    return Recommendation.create({
      notes,
      itemId: item.id
    })
  })
  .then(() => {
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
  })
  .catch(next)
})

router.get('/books', (req, res, next) => {
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
    const books = recs.filter(rec => {
      return rec.item.category === 'books';
    })
    res.json(books);
  })
  .catch(next)
})
