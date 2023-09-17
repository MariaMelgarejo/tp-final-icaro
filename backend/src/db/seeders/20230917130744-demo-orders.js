'use strict';
const { fakerES: faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
         */
    const orders = [...Array(10)].map((product) => (
      {
        userId: faker.number.int({ min: 2, max: 3 }),
        products: JSON.stringify([
          {
            productId: faker.number.int({ min: 1, max: 50 }),
            quantity: faker.number.int({ min: 1, max: 3 }),
          }
        ]),
        total: faker.commerce.price({ min: 5000, max: 40000 }),
        createdAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' }),
        updatedAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' })
      }
    ));
    await queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Orders', null, {});

  }
};
