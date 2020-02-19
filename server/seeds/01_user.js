const authServices = require('../src/auth/authServices');

const seed = async knex => {
  const mainUsers = [
    {
      username: 'root',
      name: 'root',
      address: 'kotkantie 1',
      city: 'oulu',
      country: 'Fi',
      email: 'root@lmao.lol',
      phoneNumber: '1231231233',
      password: '111111'
    }
  ];

  const registerTasks = [...Array(200).keys()].map(number => {
    return knex =>
      authServices.registerUser(knex, {
        username: `user${number}`,
        name: `user${number}`,
        address: `user${number}`,
        city: `user${number}`,
        country: `user${number}`,
        email: `user${number}@lmao.lol`,
        phoneNumber: `user${number}`,
        password: '111111'
      });
  });

  await knex.transaction(async trx => {
    await Promise.all([
      ...mainUsers.map(user => authServices.registerUser(trx, user)) //,...registerTasks.map(task => task(trx))  script for random users
    ]);
  });
};

module.exports = { seed };
