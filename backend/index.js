const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const morgan = require("morgan");
const authController = require("./controllers/auth/");
const authGuard = require("./guards/auth");
const workoutsController = require("./controllers/workouts");
const passwordResetController = require("./controllers/passwordReset");
const currentUser = require("./middleware");

const app = express();
const port = 8080;

app.use(morgan("[:status - :method] :url :response-time"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(currentUser);

app.use("/auth", authController);

app.use("/passwordReset", passwordResetController);

app.use("/workouts", authGuard, workoutsController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
