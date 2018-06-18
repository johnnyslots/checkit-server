const router = require('express').Router()
const {Recommendation, User, ListItem, Request} = require('../db/models')
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

router.post('/', (req, res, next) => {
  const { category, title, notes } = req.body.recInfo
  const fromId = req.body.recInfo.sender.id
  const { toId } = req.body.toId ? req.body : req.body.recInfo
  const { requestId } = req.body.recInfo
  ListItem.findOrCreate({
    where: {
      category,
      title
    }
  })
  .spread((item, created) => {
    return Recommendation.create({
      notes,
      itemId: item.id,
      isPending: true,
      fromId,
      toId
    })
  })
  .then((rec) => {
    if(requestId) {
      Request.findById(requestId)
      .then(request => {
        return request.update({
          isFulfilled: true,
          itemId: rec.itemId
        })
      })
      .catch(next)
    }
    res.sendStatus(201)
  })
  .catch(next)

})

router.put('/pending/:id', (req, res, next) => {
  const id = req.params.id
  Recommendation.findById(id)
  .then(rec => {
    return rec.update({
      isPending: false
    })
  })
  .then(updatedRec => {
    res.status(200).send(updatedRec)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Recommendation.findById(id)
  .then(rec => {
    ListItem.findById(rec.itemId)
    .then(listItem => {
      listItem.destroy()
      rec.destroy()
    })
    .then((deletedRec) => {
      res.status(201).send(deletedRec)
    })
    .catch(next)
  })
})
