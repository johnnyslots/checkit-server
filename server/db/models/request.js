const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT
  },
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Request;
