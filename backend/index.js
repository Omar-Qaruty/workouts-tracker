const express = require('express')
const cookieSession = require('cookie-session');
require('dotenv').config()

const morgan = require('morgan')


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

const users = [
  { id: 1, name: 'John Doe', email: 'john@gmail.com', password: '123456'},
  { id: 2, name: 'Jane Doe', email: 'jane@gmial.com', password: '123456'}
]


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

app.get('/logout', (req, res) => {
  req.session = null;
  res.send({});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
