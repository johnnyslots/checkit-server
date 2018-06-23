const db = require('../server/db')
const {User, ListItem, Recommendation, Request, UserRelationship} = require('../server/db/models')

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
  },
  {
    category: 'podcasts',
    title: 'The Champs'
  },
  {
    category: 'podcasts',
    title: 'Javascript Jabber'
  },
  {
    category: 'tv shows',
    title: 'Breaking Bad'
  },
  {
    category: 'tv shows',
    title: 'Westworld'
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
  },
  {
    notes: 'Some notes about this movie!',
    itemId: 6,
    fromId: 3,
    toId: 4
  },
  {
    notes: 'Some notes about this podcast!',
    itemId: 7,
    fromId: 4,
    toId: 3
  },
  {
    notes: 'Top 5 shows of all time',
    itemId: 8,
    fromId: 5,
    toId: 3
  },
  {
    notes: 'Will blow your mind. Please watch this so we can talk about it.',
    itemId: 9,
    fromId: 1,
    toId: 5
  }
]

const request = [
  {
    category: 'books',
    message: 'looking for a new sci-fi book - can you suggest anything?',
    fromId: 2,
    toId: 3
  },
  {
    category: 'books',
    message: 'read any good autobiographies lately?',
    fromId: 1,
    toId: 3
  },
  {
    category: 'movies',
    message: 'trying to netflix and chill this saturday and need a good movie to watch - can you recommend something plz???',
    fromId: 2,
    toId: 1
  }
]

const user = [
  {
    fullName: 'Cody Smith',
    email: 'cody@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Murphy',
    lastName: 'Johnson',
    fullName: 'Murphy Johnson',
    email: 'murphy@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Mike',
    lastName: 'Jackson',
    fullName: 'Mike Jackson',
    email: 'mike@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Yoni',
    lastName: 'Slotwiner',
    fullName: 'Yoni Slotwiner',
    email: 'yoni@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    firstName: 'Shira',
    lastName: 'Beery',
    fullName: 'Shira Beery',
    email: 'shira@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  }
]

const userRelationship = [
  {
    status: 'pending',
    userId: 1,
    friendId: 2
  },
  {
    status: 'accepted',
    userId: 1,
    friendId: 3
  },
  {
    status: 'rejected',
    userId: 3,
    friendId: 2
  }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    await User.bulkCreate(user),
    await ListItem.bulkCreate(listItem),
    await Recommendation.bulkCreate(recommendation),
    await Request.bulkCreate(request),
    await UserRelationship.bulkCreate(userRelationship)
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
