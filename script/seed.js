const db = require('../server/db')
const {User, ListItem, Recommendation} = require('../server/db/models')

const listItem = [
  {
    category: 'books',
    title: 'The Catcher in the Rye'
  },
  {
    category: 'books',
    title: 'To Kill a Mockingbird'
  },
  {
    category: 'books',
    title: 'War and Peace'
  },
  {
    category: 'books',
    title: 'In Search of Lost Time'
  },
  {
    category: 'movies',
    title: 'The Godfather'
  },
  {
    category: 'movies',
    title: 'Titanic'
  }
]

const recommendation = [
  {
    notes: 'Classic book - must read',
    isPending: true,
    itemId: 1,
    fromId: 2,
    toId: 1
  },
  {
    notes: 'Absolute page-turner',
    itemId: 2,
    toId: 1
  },
  {
    notes: 'great book',
    isPending: true,
    itemId: 3,
    fromId: 3,
    toId: 1
  },
  {
    notes: 'amazing!',
    itemId: 4,
    toId: 1
  },
  {
    notes: 'Great movie!',
    itemId: 5,
    fromId: 2,
    toId: 1
  }
]

const user = [
  {
    firstName: 'Cody',
    lastName: 'Smith',
    email: 'cody@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Murphy',
    lastName: 'Johnson',
    email: 'murphy@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Mike',
    lastName: 'Jackson',
    email: 'mike@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    await User.bulkCreate(user),
    await ListItem.bulkCreate(listItem),
    await Recommendation.bulkCreate(recommendation)
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
