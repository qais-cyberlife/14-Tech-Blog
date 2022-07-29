const sequelize = require('../config/connection');
const seedComment = require('./commentData');
const seedTeams = require('./teamsData');
const seedUser = require('./userData');
const seedDreamTeams = require('./dreamteamData')



const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTeams();

  await seedUser();

  await seedComment();

  await seedDreamTeams();

  process.exit(0);
};

seedAll();
