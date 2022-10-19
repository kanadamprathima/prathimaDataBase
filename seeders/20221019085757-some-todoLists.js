"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoLists",
      [
        {
          name: "Work",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: " Do cycling",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cleaning",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todoLists", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
