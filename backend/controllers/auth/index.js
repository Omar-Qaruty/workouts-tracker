const router = require('express').Router();
const {randomBytes, scrypt: _scrypt} = require('crypto');
const { promisify } = require('util');
const { prisma } = require('../../prisma/client.js');
 
const scrypt = promisify(_scrypt);



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userExist) return res.status(400).send('User already exist');

  const salt = randomBytes(8).toString('hex');
  const hashedPassword = (await scrypt(password, salt, 32));
  const hashedAndSaltedPassword = salt + '.' + hashedPassword.toString('hex');

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedAndSaltedPassword
    }
  })

  res.send({
    ...user,
    password: undefined
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  
  if (!user) return res.status(400).send('Invalid email or password');

  const [salt, storedHash] = user.password.split('.');

  const hashedAndSaltedPassword = (await scrypt(password, salt, 32)).toString('hex');

  if (hashedAndSaltedPassword !== storedHash) return res.status(400).send('Invalid email or password');

  req.session.userId = user.id;

  res.send({
    ...user,
    password: undefined
  })

})

router.post('/logout', (req, res) => {
  req.session = null;
  res.send('Logged out');
})

router.get('/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).send('You are not logged in');
  return res.send({
    ...req.user,
    password: undefined
  });
})

module.exports = router;
