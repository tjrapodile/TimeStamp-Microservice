// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isNum(str) {
  return /^\d+$/.test(str);
}


// your first API endpoint... 
app.get("/api/", function (req, res) {
  const utcDate = new Date().toUTCString();
  const unix = new Date().getTime();

  return res.json({ unix: unix, utc: utcDate });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;

  let unix, utcDate, dateObj;

  try {
    if (isNum(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      dateObj = new Date(date);
    }

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid Date");
    }
  } catch (error) {
    return res.json({ error: "Invalid Date" });
  }

  unix = dateObj.getTime();
  utcDate = dateObj.toUTCString();

  return res.json({ unix: unix, utc: utcDate });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
