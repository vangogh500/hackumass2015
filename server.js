var mongoose = require('mongoose');

mongoose.connect('mongodb://<unilol>:<unilol2015>@ds045064.mongolab.com:45064/unilol');

var User = require('./models/user.js');