// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var request =require('request');
var bodyParser = require('body-parser');
var devKey="46c1991eef174e06b4adc698802862b0";
var bearer="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTg5MGEwNTc5Y2FlY2I4NzEyOTljNGQzIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjQ2YzE5OTFlZWYxNzRlMDZiNGFkYzY5ODgwMjg2MmIwIiwiaWF0IjoxNDg2MDQ4ODExfQ.4fDc34_cHvkZ7LbzO0FhgDi7JDjXKNt-ZN_FIkp22YU";
var currentAccountId= '5890a0589caecb871299c4d4';
var getSavingAccountId= '5890a0589caecb871299c4d5';
var accountId = '';
var accountType = '';
var request = require('request');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/getBalance', function(req, res) {

var account = req.param('account');

if(account=="savings"){
accountId = getSavingAccountId;
accountType = "Savings Account";
console.log("Savings account picked");
}else if(account=="current"){
accountId = currentAccountId;
accountType = "Current Account";
console.log("Current account picked");
}else{
console.log("Default account picked");
accountId = currentAccountId;
accountType = "Current Account";
}

var options={
	url: 'https://bluebank.azure-api.net/api/v0.6.3/accounts/'+accountId,
	headers: {'Ocp-Apim-Subscription-Key': devKey,
				"bearer": bearer}
}

request(options, function (error, response, body) {
	console.log("Response Code: "+ response.statusCode);
  if (!error && response.statusCode == 200) {
    //console.log("call successfull"+body+"response: "+ response); // Print the google web page.
   
    var obj = JSON.parse(body);
    console.log(obj.accountBalance);
    res.json({ balance: obj.accountBalance,
     			accountType: accountType}); 
  }else{
  	console.log("error: "+error);
  	res.json({ message: "API is currently down, please contact you admin" }); 
  }
});
	

    //res.json({ message: 'hooray! api!' });   
});


router.get('/getTransactions', function(req, res) {

	var user_id = req.param('id');
	console.log(user_id);

    res.json({ message: 'this will be Transactions '+user_id  });   
});

router.get('/getCurrentAccount', function(req, res) {

	var user_id = req.param('id');
	//console.log(user_id);

    res.json({ cBalance: '£120'  });   
});

router.get('/getUserHolidayData', function(req, res) {

	var Destination = req.param('Destination');
	//console.log(user_id);

    res.json({ Destination: Destination  ,
    	cost: '£2500',
    	sDate: '07/03/17',
    	eDate: '14/03/17'
						});   
});

router.get('/getHolidayDest', function(req, res) {

	var date = req.param('date');
	//console.log(user_id);

    res.json({ HolidayDest: 'Dominican Republic, Grenada, Jamaica, St Barts & St Lucia'  });   
});

router.get('/getSavingAccount', function(req, res) {

	var user_id = req.param('id');
	//console.log(user_id);

    res.json({ sBalance: '£920'  });   
});

app.post('/transferfunds', function(req, res) {
    var toAccountNumber = req.body.toAccountNumber;
    var toSortCode= req.body.toSortCode;
    var paymentReference= req.body.paymentReference;
    var paymentAmount= req.body.paymentAmount;



    res.send(toAccountNumber + ' ' + paymentAmount + ' ' + paymentReference);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on ' + port);