const express = require('express')
const cookieSession = require('cookie-session');
require('dotenv').config()
const morgan = require('morgan')
const { prisma } = require('./prisma/client.js')
const authController = require('./controllers/auth/')
const authGuard = require('./guards/auth')
const currentUser = require('./middleware')


const app = express()
const port = 8080

app.use(morgan('[:status - :method] :url :response-time'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(currentUser);

const users = [
  { id: 1, name: 'John Doe', email: 'john@gmail.com', password: '123456'},
  { id: 2, name: 'Jane Doe', email: 'jane@gmial.com', password: '123456'}
];

const requeireAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).send('Unauthorized');
}


app.get('/restricted', requeireAuth, (req, res) => {
  res.send('Welcome to the restricted area');
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) return res.status(400).send('Invalid email or password');

  req.session.userId = user.id;

  res.send({
    ...user,
    password: undefined
  })
})

app.post('/logout', (req, res) => {
  req.session = null;
  res.send({});
})

app.get('/', authGuard, async (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', authController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
