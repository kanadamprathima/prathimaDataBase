"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "db assessment",
          deadline: "today",
          important: true,
          todoListId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "redux assessment",
          deadline: "tomorrow",
          important: false,
          todoListId: 2,
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
    await queryInterface.bulkDelete("todoItems", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
