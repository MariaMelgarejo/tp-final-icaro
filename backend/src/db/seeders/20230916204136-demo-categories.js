'use strict';
const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    const categories = [
      {
        title: 'Smart Tvs',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smartwatchs',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Celulares',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tablets',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Notebooks',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Auriculares',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Gaming',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('Categories', categories, {});
    const products = [...Array(50)].map((product) => (
      {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 500, max: 20000 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        rating: faker.number.int({ min: 2, max: 5 }),
        categoryId: faker.number.int({ min: 1, max: 7 }),
        active: faker.datatype.boolean({ probability: 0.75 }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ));

    await queryInterface.bulkInsert('Products', products, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
