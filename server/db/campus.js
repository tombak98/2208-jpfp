const Sequelize = require('sequelize')
const db = require('./database')

const Campus = db.define('campuses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "default_campus.jpeg"
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "Nice Campus"
    }
})

module.exports = Campus