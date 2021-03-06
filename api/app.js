'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// directory references
const rest_api_sql_dir = path.join(__dirname, '../rest-api-sql');

// create the Express app
const app = express();

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve up the public folder so we can request static
// assets from the api
app.use(express.static(`${rest_api_sql_dir}/public`));

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Enable CORS Requests to allowed domains
const allowlist = [
  'http://localhost:3000',
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if(allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { 
      origin: true,
      allowedHeaders: ['Content-type', 'Authorization'],
      credentials: true
    } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } //disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

//middleware to manage cookies
app.use(cookieParser());

//Add routes
app.use('/', routes);
app.use('/api', userRoutes);
app.use('/api', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {
      error: err.stack
    },
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
