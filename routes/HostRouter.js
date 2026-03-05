const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/HostController');

// GET Add Home Page
hostRouter.get('/Add-home', hostController.getAddHome);

// POST Submit Home
hostRouter.post('/submit-home', hostController.postAddHome);

hostRouter.get("/hostels",hostController.getHostHostels);

hostRouter.post("/delete-hostel", hostController.deleteHostel );


module.exports = hostRouter;
