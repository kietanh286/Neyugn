'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('techpackcloths', [{
        name: 'cotton',
        code: 'CO',
        description: 'Vải cotton',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jean',
        code: 'JE',
        description: 'vải Jean',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('techpackcloths', null, {});
  }
};
