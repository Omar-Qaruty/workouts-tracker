const router = require("express").Router();

const authGuard = (req, res, next) => {
  if (!req.session.userId) return res.status(401).send("You must be logged in");
  const ward = () => {
    router.get("/workouts", async (req, res) => {
      workouts = await prisma.workout.findMany({
        where: {
          user: {
            email: "ward.dev@gmail.com",
          },
        },
      });
      console.log(workouts);
      res.send(`Your workouts : ${workouts}`);
    });
  };
  ward();
  next();
};

module.exports = authGuard;
