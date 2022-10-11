const router = require("express").Router();
const { randomBytes, scrypt: _scrypt } = require("crypto");
const { promisify } = require("util");
const { prisma } = require("../../prisma/client.js");
const scrypt = promisify(_scrypt);
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail/index.js");

router.post("/", async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).send("user with given email not found");

  const createdToken = crypto.randomBytes(32).toString("hex");
  await prisma.token.create({
    data: {
      emailToken: createdToken,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  const link = `${process.env.BASE_URL}/passwordReset/${user.id}/${createdToken}`;
  const anchorLink = `<a href=${link}>${link}</a>`;

  sendEmail(anchorLink);
});

router.post("/:id/:token", async (req, res) => {
  const { password } = req.body;
  const id = parseInt(req.params.id);
  const urlToken = req.params.token;

  const salt = randomBytes(8).toString("hex");
  const hashedPassword = await scrypt(password, salt, 32);
  const hashedAndSaltedPassword = salt + "." + hashedPassword.toString("hex");
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedAndSaltedPassword,
      },
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
  try {
    await prisma.token.delete({
      where: {
        emailToken: urlToken,
      },
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});
module.exports = router;
