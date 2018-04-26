const Sequelize = require('sequelize')
const db = require('../db')

const ListItem = db.define('listItem', {
  category: {
    type: Sequelize.ENUM,
    values: ['books', 'movies', 'tv shows'],
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  recommendedBy: {
    type: Sequelize.STRING
  }
})

module.exports = ListItem;
