const Sequelize = require('sequelize')
const db = require('../db')

const ListItem = db.define('listItem', {
  category: {
    type: Sequelize.ENUM,
    values: ['books', 'movies', 'podcasts', 'tv shows'],
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  findOnGoogle: {
    type: Sequelize.VIRTUAL,
    get () {
      const title = this.getDataValue('title').split(' ').join('+');
      const category = this.getDataValue('category');
      return (
        'https://www.google.com/search?q=' + category + '+' + title
      );
    }
  }
})

module.exports = ListItem;
