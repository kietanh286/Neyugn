'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      id: 1,
      description: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'user',
      id: 2,
      description: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'accountant',
      id: 3,
      description: 'accountant',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'supplier',
      id: 4,
      description: 'supplier manager Dashboard',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
