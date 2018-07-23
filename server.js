fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
let stringifyFile = "";

const app = express();

app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
  fs.readFile('./test.json', 'utf8', function(err, data) {
    if (err) throw err;
    stringifyFile = data;
    res.send(data);
  });
});

app.post('/updateNote/:note', function(req, res) {
  stringifyFile = req.params.note;
  fs.appendFile('./test.json', stringifyFile, function(err, data) {
    if (err) throw err;
    console.log('file updated');
    fs.readFile('./test.json', 'utf8', function(err, data) {
      if (err) throw err;
      res.send(data);
    });
  });
});

app.listen(3000);
