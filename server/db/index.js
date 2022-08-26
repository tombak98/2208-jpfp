// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const Student = require('./student')
const Campus = require('./campus')

Student.belongsTo(Campus)
Campus.hasMany(Student)

const syncAndSeed = async () => {
    try {
    await db.sync({ force: true });

    //use this area to sync your database
    await Campus.create({
      name: "Cornell University",
      address: "10 Ithaca Drive",
      description: "Ezra Cornell's pride and joy"
    })

    await Campus.create({
      name: "Columbia University",
      address: "210 Harlem St",
      description: "Nice University in the middle of NYC"
    })

    await Student.create({
      firstName: "Thomas",
      lastName: "Bak",
      email: "tombak98@gmail.com",
      gpa: 4.0,
      campusId: 1
    })

    await Student.create({
      firstName: "Frank",
      lastName: "Sinatra",
      email: "frank@gmail.com",
      gpa: 3.9,
      campusId: 2
    })

    await Student.create({
      firstName: "George",
      lastName: "Williams",
      email: "george@gmail.com",
      gpa: 3.8,
      campusId: 1
    })

    console.log(`Seeding successful!`);

    } catch(err) {
      console.log("problem seeding")
    }
};



module.exports = {
    // Include your models in this exports object as well!
    db,
    syncAndSeed,
    Student,
    Campus
}