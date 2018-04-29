const Sequelize = require('sequelize')
const db = require('../db')

const Recommendation = db.define('recommendation', {
  notes: {
    type: Sequelize.TEXT
  },
  isPending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Recommendation;
