const User = require("./models").user;
const TodoItem = require("./models").todoItem;
const createTodoItems = async () => {
  try {
    const todo1 = await TodoItem.create({
      task: "Clean bedroom",
      important: false,
    });
    const todo2 = await TodoItem.create({
      task: "Learn to code",
      important: true,
    });
    const todo3 = await TodoItem.create({
      task: "Have fun",
      important: true,
    });
    const todo4 = await TodoItem.create({
      task: "Add an item ",
      deadline: "today",
    });
    // console.log([todo1, todo2, todo3, todo4].map((i) => i.toJSON()));
    // return [todo1, todo2, todo3, todo4].map((item) => item.toJSON());
  } catch (e) {
    console.log(e);
  }
};
// createTodoItems();
const getAllItems = async () => {
  const allItems = await TodoItem.findAll({ raw: true });
  console.log(allItems);
};
getAllItems();

const getOneUser = async () => {
  const specificUser = await User.findOne({
    where: { name: "Leo Messi" },
    raw: true,
  });
  console.log(specificUser);
};
// getOneUser();

async function getAllUsers() {
  try {
    // This is how we can use a query method to get all the users from the database
    // Selects all rows. Resolves with a (possibly empty) array
    const allUsers = await User.findAll({ raw: true });
    console.log(allUsers);
  } catch (e) {
    console.log(e);
  }
}

// getAllUsers();
const oneUser = async (id) => {
  //   const specificUser = await User.findByPk(id, { raw: true });
  const specificUser = await User.findAll(id);
  console.log(specificUser);
};
// oneUser(20);
//CREATE USER
const createUser = async (name, email, password) => {
  try {
    const newUser = await User.create({ name, email, password, raw: true });
    console.log(newUser);
  } catch (e) {
    console.log(e.message);
  }
};
createUser("alex", "a@gma.com", "123alkd");
//DELETE USER
const delUser = async (id) => {
  const usertoDel = await User.findByPk(id);
  console.log("found the user", usertoDel);
  await usertoDel.destroy();
  console.log("user terminatted");
};
// delUser(19);
