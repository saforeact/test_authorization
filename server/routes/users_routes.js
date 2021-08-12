const { users } = require("../database.json");
const jwt = require("jsonwebtoken");
const JWTconfig = require("./JWTconfig");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../constants");

module.exports = function (app, db) {
  const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    var decoded = jwt.verify(token, JWTconfig.secretKey);
    if (decoded) {
      const user = users.find((user) => user.userId === decoded.userId);
      if (user) {
        const { password, userId, ...partUser } = user;
        req.body.user = partUser;
        req.body.userId = userId;
        return next();
      }
    } else {
      return res.status(401).json({ message: "Token expired" });
    }
  };
  app.get("/getUsers", (req, res) => {
    res.send(users);
  });
  app.post("/signIn", async (req, res) => {
    const { login, password } = req.body;

    const user = users.find((user) => user.login === login);

    if (!user) {
      return res.status(400).json({ message: "This user is not found." });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "wrong password or name" });
    }

    const token = jwt.sign({ userId: user.userId }, JWTconfig.secretKey, {
      expiresIn: "10m",
    });
    return res.status(200).json({ token });
  });

  app.post("/signUp", async (req, res) => {
    const { login, password } = req.body;

    const candidate = users.find((user) => user.login === login);
    if (!candidate) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const user = {
        userId: Math.round(Math.random() * 100000),
        login,
        password: hashPassword,
        isActive: false,
      };
      users.push(user);
      const token = jwt.sign({ userId: user.userId }, JWTconfig.secretKey, {
        expiresIn: "10m",
      });
      return res
        .status(200)
        .json({ message: "The user has successfully registered", token });
    } else {
      return res
        .status(401)
        .json({ message: "The user is already registered" });
    }
  });

  app.post("/editProfile", checkToken, (req, res) => {
    const { form, userId } = req.body;
    const userIndex = users.findIndex((oldUser) => oldUser.userId === userId);
    users[userIndex] = { ...users[userIndex], ...form, isActive: true };
    const newUser = {
      ...users[userIndex],
      ...form,
    };
    return res.status(200).json({ user: newUser });
  });

  app.post("/data", checkToken, (req, res) => {
    const { user } = req.body;
    return res.status(200).json({ user });
  });
};
