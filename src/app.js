const bodyParser = require("body-parser");
const express = require("express");
const expressValidator = require("express-validator");

const userRoutes = require("./routes/userRoutes");
const app = express();

require('./config/db');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(expressValidator({}));

userRoutes(app);

app.use(function (req, res, next) {
    res.status(404).send({"msg" : "rota inválida"})
})

module.exports = app;