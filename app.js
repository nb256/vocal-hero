var application_root = __dirname,
  express = require("express"),
  path = require("path"),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'); //yeni expresste boyleymis



var app = express();

// model
// mongoose.Promise = global.Promise; //deprecation icin eklendi
// mongoose.connect('mongodb://localhost/my_database');
//
// var HighScore = mongoose.model('HighScores', new mongoose.Schema({
//   username: String,
//   score: Number
// })); VERİTABANI


app.use(express.static(path.join(application_root, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// app.get('/public/img/ship.png', function(req, res) {
//   res.sendFile(__dirname + '/public/img/ship.png');
// });

app.get('/api/highscores', function(req, res) {
  return Todo.find(function(err, highscores) {
    return res.send(highscores);
  });
});
//
// app.get('/api/todos/:id', function(req, res) {
//   return Todo.findById(req.params.id, function(err, todo) {
//     if (!err) {
//       return res.send(todo);
//     }
//   });
// });
//
// app.put('/api/todos/:id', function(req, res) {
//   return Todo.findById(req.params.id, function(err, todo) {
//     todo.text = req.body.text;
//     todo.done = req.body.done;
//     todo.order = req.body.order;
//     return todo.save(function(err) {
//       if (!err) {
//         console.log("updated");
//       }
//       return res.send(todo);
//     });
//   });
// });

app.post('/api/highscores', function(req, res) {
  var highscore;
  highscore = new HighScore({
    username: req.body.username,
    score: req.body.score
  });
  highscore.save(function(err) {
    if (!err) {
      return console.log("New score created.");
    }
  });
  return res.send(highscore);
});
//
// app.delete('/api/todos/:id', function(req, res) {
//   return Todo.findById(req.params.id, function(err, todo) {
//     return todo.remove(function(err) {
//       if (!err) {
//         console.log("removed");
//         return res.send('');
//       }
//     });
//   });
// });

app.listen(3000);
