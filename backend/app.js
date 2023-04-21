// import dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// import routers
const categoriesRouter = require("./routers/categories");
const speciesRouter = require("./routers/species");
const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");

// import helpers
const errorHandler = require("./helpers/error-handler");

// load the .env configuration file and define variables
require("dotenv/config");
const api = process.env.API_URL;
const port = process.env.PORT;
const connection = process.env.CONNECTION_STRING;

// middlewares
// CORS middleware configuration to allow cross-origin resource sharing and allow pre-flight request for all routes
app.use(cors());
app.options("*", cors());

// bodyParser middleware used to parse incoming request bodies in JSON format
// morgan middleware used to log incoming requests
app.use(bodyParser.json());
app.use(morgan("tiny"));

// authJwt middleware used to authenticate the user as an administrator and allow the user to use functions limited to administrators
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// middleware that handles errors thrown by middlewares and routes
app.use(errorHandler);

// routes
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/species`, speciesRouter);
app.use(`${api}/species`, postsRouter);
app.use(`${api}/users`, usersRouter);

// connecting to the MongoDB database
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "dataplants-db",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// starting the server and listen on port 3000

// development
app.listen(port, () => {
  console.log("server is running at http://localhost:" + `${port}`);
});

// production
/* var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;

  console.log("Express is working on port " + port);
}); */
