'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('Users', [
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
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
