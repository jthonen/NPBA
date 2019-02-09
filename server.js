const express = require("express");
const morgan = require("morgan");

const mongoose = require( "mongoose");
const routes = require("./routes");

const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;
const server = require('http').createServer(app);
//import socket.io
const io = require('socket.io')(server);
const logger = require("morgan");


// grabbing our test model
const Test = require("./models/test");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.unsubscribe(morgan('combined'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/NPBA_API");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is our connection to socket
io.on('connection', (client) => {

  // we are listening to an event here called 'message'
  client.on('message', (message) => {
    // and emitting the message event for any client listening to it
    io.emit('message', message);
  });
});

// just a dummy GET route on our Test model
app.get("/data", (req,res) => {
  Test.find((err, data) => { 
    if(err) throw err; 
    res.json(data);
  });
});

// just a post on our Test model
app.post("/new", (req, res) => {
  const test = new Test(req.body);
  test.save(req.body, (err, data) => {
    if(err) throw err;    
    res.json(data);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  if ( process.env.NODE_ENV === "production" ) {
    res.sendFile(__dirname + "./client/build/index.html");
  } else {
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

server.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
