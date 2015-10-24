var mongoose = require('mongoose');
mongoose.connect('mongodb://unilol:unilol2015@ds045064.mongolab.com:45064/unilol');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var User = require('./models/user.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port


//ROUTES

var router = express.Router(); 

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/rank', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);