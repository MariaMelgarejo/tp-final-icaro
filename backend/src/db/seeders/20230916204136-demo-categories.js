'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('Categories', [
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
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
