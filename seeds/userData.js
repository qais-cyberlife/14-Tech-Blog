// import User model
const  User  = require('../models/user');

const userData = [
    {
       username: "bobby",
       email: "bobby@mail.com",
       password: "pass1",
       team_id:  1,
    },
    {
        username: "annie_",
        email: "annie@mail.com",
        password: "pass2",
        team_id:  8,
    },
    {
        username: "mikey2",
        email: "mike@mail.com",
        password: "pass3",
        team_id:  21,
    },
    {
        username: "sue",
        email: "sue@mail.com",
        password: "pass4",
        team_id:  11,
    },
    {
        username: "ted",
        email: "ted@mail.com",
        password: "pass5",
        team_id:  6,
    },
    {
        username: "ashley",
        email: "ashley@mail.com",
        password: "pass6",
        team_id:  4,
    }
]

// setting variable to export data
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;