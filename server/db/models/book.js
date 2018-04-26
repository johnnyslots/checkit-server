const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  recommendedBy: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = Book;
