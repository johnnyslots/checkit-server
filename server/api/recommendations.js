const router = require('express').Router()
const {Recommendation, User, ListItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Recommendation.findAll({
    include: [
      {all: true}
    ]
  })
  .then(recs => {
    res.json(recs)
  })
  .catch(next)
})

router.get('/pending/users/:userId', (req, res, next) => {
  const userId = req.params.userId
  Recommendation.findAll({
    where: {
      isPending: true,
      toId: userId
    },
    include: [
      {all: true}
    ]
  })
  .then(pendingRecs => {
    res.json(pendingRecs);
  })
  .catch(next)
})

router.get('/:category/users/:userId', (req, res, next) => {
  const category = req.params.category
  const userId = req.params.userId
  Recommendation.findAll({
    where: {
      isPending: false,
      toId: userId
    },
    include: [
      {all: true}
    ]
  })
  .then(recs => {

    const filteredByCategory = recs.filter(rec => {
      return rec.item.category === category;
    })
    res.json(filteredByCategory);
  })
  .catch(next)
})

router.post('/ownRec', (req, res, next) => {
  const { item, userId, category } = req.body;
  const notes = item.notes;

  ListItem.findOrCreate({
    where: {
      category,
      title: item.title
    }
  })
  .spread((item, created) => {
    return Recommendation.create({
      notes,
      itemId: item.id,
      toId: userId
    })
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})

// router.post('/', (req, res, next) => {
//   const {category, title, notes} = req.body.postData
//   const fromId = req.body.postData.sender ? req.body.postData.sender.id : null
//   let toId = req.body.user ? req.body.user.id : null
//   const email = req.body.userEmail
//   const isPending = req.body.postData.sender ? true : false
//   if(!toId) {
//     User.findOne({
//       where: {
//         email
//       }
//     })
//     .then(user => {
//       toId = user.id
//     })
//   }
//   ListItem.findOrCreate({
//     where: {
//       category,
//       title
//     }
//   })
//   .spread((item, create) => {
//     return Recommendation.create({
//       notes,
//       itemId: item.id,
//       fromId,
//       toId,
//       isPending
//     })
//   })
//   .then(() => {
//     Recommendation.findAll({
//       where: {
//         isPending: false,
//         toId
//       },
//       include: [
//         {all: true}
//       ]
//     })
//     .then(recs => {
//       res.json(recs)
//     })
//   })
//   .catch(next)
// })

// router.put('/pending/:id', (req, res, next) => {
//   const id = req.params.id
//   Recommendation.findById(id)
//   .then(rec => {
//     rec.update({
//       isPending: false
//     })
//   })
//   .then(updatedRec => {
//     res.status(200).send(updatedRec)
//   })
//   .catch(next)
// })

// router.delete('/:id', (req, res, next) => {
//   const id = req.params.id
//   Recommendation.findById(id)
//   .then(rec => {
//     ListItem.findById(rec.itemId)
//     .then(listItem => {
//       listItem.destroy()
//       rec.destroy()
//     })
//     .then((deletedRec) => {
//       res.status(201).send(deletedRec)
//     })
//     .catch(next)
//   })
// })
