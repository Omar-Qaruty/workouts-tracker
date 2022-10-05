const router = require("express").Router();
const { prisma } = require("../../prisma/client.js");

router.get("/", async (req, res) => {
  workouts = await prisma.workout.findMany({
    where: {
      user: req.user,
    },
  });

  res.json(workouts);
});

router.get("/lastSevenDaysWorkouts", async (req, res) => {
  let lastSevenDays = Date.now() - 168 * 60 * 60 * 1000;
  lastSevenDays = new Date(lastSevenDays).toISOString();

  const lastSevenDaysWorkouts = await prisma.workout.findMany({
    where: {
      userId: req.user.id,
      createdAt: {
        gte: lastSevenDays,
      },
    },
  });

  res.json(lastSevenDaysWorkouts);
});

router.post("/", async (req, res) => {
  const { name, type, description, duration, date } = req.body;

  await prisma.workout.create({
    data: {
      name,
      type,
      description,
      duration,
      date,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });
  res.json(201);
});

router.get("/:id", async (req, res) => {
  let workoutId = parseInt(req.params.id);

  const findWorkout = await prisma.workout.findFirst({
    where: {
      id: workoutId,
      user: req.user,
    },
  });
  if (findWorkout) {
    res.json(findWorkout);
    return;
  }
  res.status(401).json();
});

router.put("/:id", async (req, res) => {
  const { name, type, description, duration, date } = req.body;
  let workoutId = parseInt(req.params.id);

  const findWorkout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
      user: req.user,
    },
  });
  if (findWorkout) {
    await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        name,
        type,
        description,
        duration,
        date,
      },
    });
    res.send("workout is updated");
  } else res.send("workout not found");
});

router.delete("/:id", async (req, res) => {
  let workoutId = parseInt(req.params.id);

  const workoutExists = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });

  if (workoutExists) {
    const deleteWorkout = await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });
    res.send("workout is deleted");
  } else res.send("workout not found");
});

module.exports = router;
