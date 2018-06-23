const User = require('./user')
const ListItem = require('./listItem')
const Recommendation = require('./recommendation')
const Request = require('./request')
const UserRelationship = require('./userRelationship')

Recommendation.belongsTo(ListItem, {as: 'item'})
Recommendation.belongsTo(User, {as: 'from'})
Recommendation.belongsTo(User, {as: 'to'})
Request.belongsTo(ListItem, {as: 'item'})
Request.belongsTo(User, {as: 'from'})
Request.belongsTo(User, {as: 'to'})
User.belongsToMany(User, {through: UserRelationship, as: 'friend' })
User.hasMany(UserRelationship, {as: 'relationship'})
UserRelationship.belongsTo(User, {as: 'friend'})
UserRelationship.belongsTo(User, {as: 'user'})

module.exports = {
  User,
  ListItem,
  Recommendation,
  Request,
  UserRelationship
}
