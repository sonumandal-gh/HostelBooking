const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/HostController');
const isAuth = require('../middleware/isAuth');
const isRole = require('../middleware/isRole');
const multer = require("multer");
const path = require("path");

// MULTER STORAGE for hostel images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// All routes here require host role
hostRouter.use(isAuth, isRole('host'));

// Routes relative to /api/host
hostRouter.get("/hostels", hostController.getHostels);

// GET Single Hostel for Edit
hostRouter.get("/edit-hostel/:hostelId", hostController.getHostelForEdit);

// POST Add Home (Image Upload)
hostRouter.post('/add-hostel', upload.single("image"), hostController.postAddHome);

// PUT Update Hostel
hostRouter.put('/edit-hostel/:hostelId', upload.single("image"), hostController.putEditHostel);

// DELETE HOSTEL
hostRouter.delete("/delete-hostel/:hostelId", hostController.deleteHostel);

module.exports = hostRouter;