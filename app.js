const path = require('path');
const express = require('express');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/HostRouter');
const {mongoConnect} = require('./utils/database');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(storeRouter);
app.use(hostRouter);

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
