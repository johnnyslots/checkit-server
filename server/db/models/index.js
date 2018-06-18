const User = require('./user')
const ListItem = require('./listItem')
const Recommendation = require('./recommendation')
const Request = require('./request')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Recommendation.belongsTo(ListItem, {as: 'item'})
Recommendation.belongsTo(User, {as: 'from'})
Recommendation.belongsTo(User, {as: 'to'})
Request.belongsTo(ListItem, {as: 'item'})
Request.belongsTo(User, {as: 'from'})
Request.belongsTo(User, {as: 'to'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  ListItem,
  Recommendation,
  Request
}
