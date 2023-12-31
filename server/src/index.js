const express = require('express');
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const swaggerSpec = require('./swagger');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
});

expressJSDocSwagger(app)(swaggerSpec)

const routes = require('./routes');

routes(app);

app.listen(port);

console.log(`Todo app REST API server started on: ${port}`);
