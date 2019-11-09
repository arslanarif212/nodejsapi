const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
var request = require('request');

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.listen(port, function(req,res){
  console.log("APPLICATION IS UP AND RUNNING MY HOMIE, AT PORT NUMBER " ,port, ".sweet!!")
})

app.post("/" , function(req,res)
{
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var qty = req.body.qty;

  var baseurl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
  var finalurl = baseurl + crypto + fiat;
  // ------------REQUESTING THE DATA FROM THE API-------
  request(finalurl, function(error, response, body){
   var data = JSON.parse(body);
   var price = data.ask;
   var dts = data.display_timestamp;
  var total_price = qty * price;

       res.write("<h1>" + qty + " " + crypto + ": " + " in " + fiat + " equals to = " + total_price );
    res.write("<h3>Today is " + dts)
   res.send();
   })

})
