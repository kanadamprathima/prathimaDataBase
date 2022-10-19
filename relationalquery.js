const { user, todoList, todoItem } = require("./models");
const getAllListwithUSer = async () => {
  try {
    const listwithUser = await todoList.findAll({
      raw: true,
      include: { model: user, attributes: ["email"] },
    });
    console.log(listwithUser);
  } catch (e) {
    console.log(e.message);
  }
};
// getAllListwithUSer();

//test relation btw todoitems n todolist

const getItemsWithList = async () => {
  const itemsWithLists = await todoItem.findAll({
    raw: true,
    // include: [todoList],
    include: { model: todoList, attributes: ["name"] },
  });
  console.log(itemsWithLists);
};
// getItemsWithList();

// Get one user by id with his lists.
const userWithLists = async (id) => {
  const specificUserWithList = await user.findByPk(id, {
    // raw: true,
    include: [todoList],
  });
  return specificUserWithList.get({ plain: true });
  //   console.log(specificUserWithList);
};
// userWithLists(1).then((user) => console.log("user with all lists:", user));

//////********************************************************************* */
async function getUserWithList(id) {
  const result = await user.findByPk(id, {
    raw: true,
    include: { model: todoList, attributes: ["name"] },
  });
  //   return result.get({ plain: true });
  console.log(result);
}

// getUserWithList(1).then((user) => console.log("user by id with lists", user));
getUserWithList(1);

/********************************************************************** */
//2) Get important TodoItems with the name of the list they belong to.
const getImpItems = async () => {
  const itemsList = await todoItem.findAll({
    where: { important: false },
    raw: true,
    include: [todoList],
  });
  console.log(itemsList);
};
// getImpItems();

// Get one user by id with his lists, which also contain their belonging TodoItem's task attribute.
const fullUserById = async (id) => {
  try {
    const result = await user.findByPk(id, {
      raw: true,
      include: [
        {
          model: todoList,
          include: [
            {
              model: todoItem,
              attributes: ["task"],
            },
          ],
        },
      ],
    });
    console.log(result);
    // return result.get({ plain: true });
  } catch (e) {
    console.log(e.message);
  }
};

// fullUserById(1).then((user) => console.log("user with tasks", user));
// fullUserById(1);
