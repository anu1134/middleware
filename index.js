const express = require("express");

const app = express();

app.listen("3000", () => {
  console.log("server is running on port 3000");
});

// application level middleware
// route level middleware
// error handling middleware
// built in middlewares

const users = [
  {
    firstName: "Anshika",
    lastName: "Agarwal",
  },
  {
    firstName: "Anshi",
    lastName: "Agarwal",
  },
];

// Built in middleware
app.use(express.json());

app.use(loggingUserRequests);

// controller actions

app.get("/", (req, res) => {
  console.log("render home page");
  res.send("Home Page");
});

app.get("/users", authUser, (req, res) => {
  console.log("users page");
  res.json(users);
});

function loggingUserRequests(req, res, next) {
  console.log("user has initiated request");
  next();
}

// list of users should be visible to authenticated users

function authUser(req, res, next) {
  console.log("authentication check for users");

  const authUser = false;

  if (authUser) {
    console.log("user is authenticated");
    res.status(200);
    next();
  } else {
    console.log("not authenticated");
    res.status(401);
    throw new Error("user is not authenticated");
  }

  next();
}

function errorHandler(err, req, res, next) {
  console.log("res", res);
  const resStatus = res.statusCode ? res.statusCode : 500;

  console.log("res status", resStatus);

  switch (resStatus) {
    case 401:
      res.send({
        title: "not authorized",
        message: err.message,
      });
      break;
    case 500:
      res.send({
        title: "server error",
        message: err.message,
      });
      break;

    default:
      break;
  }

  next();
}

app.use(errorHandler);
