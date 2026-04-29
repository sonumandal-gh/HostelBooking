require("dotenv").config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const multer = require("multer");

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/HostRouter');
const favouriteRouter = require('./routes/favouriteRouter');
const AuthRouter = require('./routes/AuthRouter');
const mongoConnect = require('./utils/database');

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.locals.upload = upload;

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "Sonu Mandal Js",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
  } 
}));

// Login Check Middleware
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  req.user = req.session.user || null;
  console.log("Session check middleware:", req.isLoggedIn);
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(storeRouter);
app.use(AuthRouter);

// Host routes protection middleware
const isAuth = (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.use('/host', isAuth, hostRouter);
app.use(isAuth, favouriteRouter); 

// 404 Route
app.use((req, res) => {
  res.status(404).render('404', { 
    PageTitle: "404 - Not Found", 
    isLoggedIn: req.isLoggedIn, 
    cssFile: '404' 
  });
});

// Connect to MongoDB FIRST, then start server
const PORT = process.env.PORT || 3001;

mongoConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to connect to MongoDB. Server not started.", err.message);
    process.exit(1);
  });
