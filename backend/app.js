let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  jwt = require('express-jwt');
  jwks = require('jwks-rsa');
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
// JWT auth0 middleware 
let jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-5fqhxxpv.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://shielded-caverns-18893.herokuapp.com/api/',
    issuer: 'https://dev-5fqhxxpv.auth0.com/',
    algorithms: ['RS256']
});

const playerRoute = require('../backend/routes/player.route')
const gameRoute = require('../backend/routes/game.route')
const userRoute = require('../backend/routes/user.route')
const publicRoute = require('../backend/routes/public.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/authorized', function (req, res) {res.send('Secured Resource');});

//Static Dir
app.use(express.static(path.join(__dirname , '/../dist/gamer-lobby')));
console.log('app dir: '+ __dirname+ '/../dist/gamer-lobby');

//Restful API
app.use('/public_api', publicRoute);

app.use('/api', playerRoute);
app.use('/api', gameRoute);
app.use('/api', userRoute);


// port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// index Route
app.get('/**', (req, res) => {
  res.sendfile(path.join(__dirname , '/../dist/gamer-lobby/index.html'))
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