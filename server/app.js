const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

require('./auth/passportConfig')(passport); // Passport configuration
require('dotenv').config()

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'CSRF-Token'], // Add 'CSRF-Token' to allowed headers
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Use cookie-parser middleware

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000, // Check expired sessions every 2 minutes (ms)
        dbRecordIdIsSessionId: true,
      }
    ),
  })
);

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

app.use(passport.initialize());
app.use(passport.session());

// Add a route to send the CSRF token to the client
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Apply CSRF protection to all routes
app.use(csrfProtection);

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Use your auth routes here, ensure they are protected with CSRF if they change state
app.use('/auth', require('./routes/authRoutes'));
app.use('/group', require('./routes/groupRoutes'));

module.exports = app;
