'use strict';

const bcrypt = require('bcrypt')
const moment = require("moment")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    queryInterface.bulkDelete('rooms', null, {});
    queryInterface.bulkDelete('admins', null, {});

    const hashedPassword1 = await bcrypt.hash("toto1", 10)
    const hashedPassword2 = await bcrypt.hash("toto2", 10)

    return await queryInterface.bulkInsert('admins', [
      {id: 1, email: 'admin1@vidme.com', password: hashedPassword1, createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {id: 2, email: 'admin2@vidme.com', password: hashedPassword2,  createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")}
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('rooms', null, {});
    return queryInterface.bulkDelete('admins', null, {});
  }
};
