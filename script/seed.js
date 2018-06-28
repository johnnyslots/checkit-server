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
    category: 'books',
    title: 'The Magicians'
  },
  {
    category: 'books',
    title: 'Harry Potter and the Deathly Hallows'
  },
  {
    category: 'movies',
    title: 'The Godfather'
  },
  {
    category: 'movies',
    title: 'The Departed'
  },
  {
    category: 'movies',
    title: 'The Dark Knight'
  },
  {
    category: 'movies',
    title: 'Titanic'
  },
  {
    category: 'podcasts',
    title: 'This American Life'
  },
  {
    category: 'podcasts',
    title: 'How I built This'
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
  },
  {
    category: 'tv shows',
    title: 'Last Week Tonight'
  },
  {
    category: 'tv shows',
    title: 'Top Chef'
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
    notes: 'Great book!',
    itemId: 5,
    fromId: 4,
    toId: 1
  },
  {
    notes: 'Some notes about this book!',
    itemId: 6,
    fromId: 3,
    toId: 4
  },
  {
    notes: 'Some notes about this moive!',
    itemId: 7,
    fromId: 4
  },
  {
    notes: 'Top 5 movies of all time',
    isPending: true,
    itemId: 8,
    fromId: 5,
    toId: 3
  },
  {
    notes: 'Will blow your mind. Please watch this so we can talk about it.',
    itemId: 9,
    fromId: 1,
    toId: 5
  },
  {
    notes: 'How have you not seen this yet?',
    isPending: true,
    itemId: 10,
    fromId: 1
  },
  {
    notes: 'Interesting',
    itemId: 11,
    fromId: 4,
    toId: 2
  },
  {
    notes: 'Very informative.',
    itemId: 12,
    fromId: 1,
    toId: 5
  },
  {
    notes: 'Great for subway rides',
    itemId: 13,
    fromId: 1
  },
  {
    notes: 'Unbelievable show. Please watch this so we can talk about it.',
    isPending: true,
    itemId: 14,
    fromId: 5,
    toId: 1
  },
  {
    notes: 'You will love this show',
    itemId: 15,
    fromId: 5,
    toId: 2
  },
  {
    notes: 'One of my all-time favorites',
    itemId: 16,
    fromId: 5,
    toId: 3
  },
  {
    notes: 'Can\'t wait for next season!',
    itemId: 17,
    fromId: 4,
    toId: 3
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
  },
  {
    category: 'podcasts',
    message: 'Can you recommend something for long subway rides?',
    fromId: 4,
    toId: 1
  },
  {
    category: 'tv shows',
    message: 'Finally finished The Sopranos - what should I watch next?',
    fromId: 5,
    toId: 1
  },
  {
    category: 'movies',
    message: 'looking for a good comedy - have any recommendations?',
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
    fullName: 'Murphy Johnson',
    email: 'murphy@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Mike Jackson',
    email: 'mike@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Yoni Slotwiner',
    email: 'yoni@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Shira Beery',
    email: 'shira@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Tracie Tellier',
    email: 'tracie@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Josette Janson',
    email: 'josette@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Clementine Cowan',
    email: 'clementine@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Thad Timpson',
    email: 'thad@email.com',
    password: '5fb6e1eb2e40b3fa38d45dad666c0d109698f594c06af808a0ac83488c88c696',
    salt: 'ByOKr1/DYTmHMa/8VbRsYg=='
  },
  {
    fullName: 'Luther Lamore',
    email: 'luther@email.com',
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
    userId: 4,
    friendId: 1
  },
  {
    status: 'pending',
    userId: 5,
    friendId: 1
  },
  {
    status: 'pending',
    userId: 3,
    friendId: 2
  },
  {
    status: 'accepted',
    userId: 4,
    friendId: 2
  },
  {
    status: 'accepted',
    userId: 5,
    friendId: 2
  },
  {
    status: 'accepted',
    userId: 3,
    friendId: 4
  },
  {
    status: 'accepted',
    userId: 5,
    friendId: 4
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
