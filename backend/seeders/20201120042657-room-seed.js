'use strict';

const jwt = require("jsonwebtoken")
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
    
    // queryInterface.bulkDelete('rooms', null, {});

    const jwtKey = "my_secret_key"
    const token = jwt.sign("blabla", jwtKey, {
      algorithm: "HS256",
      // expiresIn: jwtExpirySeconds,
    })
    // console.log(adminRows)
   return await queryInterface.bulkInsert('rooms', [
     {nom: 'room1', token: token, adminId: 1, createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
     {nom: 'room2', token: token, adminId: 2, createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")},
     {nom: 'room3', token: token, adminId: 2, createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")},
     {nom: 'room4', token: token, adminId: 2, createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")}
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // return queryInterface.bulkDelete('rooms', null, {});
  }
};
