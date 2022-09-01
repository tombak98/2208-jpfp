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
      address: "Ithaca, New York 14850",
      description: "Ezra Cornell's pride and joy",
      imageUrl: "https://www.cornell.edu/about/img/main-Tower1.Still001-720x.jpg"
    })

    await Campus.create({
      name: "Columbia University",
      address: "New York, NY 10027",
      description: "Nice University in the middle of NYC",
      imageUrl: "https://static01.nyt.com/images/2020/03/08/nyregion/08xp-columbia1/08xp-columbia1-superJumbo.jpg"
    })

    await Campus.create({
      name: "Harvard University",
      address: "Cambridge, MA",
      description: "A place where very smart people go",
      imageUrl: "https://www.chooseright.org/wp-content/uploads/2014/04/Harvard-University-500x367.jpg"
    })

    await Campus.create({
      name: "Princeton University",
      address: "Princeton, NJ 08544",
      description: "Peaceful campus in New Jersey",
      imageUrl: "http://www.universityreview.org/wp-content/uploads/2012/03/Princeton-University-.jpg"
    })

    await Student.create({
      firstName: "Steph",
      lastName: "Curry",
      email: "curry123@gmail.com",
      gpa: 4.0,
      campusId: 1,
      imageUrl: "https://cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/SJWSD6FRWMTZCOVPFYOVD7GN7M.jpg"
    })

    await Student.create({
      firstName: "Paul",
      lastName: "George",
      email: "paul@gmail.com",
      gpa: 3.9,
      campusId: 2,
      imageUrl: "https://a.espncdn.com/photo/2019/1210/r639539_1296x729_16-9.jpg"
    })

    await Student.create({
      firstName: "Giannis",
      lastName: "Antetokounmpo",
      email: "giannis5@gmail.com",
      gpa: 3.8,
      campusId: 1,
      imageUrl: "https://e0.365dm.com/22/05/2048x1152/skysports-giannis-antetokounmpo_5773415.jpg"
    })

    await Student.create({
      firstName: "Lebron",
      lastName: "James",
      email: "lebron23@gmail.com",
      gpa: 3.7,
      imageUrl: "https://images.seattletimes.com/wp-content/uploads/2022/08/08192022_LeBron-James_153341.jpg?d=1560x1094"
    })

    await Student.create({
      firstName: "Thomas",
      lastName: "Bak",
      email: "tombak@gmail.com",
      gpa: 2.5
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