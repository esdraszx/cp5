const express = require('express');
const bodyParser = require("body-parser");
const path = require('path')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp5', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const clock = require("./clock.js");
app.use("/api/clock", clock.routes);

const buildPath = path.resolve(__dirname, '../dist')
app.use(express.static(buildPath))

 // HTML5 History Mode routing
 const indexPath = path.resolve(buildPath, 'index.html')
 app.use((req, res, next) => {
   if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
     res.sendFile(indexPath)
   } else {
     next()
   }
 })

app.listen(3002, () => console.log('Server listening on port 3002!'));