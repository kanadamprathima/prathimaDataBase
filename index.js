const express = require("express");
const userRouter = require("./routers/users");
const User = require("./models").user;
const TodoList = require("./models").todoList;
const app = express();
const PORT = 4000;

app.use(express.json());

// app.post("/echo", (req, res) => {
//   res.json(req.body);
// });
app.use("/users", userRouter); //router exists only when v use this router
app.get("/lists", async (req, res, next) => {
  const todoLists = await TodoList.findAll();
  res.json(todoLists);
});
app.post("/lists", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newList = await TodoList.create({ name });
    res.send(newList);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
app.get("/lists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneList = await TodoList.findByPk(id, { raw: true });
    res.send(oneList);
  } catch (e) {
    next(e);
  }
});
//*************  GETTING  ONE USERS FULL DATA ***************** */
app.get("/users/:id/lists", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reqUser = await User.findByPk(id, {
      raw: true,
      include: [TodoList],
    });
    if (reqUser) {
      res.send(reqUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e.message);
  }
});
//***** create new todolist for an user */
app.post("/users/:id/lists", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user1 = await User.findByPk(id);
    if (!user1) {
      res.status(404).send("user not found");
    } else {
      const newLists = await TodoList.create({ userId: id, name: name });
      res.send(newLists);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
//******DELETE todolist */
app.delete("list/:listId", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const reqList = await TodoList.findByPk(listId);
    console.log(reqList);
    if (!reqList) {
      res.send("list not found");
    } else {
      const delList = await reqList.destroy();
      console.log("list terminatted", delList);
      res.send(delList);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// http DELETE :4000/users/1/lists/13
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      console.log("terminatted");
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`listening in port:${PORT}`));
