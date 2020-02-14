const authServices = require('../src/auth/authServices');

const seed = async knex => {
  const mainUsers = [
    {
      username: 'root',
      name: 'root',
      phoneNumber: "12312321",
      age: '00',
      streetAddress: 'kotkantie 1',
      city: 'oulu',
      country: 'Fi',
      email: 'root@lmao.lol',
      password: '111111'
    }
  ];

  const registerTasks = [...Array(200).keys()].map(number => {
    return knex =>
      authServices.registerUser(knex, {
        username: `user${number}`,
        name: `user${number}`,
        phoneNumber: `user${number}`,
        age: `user${number}`,
        streetAddress: `user${number}`,
        city: `user${number}`,
        country: `user${number}`,
        email: `user${number}@lmao.lol`,
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