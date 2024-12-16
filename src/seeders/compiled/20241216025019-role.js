"use strict";
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
    return queryInterface.bulkInsert("Roles", [
      {
        roleName: "Admin",
        roleValue: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Manufacturer",
        roleValue: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Farmer",
        roleValue: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: function (queryInterface, Sequelize) {
    /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    return queryInterface.bulkDelete("Role", null, {});
  },
};
