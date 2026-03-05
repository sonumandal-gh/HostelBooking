const express = require('express');
const AuthRouter = express.Router();

const { check } = require("express-validator");

const AuthController = require('../controllers/AuthController');

// Login Routes
AuthRouter.get('/login', AuthController.getLogin);
AuthRouter.post('/login', AuthController.postLogin);

AuthRouter.post('/logout', AuthController.postLogout);

// Signup Routes
AuthRouter.get('/signup', AuthController.getSignUp);

AuthRouter.post(
  "/signup",
  [
    check("fullName")
      .trim()
      .notEmpty().withMessage("Full name is required")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Name should contain only letters"),

    check("email")
      .isEmail().withMessage("Enter a valid email")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain one number")
      .matches(/[!@#$%^&*]/)
      .withMessage("Password must contain one special character"),

    check("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),

    check("role")
      .notEmpty()
      .withMessage("Please select account type")
      .isIn(["guest", "host"])
  ],

  AuthController.postSignUp
);

module.exports = AuthRouter;