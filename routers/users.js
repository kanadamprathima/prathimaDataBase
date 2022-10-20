const { Router } = require("express"); // router is just normal export of express. {}=>default package
const router = new Router();
const bcrypt = require("bcrypt");
const User = require("../models").user;
const { toJWT } = require("../auth/jwt");
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, "here");
    if (!email || email === " " || !name || !password) {
      res.status(400).send("Must provide an email address");
    } else {
      const encrypted = bcrypt.hashSync(password, 10);
      const newUser = await User.create({ name, email, password: encrypted });
      res.send(newUser);
    }
  } catch (e) {
    next(e.message);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    //getting email,pwd from  body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send("missing credentials");
    }
    //2.find the user with this same email.
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send({ message: "wrong credentials" });
    }
    const samePwds = bcrypt.compareSync(password, user.password);
    if (samePwds) {
      const token = toJWT({ userId: user.id });
      console.log("logged in !");
      res.send({ message: "Welcome! u r logged in", token });
    } else {
      return res
        .status(400)
        .send({ msg: "Password incorrect,wrong credentials" });
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
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
router.patch("/:id", async (req, res, next) => {
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
router.patch("/:id", async (request, response, next) => {
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

module.exports = router;
