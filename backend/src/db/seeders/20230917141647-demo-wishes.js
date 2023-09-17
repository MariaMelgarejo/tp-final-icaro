'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const wishes = [...Array(6)].map((product) => (
      {
        userId: faker.number.int({ min: 2, max: 3 }),
        productId: faker.number.int({ min: 1, max: 50 }),
        createdAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' }),
        updatedAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' })
      }
    ));
    await queryInterface.bulkInsert('Wishes', wishes, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.bulkDelete('Wishes', null, {});

  }
};
