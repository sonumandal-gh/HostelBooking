const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/HostController');
const multer = require("multer");

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET Add Home Page
hostRouter.get('/Add-home', hostController.getAddHome);

// POST Submit Home (IMAGE UPLOAD)
hostRouter.post('/submit-home', upload.single("image"), hostController.postAddHome);

// GET Hostels List
hostRouter.get("/hostels", hostController.getHostHostels);

// DELETE HOSTEL
hostRouter.post("/delete-hostel", hostController.deleteHostel);

module.exports = hostRouter;