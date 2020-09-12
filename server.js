// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create express app instance.
var app = express();


//set port
var PORT = process.env.PORT || 8080;

//establish connection with the created sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "535649",
    database: "seinfeld_db"
})

//connect
connection.connect(function(err){
    //in case of err
    if(err){
        console.log('error' + err.stack)
        return
    }
    //otherwise console log the connection threadid
    console.log('connection id ' + connection.threadId)
})

//3 routes - /cast, /coolness-chart
//Create a /attitude-chart/:att route that will display all the actors for a specific type of attitude.

//main
app.get('/cast', function(req, res){
//get all 
connection.query('SELECT * FROM actors order by id', function(err, result){

    var html = "<h1>Actors Ordered BY ID</h1>";

    html += "<ul>";

    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p> Name: " + result[i].name + "</p>";
      html += "<p> Coolness Points: " + result[i].coolness_points + "</p>";
      html += "<p>Attitude: " + result[i].attitudes + "</p></li>";
    }

    html += "</ul>";

    res.send(html);
})
})

app.get('/coolness-chart', function(req,res){
    connection.query('SELECT * from actors order by coolness_points DESC', function(err, result){

        var html = "<h1>Actors Ordered BY COOLNESS POINTS</h1>";

        html += "<ul>";
    
        for (var i = 0; i < result.length; i++) {
          html += "<li><p> ID: " + result[i].id + "</p>";
          html += "<p> Name: " + result[i].name + "</p>";
          html += "<p> Coolness Points: " + result[i].coolness_points + "</p>";
          html += "<p>Attitude: " + result[i].attitudes + "</p></li>";
        }
    
        html += "</ul>";
    
        res.send(html);
    })
})

app.get("/attitude-chart/:att", function(req, res) {
    connection.query("SELECT * FROM actors where attitudes = ?", [req.params.att], function(err, result) {
      var html = "<h1>Actors With an Attitude of " + req.params.att + "</h1>";
  
      html += "<ul>";
  
      for (var i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p> Name: " + result[i].name + "</p>";
        html += "<p> Coolness Points: " + result[i].coolness_points + "</p>";
        html += "<p>Attitude: " + result[i].attitudes + "</p></li>";
      }
  
      html += "</ul>";
  
      res.send(html);
    });
  });




app.listen(PORT, function(){
    console.log('connected to ' + PORT)
})

