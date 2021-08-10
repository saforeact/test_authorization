const { users } = require("../database.json");
const jwt = require("jsonwebtoken");
const JWTconfig = require("./JWTconfig");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../constants");

module.exports = function (app, db) {
  app.post("/signIn", (req, res) => {
    const { login, password } = req.body;
    let user = users.find(
      (user) => user.login === login && bcrypt.compare(password, user.password)
    );
    if (user) {
      const token = jwt.sign({ userId: user.userId }, JWTconfig.secretKey, {
        expiresIn: "10m",
      });
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "This user is not found." });
    }
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

  app.post("/data", (req, res) => {
    const token = req.headers.authorization;

    var decoded = jwt.verify(token, JWTconfig.secretKey);

    if (decoded) {
      const user = users.filter((user) => user.userId === decoded.userId)[0];
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ message: "Token expired" });
    }
  });
};
