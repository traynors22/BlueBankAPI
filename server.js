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


request.get('https://www.google.com',function(err,res,body){
  if(err) //TODO: handle err
  if(res.statusCode !== 200 ){
  	res.json({ message: 'yay!' });
  } //etc
  //TODO Do something with response
});
	

    res.json({ message: 'hooray! api!' });   
});


router.get('/getTransactions', function(req, res) {

	var user_id = req.param('id');
	console.log(user_id);

    res.json({ message: 'this will be Transactions '+user_id  });   
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