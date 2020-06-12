const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Import Routes
const UserRoutes = require("./routes/api/users");

//Define Routes
app.use("/users", UserRoutes);

//Handle Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Database connection key
const db = require("./config/keys").mongoURI;

//Connection to mongo db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connected...."))
  .catch((err) => {
    console.log(`Could not connect to the database ${err}`);
    process.exit();
  });

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
