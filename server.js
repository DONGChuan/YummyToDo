// server.js

// Import Modules =========================================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');        // mongoose for mongodb
var morgan         = require('morgan');          // log requests to the console (express4)
var bodyParser     = require('body-parser');     // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// Set DataBase ===========================================================================
mongoose.connect('mongodb://localhost:27017/yummyToDo');
var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Fail to connect db'));

// Set middlewares =======================================================================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes =================================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) =================================================
var port = process.env.PORT || 8888; // set the port

app.listen(port, function () {
    console.log("App listening on port : " + port);
});