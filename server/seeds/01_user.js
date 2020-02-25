const authServices = require('../src/auth/authServices');

const seed = async knex => {
  const mainUsers = [
    {
      username: 'root',
      email: 'root@lmao.lol',
      password: '111111',
      name: 'root boi',
      address: 'roothome',
      city: 'api',
      country: 'interwebz',
      phoneNumber: '1231231233'
    },
    {
      username: 'eetu',
      email: 'eetu@lmao.lol',
      password: '111111',
      name: 'Eetu epe',
      address: 'kotkantie 3',
      city: 'Oulu',
      country: 'Fi',
      phoneNumber: '1231231232'
    },
    {
      username: 'riku',
      email: 'riku@lmao.lol',
      password: '111111',
      name: 'riku rauski',
      address: 'kotkantie 1',
      city: 'Oulu',
      country: 'Fi',
      phoneNumber: '1231231231'
    }
  ];

  // script to add random users

  // const registerTasks = [...Array(200).keys()].map(number => {
  //   return knex =>
  //     authServices.registerUser(knex, {
  //       username: `user${number}`,
  //       email: `user${number}@lmao.lol`,
  //       password: '111111',
  //       name: `user${number}`,
  //       address: `user${number}`,
  //       city: `user${number}`,
  //       country: `user${number}`,
  //       phoneNumber: `user${number}`
  //     });
  // });

  await knex.transaction(async trx => {
    await Promise.all([
      ...mainUsers.map(user => authServices.registerUser(trx, user))
      // ...registerTasks.map(task => task(trx))
    ]);
  });
};

module.exports = { seed };
