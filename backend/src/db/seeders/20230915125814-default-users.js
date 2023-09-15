'use strict';

function getId(firstId, items, needly) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].firstname === needly) {
      return firstId + i;
    }
  }

  return null;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    const users = [
      {
        "firstname": "Mariano",
        "lastname": "Paduani",
        "email": "mp@gmail.com",
        "password": "123456789",
        "role": "admin",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstname": "Juan",
        "lastname": "Perez",
        "email": "jp@gmail.com",
        "password": "123456789",
        "role": "user",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstname": "Maria",
        "lastname": "Juarez",
        "email": "mj@gmail.com",
        "password": "123456789",
        "role": "user",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
    ]

    const usersId = await queryInterface.bulkInsert('Users', users, {});
    const user1Id = getId(usersId, users, 'Mariano');
    const user2Id = getId(usersId, users, 'Juan');
    const user3Id = getId(usersId, users, 'Maria');

    const addresses = [
      {
        "userId": user1Id,
        "street": "Las Delicias",
        "number": 1100,
        "city": "San Miguel",
        "zipcode": 1663,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "userId": user2Id,
        "street": "Mitre",
        "number": 1380,
        "city": "San Miguel",
        "province": "Buenos Aires",
        "zipcode": 1663,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "userId": user3Id,
        "street": "Azcuenaga",
        "number": 321,
        "city": "San Miguel",
        "province": "Buenos Aires",
        "zipcode": 1663,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
    ]

    return queryInterface.bulkInsert('Addresses', addresses, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
