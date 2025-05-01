const express = require("express");
const postsController = require("./controllers/posts");
const usersController = require("./controllers/users");
const last_workoutController = require("./controllers/last_workout");
require("dotenv").config();

const PORT = process.env.PORT ?? 8000;

const app = express();

// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.json());

//Controllers
app
  .use("/api/v1/posts", postsController)
  .use("/api/v1/users", usersController)
  .use("/api/v1/last_workout", last_workoutController)

  .use("/", express.static("dist"));

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;

  const error = {
    status,
    message: err.message || "Internal Server Error",
  };
  res.status(status).send(error);
});

// Listen on port 8000, IP defaults to
//

app.listen(PORT, () => {
  console.log(`
      Server running at http://localhost:${PORT}/
    `);
});
