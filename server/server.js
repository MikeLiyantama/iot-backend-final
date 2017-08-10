var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("hbs");

const _ = require('lodash');
const {ObjectID} = require('mongodb');

var app = express();

var {mongoose} = require("./db/mongoose");
var {Weather} = require("./models/weather");
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.send("<h1>Welcome To My Site</h1>");
});


// GET /weathers
app.get("/weathers", (req, res) => {
    Weather.find().then((weathers) => {
        res.render("weathers.hbs", {weathers});
    }, (error) => {
        res.send(error);
    });
});

// POST /weathers
app.post("/weathers", authenticate, (req, res) => {
    var weather = new Weather({
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        information: req.body.information,
        _creator: req.user._id
    });

    weather.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App started");
});