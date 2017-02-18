    
  var devKey="46c1991eef174e06b4adc698802862b0";
 
                                //Enter your bearer from cloudlevel.io/token below - see Getting Started Guide on dev portal
 var bearer="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTg5MGEwNTc5Y2FlY2I4NzEyOTljNGQzIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjQ2YzE5OTFlZWYxNzRlMDZiNGFkYzY5ODgwMjg2MmIwIiwiaWF0IjoxNDg2MDQ4ODExfQ.4fDc34_cHvkZ7LbzO0FhgDi7JDjXKNt-ZN_FIkp22YU";
               
transaction();

    function transaction() {
               
                var toAccountNumber = "50000366";
                var toSortCode = "839999";
                var paymentReference =  "savings";
                var paymentAmount = "3";
                var accountId ="5890a0589caecb871299c4d4";

                // var paymentDetails = {
                //                       "toAccountNumber":"50000366",
                //                        "toSortCode":"839999",
                //                        "paymentReference":"savings",
                //                         "paymentAmount":"2"
                //                                                      }

                var paymentDetails = {
                                      "toAccountNumber":toAccountNumber,
                                       "toSortCode":toSortCode ,
                                       "paymentReference":paymentReference,
                                        "paymentAmount":paymentAmount 
                                                                     }

                var accountId ="5890a0589caecb871299c4d4";
                                $.ajax({
                                                url: "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+accountId+"/payments",beforeSend: function(xhrObj){
                                                                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                                                                xhrObj.setRequestHeader("bearer",bearer);
                                                },
                                                type: "POST",
                                                processData: false,
                                                contentType: 'application/json',
                                                data: JSON.stringify(paymentDetails),
                                })
                                .done(function(data) {
                                    var paymentObject = getPaymentDetails(data.id);
                                    //console.log(paymentObject.paymentStatus);
                                                                                                //Got an accounts/{id}/transactions response
                                                                                                console.log("transaction was successfull, transaction ID:" + data.id);
                                                                                                console.log(data.id);
    
                                                                                                })
                                                                                .fail(function(err) {
                                                                                                //Didn't get an accounts/{id}/transactions response
                                                                                                console.log("No response from POST ");
                                                                                                console.dir(err);
                                                                                });
 
                }



                getBalance(); 
function getBalance() {
               
                var accountId = "5890a0589caecb871299c4d5";
                var accountType = "Savings Account";
 
                                $.ajax({
                                                url: "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+ accountId,beforeSend: function(xhrObj){
                                                                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                                                                xhrObj.setRequestHeader("bearer",bearer);
                                                },
                                                type: "GET",
                                })
                                .done(function(data) {
                                                //Got a customers response
                                                //var customerId=data.id;
                                                var currency="";
                                                if( data.accountCurrency=="GBP"){
                                                currency="£";
                                                }else if( data.accountCurrency=="USD"){
                                                currency="$";
                                                }else if( data.accountCurrency=="EUR"){
                                                currency="€";
                                                }else{
                                                currency=""
                                                }
                                               
                                                console.log("Your %s balance is: %s%s", accountType ,currency ,data.accountBalance);


                                               //res.json({ message2: data.accountBalance })

                                                })
               
                }