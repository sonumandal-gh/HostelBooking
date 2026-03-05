const { validationResult } = require("express-validator");
const User = require("../models/user");

// LOGIN PAGE
exports.getLogin = (req , res, next) => {
  res.render("Auth/login", {
    PageTitle: "Login Page",
    cssFile: "login",
    isLoggedIn: req.session.isLoggedIn || false,
    errorMessage: null
  });
};

// SIGNUP PAGE
exports.getSignUp = (req, res, next) => {
  res.render("Auth/signup", {
    PageTitle: "Sign-Up Page",
    cssFile: "signUp",
    isLoggedIn: false,
    errorMessages: [],
    oldInput: {}
  });
};

// SIGNUP POST
exports.postSignUp = async (req ,res ,next) => {

  const { fullName, email ,password , confirmPassword, role } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('Auth/signup',{
      PageTitle:'Sign Up',
      cssFile:"signUp",
      isLoggedIn: false,
      errorMessages: errors.array(),
      oldInput: {
        fullName,
        email,
        password,
        role
      }
    });
  }

  try {

    const user = new User({
      fullName,
      email,
      password,
      role
    });

    await user.save();

    console.log("User Created Successfully");

    res.redirect("/login");

  } catch (err) {
    console.log(err);
  }
};


// LOGIN POST
exports.postLogin = async (req, res ,next) => {

  const { email , password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
    return res.render("Auth/login", {
      PageTitle: "Login Page",
      cssFile: "login",
      isLoggedIn: false,
      errorMessage: "User does not exist"
    });
  }

  if(user.password !== password){
    return res.render("Auth/login", {
      PageTitle: "Login Page",
      cssFile: "login",
      isLoggedIn: false,
      errorMessage: "Incorrect password"
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;

  res.redirect('/');
};


// LOGOUT
exports.postLogout = (req, res ,next) => {

  req.session.destroy(() => {
    res.redirect('/login');
  });

};