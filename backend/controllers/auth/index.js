const router = require("express").Router();
const { randomBytes, scrypt: _scrypt } = require("crypto");
const { promisify } = require("util");
const { prisma } = require("../../prisma/client.js");
const scrypt = promisify(_scrypt);
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) return res.status(400).send("User already exist");

  const salt = randomBytes(8).toString("hex");
  const hashedPassword = await scrypt(password, salt, 32);
  const hashedAndSaltedPassword = salt + "." + hashedPassword.toString("hex");

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedAndSaltedPassword,
    },
  });

  res.send({
    ...user,
    password: undefined,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password are required");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).send("Invalid email or password");

  const [salt, storedHash] = user.password.split(".");

  const hashedAndSaltedPassword = (await scrypt(password, salt, 32)).toString(
    "hex"
  );

  if (hashedAndSaltedPassword !== storedHash)
    return res.status(400).send("Invalid email or password");

  req.session.userId = user.id;
  console.log(req.session.userId);

  res.send({
    ...user,
    password: undefined,
  });
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.send("Logged out");
});

router.post("/requistRestPassword", async (req, res) => {
  const { email } = req.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    let emailToken = randomBytes(8).toString("hex");
    let username = "ward";
    let password = "1234567";

    const createdToken = await prisma.token.create({
      data: {
        emailToken,
        user: {
          connectOrCreate: {
            create: {
              email,
              username,
              password,
            },
            where: {
              email,
            },
          },
        },
      },
    });

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDINGEMAIL,
          pass: "dgueizsfzqnvgifg",
        },
      });

      const mailOptions = {
        from: process.env.SENDINGEMAIL,
        to: "roze.hope@yahoo.com",
        subject: "trying to reset password",
        html: `<h1> please verfiy with this key : ${emailToken}</h1>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error: ", error);
        } else {
          console.log("email sent successfully" + info.response);
          res.status(201).json({ status: 201, info });
        }
      });
    } catch (error) {
      res.status(201).json({ status: 401, error });
    }
  }
});

router.post("/resetPassword", async (req, res) => {
  const { token } = req.body;
  const resetToken = await prisma.user.findUnique({
    where: {
      Token: {
        emailToken: token,
      },
    },
  });
  if (resetToken === token) {
    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await prisma.user.update({
      data: {
        password: hash,
      },
      where: {
        id,
        email,
      },
    });
    res.send(`your knew password is : ${hash}`);
  }
});
router.get("/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).send("You are not logged in");
  return res.send({
    ...req.user,
    password: undefined,
  });
});

module.exports = router;
