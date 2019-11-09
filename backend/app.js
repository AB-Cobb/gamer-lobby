let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  DataBaseConfig = require('./db/gamer-lobby-db');
//  mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || DataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
  },
  error => {
    console.log('Could not connect to DB: ' + error)
  }
)

// express js port
const playerRoute = require('../backend/routes/player.route')
const gameRoute = require('../backend/routes/game.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

//Static Dir
app.use(express.static(__dirname + '/../dist/gamer-lobby'));
console.log('app dir: '+ __dirname+ '/../dist/gamer-lobby');

//Restful API 
app.use('/api', playerRoute);
app.use('/api', gameRoute);

// port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// index Route
app.get('/**', (req, res) => {
  express.static(__dirname + '/../dist/gamer-lobby')
});



app.use((req, res, next) => {
  console.log('routing not working')
  next(createError(404));
});//

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});