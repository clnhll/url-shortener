var express = require('express');
var app = express();

var urls = [];

app.enable('trust proxy');
app.get('/', function(req, res) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send(
`
<h1>FreeCodeCamp URL Shortener</h1>
<p>
  Usage:<br />
  Visit "${fullUrl}new/http://example.com"
</p>
  Response: <br />
  {
    "original_url": "http://example.com",
    "short_url": "${fullUrl}123"
  }
</p>
`);
});

app.get(/.\d+/, function(req, res) {
  res.redirect(urls[req.path.replace('/', '')]);
});

app.get('/new/*', function(req, res) {
  const url = req.path.replace('/new/', '')
    .match(/https?:\/\/(\w+\.)+\w+:?(\d+)?/);
  const fullUrl = req.protocol + '://' + req.get('host');

  if (url) {
    urls.push(url[0]);
    res.send({
      'original_url': url[0],
      'short_url': fullUrl + '/' + (urls.length - 1)
    })
  } else {
    res.send({
      error: 'Invalid URL',
    })
  }
})

app.listen(8080, function() {
  console.log('listening on port 8080');
});
