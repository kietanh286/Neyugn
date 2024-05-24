'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('techpackcategories', [{
        name: 'TOP',
        code: 'TO',
        description: 'Thân Trên',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BOTTOM',
        code: 'BO',
        description: 'Thân dưới',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('techpackcategories', null, {});
  }
};
