const DreamTeam = require('../models/dreamteam.js');


const dreamteamData = [
    {
        Gk: "req.body.Gk",
        Lb: "req.body.Lb",
        Cb1: "req.body.Cb1",
        Cb2: "req.body.Cb2",
        Rb: "req.body.Rb",
        Lw: "req.body.Lw",
        Cm1: "req.body.Cm1",
        Cm2: "req.body.Cm2",
        Rw: "req.body.Rw",
        St1: "req.body.St1",
        St2: "req.body.St2",
        user_id: 1,
    },   
]


// setting variable to export data
const seedDreamTeams = () => DreamTeam.bulkCreate(dreamteamData);

module.exports = seedDreamTeams;