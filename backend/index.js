const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./route');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const session = require('express-session');

app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'abcxyz',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    maxAge: 30 * 24 * 60 * 60 * 1000
  } 
}));

routes(app);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});