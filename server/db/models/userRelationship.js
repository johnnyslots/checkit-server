const Sequelize = require('sequelize')
const db = require('../db')

const UserRelationship = db.define('userRelationship', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'rejected', 'accepted'],
    defaultValue: 'pending'
  }
})

module.exports = UserRelationship
