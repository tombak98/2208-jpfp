const Sequelize = require('sequelize')
const db = require('./database')

const Student = db.define('students', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "/prof_pic.webp"
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

module.exports = Student