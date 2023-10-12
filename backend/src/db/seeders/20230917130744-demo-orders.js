'use strict';
const { fakerES: faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    return queryInterface.sequelize.query(
      'SELECT id, title, price, image, rating, discount from Products;',
    ).then((products) => {
      const productsRows = products[0];

      queryInterface.bulkInsert('Orders', [
        {
          userId: 2,
          products: JSON.stringify([
            {
              id: productsRows[0].id,
              title: productsRows[0].title,
              price: productsRows[0].price,
              image: productsRows[0].image,
              rating: productsRows[0].rating,
              discount: productsRows[0].discount,
              quantity: 2,
            },
            {
              id: productsRows[22].id,
              title: productsRows[22].title,
              price: productsRows[22].price,
              image: productsRows[22].image,
              rating: productsRows[22].rating,
              discount: productsRows[22].discount,
              quantity: 3,
            },
          ]),
          total: faker.commerce.price({ min: 5000, max: 40000 }),
          createdAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' }),
          updatedAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' })
        },
        {
          userId: 3,
          products: JSON.stringify([
            {
              id: productsRows[10].id,
              title: productsRows[10].title,
              price: productsRows[10].price,
              image: productsRows[10].image,
              rating: productsRows[10].rating,
              discount: productsRows[10].discount,
              quantity: 1,
            },
            {
              id: productsRows[31].id,
              title: productsRows[31].title,
              price: productsRows[31].price,
              image: productsRows[31].image,
              rating: productsRows[31].rating,
              discount: productsRows[31].discount,
              quantity: 1,
            },
          ]),
          total: faker.commerce.price({ min: 5000, max: 40000 }),
          createdAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' }),
          updatedAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2023-09-17T00:00:00.000Z' })
        },
      ],
        {});

      const addresses = [
        {
          "orderId": 1,
          "street": "Las Delicias",
          "number": 1100,
          "city": "San Miguel",
          "country": "Argentina",
          "province": "Buenos Aires",
          "zipcode": 1663,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "orderId": 2,
          "street": "Mitre",
          "number": 1380,
          "city": "San Miguel",
          "province": "Buenos Aires",
          "country": "Argentina",
          "zipcode": 1663,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
      ]

      return queryInterface.bulkInsert('Shippings', addresses, {});
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Orders', null, {});

  }
};
