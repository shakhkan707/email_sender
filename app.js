// Import required modules
var express = require('express'); // Express framework for creating web applications
var http = require('http'); // HTTP module for creating HTTP server
var path = require('path'); // Path module for working with file and directory paths
var nodemailer = require('nodemailer'); // Nodemailer module for sending emails

// Create an Express application
var app = express();

// Create an HTTP server using the Express application
var server = http.createServer(app);

// Define the port number
var port = 3000;

// Set the port configuration for the Express application
app.set("port", port);

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (index.html)
app.use(express.static(path.join(__dirname, "")));

// Route for serving the index.html file
app.get("/", function(req, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

// Route for handling POST request to send email
app.post("/send_email", function(req, response) {
  // Extract form data from request body
  var from = req.body.from;
  var to = req.body.to;
  var subject = req.body.subject;
  var message = req.body.message;

  // Create Nodemailer transporter
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shakh050417@gmail.com', // Sender's email address
      pass: 'gwok qsty mmur gsyh' // Sender's email password
    }
  });

  // Define email options
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
  };

  // Send email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error); // Log any errors encountered during email sending
    } else {
      console.log("Email Sent: " + info.response); // Log success message with email response info
    }
    response.redirect("/"); // Redirect to the homepage after sending the email
  });
});

// Start the HTTP server and listen on the defined port
server.listen(port, function() {
  console.log("Server running on port: " + port); // Log server start message with port number
});
