const router = require('express').Router()
const {Recommendation, User, ListItem} = require('../db/models')
const Expo = require('expo-server-sdk')
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

let expo = new Expo();
let messages = []
messages.push({
  to: 'ExponentPushToken[ruNca8Mv_4P2ExEUvtoe1N]',
  sound: 'default',
  title: 'TEST',
  body: 'This is a test notification'
})
let chunks = expo.chunkPushNotifications(messages);


router.post('/', (req, res, next) => {
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    console.log('CHUNK!!!', chunk)
    try {
      let receipts = await expo.sendPushNotificationsAsync(chunk);
      console.log(receipts);
    } catch (error) {
      console.error(error);
    }
  }
})();
  const { category, title, notes } = req.body.recInfo
  const fromId = req.body.recInfo.senderId
  const { toId } = req.body
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
  .then(() => {
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
