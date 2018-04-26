/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, ListItem, Recommendation} = require('../server/db/models')
// const ListItem = require('../server/db/models/listItem')

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
    notes: 'Great movie!',
    itemId: 5,
    fromId: 2,
    toId: 1
  }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    await User.create({email: 'cody@email.com', password: '123'}),
    await User.create({email: 'murphy@email.com', password: '123'}),
    await ListItem.bulkCreate(listItem),
    await Recommendation.bulkCreate(recommendation)
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
