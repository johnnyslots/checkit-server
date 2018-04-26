const Sequelize = require('sequelize')
const db = require('../db')

const Recommendation = db.define('recommendation', {
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = Recommendation;
