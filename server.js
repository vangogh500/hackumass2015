var mongoose = require('mongoose');
mongoose.connect('mongodb://unilol:unilol2015@ds045064.mongolab.com:45064/unilol');

var express = require('express');
var app = express();

var User = require('./models/user.js');

var nodemailer = require("nodemailer");

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "hackunilol",
        pass: "unilol2015"
    }
});
	//COLLAPSED FOR SECURITY	
	
//=========================================================================
	
// configure app to use bodyParser()
// this will let us get the data from a POST

// sets port
app.set('port', process.env.PORT || 3000);
// sets directory for views
app.set('views', __dirname + '/views');
// sets view engine
app.set('view engine',"jade");


app.use(express.static(__dirname + '/public'));
// look @ routes.js
require('./routes.js')(app);

//ROUTES

var router = express.Router(); 


//====================== EMAIL AUTHENTICATION ======================
	
var rand,mailOptions,host,link;

/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/send',function(req,res){
        rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
	});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});


//====================== END OF EMAIL AUTHENTICATION ======================


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
app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));