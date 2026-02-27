const path = require('path');
const express = require('express');
const session = require('express-session');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/HostRouter');
const favouriteRouter = require('./routes/favouriteRouter');
const {mongoConnect} = require('./utils/database');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = {
      _id: "65f1a2b3c4d5e6f789123456" 
    };
  }
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(storeRouter);
app.use(hostRouter);
app.use(favouriteRouter);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', {
    PageTitle: '404 | Page Not Found',
    cssFile: '404'
  });
});

// Server
const PORT = 3000;
mongoConnect(() =>{
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
