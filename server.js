var express = require('express');
var app = express();
var db = require('./db');

app.get('/api', function (req, res) {
  res.status(200).send('Meetings API');
});

var AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

var MeetingController = require('./routes/MeetingController');
app.use('/api/meetings', MeetingController);

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});