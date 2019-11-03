let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./db/player-db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
  },
  error => {
    console.log('Could not connect to DB: ' + error)
  }
)

// Set up express js port
const playerRoute = require('../backend/routes/player.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

//Static Directory
app.use(express.static(path.join(__dirname, 'dist/gammer-lobby')));
//app.use('/', express.static(path.join(__dirname, 'dist/gammer-lobby')));
app.use('/api', playerRoute)

// Create port
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Route to Angular App
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/gammer-lobby/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});