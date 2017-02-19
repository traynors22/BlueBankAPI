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
var url = 'https://bluebank.azure-api.net/api/v0.6.3';
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
	url: url +'/accounts/'+accountId,
	headers: {'Ocp-Apim-Subscription-Key': devKey,
				"bearer": bearer}
}

request(options, function (error, response, body) {
	console.log("-----------------------------------");
	console.log("  ");
	console.log("...Calling GET https://bluebank.azure-api.net/api/v0.6.3/accounts/<accountID> ");
	console.log("  ");
	console.log("Response Code: "+ response.statusCode);
  if (!error && response.statusCode == 200) {
    //console.log("call successfull"+body+"response: "+ response); // Print the google web page.
   
    var obj = JSON.parse(body);
    console.log(obj);
    //console.log("Balance: " + obj.accountBalance);
    console.log("  ");
    console.log("-----------------------------------");
    res.json({ balance: obj.accountBalance,
     			accountType: accountType}); 
  }else{
  	console.log("error: "+error);
  	console.log("-----------------------------------");
  	res.json({ message: "API is currently down, please contact you admin" }); 
  }
});
 
});

router.get('/getHolidayInfoSS', function(req, res) {

	var user_id = req.param('id');
	console.log("-----------------------------------");
	console.log("  ");
	console.log("...Calling GET http://partners.api.skyscanner.net/apiservices/browsegrid/v1.0/Lasvagas/gbp/march ");
	console.log("  ");
	console.log("Hotel: £800 Flights: £1000  ");
	console.log("-----------------------------------");
    res.json({ Hotel: '£800', Flights: '£1000' });   
});


router.get('/getTransactionData', function(req, res) {
	var options={
	url: 'https://bluebank.azure-api.net/api/v0.6.3/accounts/5890a0589caecb871299c4d4/transactions',
	headers: {'Ocp-Apim-Subscription-Key': devKey,
				"bearer": bearer}
}
	var user_id = req.param('id');
	console.log("-----------------------------------");
	console.log("  ");
	console.log("...Calling GET https://bluebank.azure-api.net/api/v0.6.3/accounts/<AccountId>/transactions");
	console.log("  ");
	console.log("Searching transactions for Las Vagas");
	console.log("-----------------------------------");
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log("call successfull"+body+"response: "+ response); // Print the google web page.
    //console.log(body);
    var info = JSON.parse(JSON.stringify(body));
    console.log(info);
    console.log(" ------------------------------------- ");
    console.log("  ");
    console.log(" Return { location: Las Vagas, cost: £3500, Date: 07/03/15  }");
    console.log("  ");
    console.log(" ------------------------------------- ");
    // console.log("-----------------------------------");
    // res.json({ balance: obj.accountBalance,
    //  			accountType: accountType}); 
      res.json({ ID: '5890a0579caecb871299c', cost: '£3500', Date: '27/03/15' });  
  }else{
  	console.log("error: "+error);
  	res.json({ message: "API is currently down, please contact you admin" }); 
  }
});
	//https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions
   
});

router.get('/transferFundsTo', function(req, res) {

var requestData = {
"toAccountNumber":"50000365",
"toSortCode":"839999",
"paymentReference":"Flights to Las Vagas",
"paymentAmount":"1"
}


var options={
	url: 'https://bluebank.azure-api.net/api/v0.6.3/accounts/'+getSavingAccountId+"/payments",
	method: "POST",
 json: true,
 body: requestData,
 port: '8080',
	headers: {"content-type": "application/json",
				'Ocp-Apim-Subscription-Key': devKey,
				"bearer": bearer}


}

function callback(error, response, body) {
		console.log("-----------------------------------");
		console.log("  ");
	console.log("...Calling POST https://bluebank.azure-api.net/api/v0.6.3/accounts/<accountID>/payments ");
	console.log("  ");
	console.log("Response Code: "+ response.statusCode);
    if (!error) {
        var info = JSON.parse(JSON.stringify(body));
        console.log("Payment made, information below: ");
        console.log(info);
		console.log("  ");
		console.log("-----------------------------------");
        res.json(info); 


    }
    else {
        console.log('Error happened: '+ error);
        res.json({ message: "API is currently down, please contact you admin" }); 
    }
}

//send request
request(options, callback);



});

app.post('/transferfunds', function(req, res) {
    var toAccountNumber = req.body.toAccountNumber;
    var toSortCode= req.body.toSortCode;
    var paymentReference= req.body.paymentReference;
    var paymentAmount= req.body.paymentAmount;
    console.log(toSortCode);


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