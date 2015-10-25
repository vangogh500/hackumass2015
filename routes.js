var riotjs = require('./lib/riot.js');
var UserJS = require('./models/user.js');
var nodemailer = require("nodemailer");
var phjs = require('./lib/player_handler.js');

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: { //COLLAPSED FOR SECURITY
        user: "hackunilol",
        pass: "unilol2015"
    }
});

module.exports = function(app) {

	app.use(require('cors')());

    // home page
    app.get('/', function(req, res) {
        res.sendFile('./index.html');
    });
    // 404 page
    app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

    // 500 page
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });


    //====================== EMAIL AUTHENTICATION ======================

    var rand, mailOptions, host, link;

    /*------------------SMTP Over-----------------------------*/

    /*------------------Routing Started ------------------------*/

    app.get('/send', function(req, res) {
        rand = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        link = "http://" + req.get('host') + "/verify?id=" + rand;
        mailOptions = {
            to: req.query.to,
            subject: "Please confirm your Email account",
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });
    });

    app.get('/verify', function(req, res) {
        console.log(req.protocol + ":/" + req.get('host'));
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Domain is matched. Information is from Authentic email");
            if (req.query.id == rand) {
                console.log("email is verified");
                res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
            } else {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        } else {
            res.end("<h1>Request is from unknown source");
        }
    });


    //====================== END OF EMAIL AUTHENTICATION ======================


    //get, deletes, creates a new user, and edits a user



    app.get('/api/user/:username', function(req, res) {
        UserJS.findOne({ loginUser: req.params.username}, function(err, u) {
            if (err) return res.send(500, 'Error occurred: database error');
            res.json(u);
        });
    });
	
	app.post('/api/user/:username/:ign', function(req, res) {
		phjs.formatPlayer(req.params.username, req.params.ign, function(err){
			if (err) res.send('Error');
			else res.send('Success!');
		});
	});

    //PATH MIGHT BE WRONG
    app.put('/api/user/:username/:password', function(req, res) {


    });


};