const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const User = require('./server/models/user');
const Week = require('./server/models/week');

const port = process.env.PORT || 5000;

const mongoDB = 'mongodb://samcochrane:password1@ds111370.mlab.com:11370/doingdavesjob'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// app.use(express.static(path.join(__dirname, "build")));

app.get("/api/weeks", function(req, res) {
    Week.find({})
        .exec((err, results) => {
            if (err) {
                res.send(err)
            } 
            else {
                res.send(results);
            }
        })
});

app.post('/api/newUser', function(req, res) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }

        User.create(userData, function (err, user) {
            if (err) {
                return err
            } else {
                return res.redirect('/profile')
            }
        })

    }

    res.send(req.body)
})

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
