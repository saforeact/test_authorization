const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = 8000;
app.use(express.json());
app.use(cors());
require("./routes")(app, {});
app.listen(port, () => {
  console.log("We are live on " + port);
});
