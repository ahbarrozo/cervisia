const express = require('express');
const next = require('next');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const promisify = require('util');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
console.log('Connected to the database');

// import all of our models
require('./models/Brewery');
require('./models/User');
require('./models/Review');
require('./lib/passport');

/* Adapting openbreweryDB schema to cervisia using bulks 
   to make the process faster. */
const Brewery = mongoose.model('Brewery');
let count = 0;
let bulkOps = [];
const batch = 1000;

/* Deleting breweries that are either closed or in planning, 
      or with no available coordinates */
await Brewery.collection.deleteMany({
  $or: [
    { brewery_type: { $in: ['closed', 'planning'] } },
    { latitude: { $eq: '' } },
    { longitude: { $eq: '' } },
  ],
});

/* Count the number of entries after deleting. This will 
      be used for the bulk operation below */
const brewTotal = await Brewery.collection.countDocuments({});

/* If we detect an entry that comes from openbrewerydb
      that hasn't been treated (e.g. no "location" field), 
      project it into cervisia format. */
Brewery.collection
  .aggregate([
    {
      $match: {
        location: { $exists: false },
      },
    },
    {
      $project: {
        location: {
          type: 'Point',
          coordinates: ['$longitude', '$latitude'],
          address: '$street',
          city: '$city',
          state: '$state',
          county_province: '$county_province',
          country: '$country',
        },
      },
    },
  ])
  .forEach(async (doc) => {
    doc.location.coordinates = doc.location.coordinates.map(Number);
    bulkOps.push({
      updateOne: {
        filter: { _id: doc._id },
        update: {
          $set: { location: doc.location },
          $unset: {
            latitude: '',
            longitude: '',
            street: '',
            address_2: '',
            address_3: '',
            city: '',
            state: '',
            county_province: '',
            postal_code: '',
            country: '',
          },
        },
      },
    });
    count += 1;

    // the last condition allows for an incomplete batch to run
    // eslint-disable-next-line eqeqeq
    if (bulkOps.length === batch || count == brewTotal) {
      Brewery.collection.bulkWrite(bulkOps);
      bulkOps = [];
    }
  });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => handle(req, res));

  // serves up static files from the public folder. Anything in public/ will just be served up as the file it is
  server.use(express.static(path.join(__dirname, 'public')));

  /* Takes the raw requests and turns them into usable properties on 
   req.body. extended: true allows for accessing objects within objects
   which is the case of the location property in our Brewery model */
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
  // server.use(expressValidator());

  // populates req.cookies with any cookies that came along with the request
  server.use(cookieParser());

  // Sessions allow us to store data on visitors from request to request
  // This keeps users logged in and allows us to send flash messages

  server.use(
    session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    })
  );

  // // Passport JS is what we use to handle our logins
  server.use(passport.initialize());
  server.use(passport.session());

  // // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
  server.use(flash());

  // pass variables to our templates + all requests
  // flashes are saved as array of object to be displayed
  // according to layout.
  server.use((req, res, next) => {
    //  res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
  });

  // promisify some callback based APIs
  server.use((req, res, next) => {
    req.login = promisify(req.login, req);
    next();
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
