const express = require('express');
const AuthRouter = express.Router();
const { check } = require("express-validator");
const AuthController = require('../controllers/AuthController');

// Auth Routes relative to /api
AuthRouter.post(
  '/login',
  [
    check("email")
      .isEmail().withMessage("Enter a valid email")
      .normalizeEmail(),
  ],
  AuthController.postLogin
);


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
      .withMessage("Password must be at least 6 characters"),

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
  ],

  AuthController.postSignUp
);

module.exports = AuthRouter;