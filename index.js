const express = require("express");

const User = require("./models").user;
const TodoList = require("./models").todoList;
const app = express();
const PORT = 4000;

app.use(express.json());

// app.post("/echo", (req, res) => {
//   res.json(req.body);
// });

// app.get("/users", async (req, res) => {
//   const users = await User.findAll();
//   // res.send(users);
// });

app.post("/users", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    console.log(name, email, "here");
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.send(user);
    }
  } catch (e) {
    next(e.message);
  }
});
app.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const oneUser = await User.findByPk(id, { raw: true });
    // console.log(oneUser);
    if (!oneUser) {
      res.status(404).send("User not found");
    } else {
      res.send(oneUser);
    }
  } catch (e) {
    console.log(e.message);
    next();
  }
});
app.patch("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const { name } = req.body;
    const usertoUpdate = await User.findByPk(id, { raw: true });
    console.log(usertoUpdate);
    if (!usertoUpdate) {
      res.status(404).send("user not found");
    } else {
      const updatedUser = await usertoUpdate.update({ name });
      res.send(updatedUser);
    }
  } catch (e) {
    console.log(e.message);
    // next(e);
  }
});
// http PATCH :4000/users/9 name=Banana
app.patch("/users/:id", async (request, response, next) => {
  //1. get id from params
  const { id } = request.params;
  const { name } = request.body;
  //2. find patient to update
  const patient = await User.findByPk(id);

  if (!patient) {
    response.status(404).send("No patient with that id");
  } else {
    const updatedPatient = await patient.update({ name });
    response.send(updatedPatient);
  }
});

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
