const path = require('path');
const express = require('express');
const session = require('express-session');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/HostRouter');
const favouriteRouter = require('./routes/favouriteRouter');
const AuthRouter = require('./routes/AuthRouter');
const mongoConnect = require('./utils/database');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({
  secret: "Sonu Mandal Js",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Login Check Middleware
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  console.log("Session check middleware:", req.isLoggedIn);
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(storeRouter);

// Host routes protection
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use(hostRouter);
app.use(favouriteRouter);
app.use(AuthRouter);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', {
    PageTitle: '404 | Page Not Found',
    cssFile: '404',
    isLoggedIn: req.isLoggedIn
  });
});

// Server
mongoConnect()
.then(() => {
  console.log("MongoDB Connected");
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});