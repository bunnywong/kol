/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');

// Setup server
var app = express();
var server = require('http').createServer(app);
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require('path');

// app.set('view engine', 'html');
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/app')));

var fs = require('fs');

var csvWriter = require('csv-write-stream');
// writer.end();


app.post('/profile', function(req, res) {
  var body = req.body;
  if (body.city) { body.city = convertCity(body.country, body.city); }
  if (body.country) { body.country = convertCountry(body.country); }

  body.timeSubmitted = new Date();
  
  console.log(body);

  var Converter = require('csvtojson').Converter;
  var fileStream = fs.createReadStream('data.csv');
  //new converter instance 
  var converter = new Converter({constructResult:true});
  //end_parsed will be emitted once parsing finished 
  converter.on('end_parsed', function (jsonObj) {
    var writer = csvWriter();
    writer.pipe(fs.createWriteStream('data.csv'));

    if (jsonObj.length === 0) {
      jsonObj.push({ 'first-name': 'sample',
        'last-name': 'user',
        age: '99',
        gender: 'Male',
        country: 'Afghanistan',
        city: 'Balkh',
        neighborhood: 'sdf',
        profession: 'sdf',
        'household-income': '500K+',
        'facebook-checkbox': 'on',
        'twitter-checkbox': 'on',
        'pinterest-checkbox': 'on',
        'instagram-checkbox': 'on',
        'youtube-checkbox': 'on',
        'wechat-checkbox': 'on',
        'weibo-checkbox': 'on',
        pinterest: '1000-2000',
        instagram: '2000-3000',
        wechat: '2000-3000',
        facebook: '2000-3000',
        twitter: '2000-3000',
        youtube: '2000-3000',
        weibo: '2000-3000',
        brands: 'sample',
        venues: 'sample',
        activities: 'sample',
        email: 'sdf@sdfljc.c',
        timeSubmitted: 'Sat Jul 18 2015 03:43:00 GMT+0800 (HKT)'
      });
    }

    jsonObj.push(body);
    // fs.writeFileSync('data.xlsx', xls, 'binary');
    for (var i = 0; i < jsonObj.length; i ++) {
      writer.write(jsonObj[i]);
    }
    writer.end();

    // res.sendFile(__dirname + '/app/sign-up-now-finish.html');
    // res.redirect('/sign-up-now-finish.html');
    res.send({redirect: '/sign-up-now-finish.html'});
  });
  //read from file 
  fileStream.pipe(converter);

});

var path = require('path');
var mime = require('mime');

app.get('/profile', function(req, res) {
  console.log(req.query);

  if (req.query.name === 'Krizia' && req.query.password === 'BKDFJ') {
    console.log('success');
    // res.sendFile(__dirname + '/data.csv');

    var file = __dirname + '/data.csv';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
    res.redirect('/');
  } else {
    res.sendStatus(401);
  }



});

// Start server
server.listen(9000, function () {
  console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
});

// Expose app
exports = module.exports = app;



var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

function convertCountry(code) {
  return data.countries[code];
}
function convertCity(country, city) {
  var cityName;
  for (var key in data.states[country]) {
    if (data.states[country][key].code === city) {
      cityName = data.states[country][key].name;
    }
  }
  if (cityName === undefined) { cityName = city; }
  return cityName;
}


