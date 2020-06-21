var express = require('express');
var morgan = require('morgan');
app = express();

// middleware 上から順に処理される
// ルーティング
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.Router());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.param('id', function(req, res, next, id) {
    var users = ['まい', 'てる', 'ハル'];
    req.params.name = users[id];
    next();
});
app.use(function(req, res, next) {
    console.log('custom');
    next();
});

app.get('/new', function(req, res) {
    res.render('new');
});
app.post('/create', function(req, res) {
    res.send(req.body.name)
});
app.get('/hello', function(req, res) {
    res.render('index', {name: 'maimaimai'});
});
app.get('/top', function(req, res) {
    res.send('hello');
});
app.get('/top/:id', function(req, res) {
    res.send('hello' + req.params.name);
});
app.get('/hello', function(req, res) {
    res.sendfile(__dirname + '/public/hello.text');
});

app.listen('3000');
console.log('server starting');