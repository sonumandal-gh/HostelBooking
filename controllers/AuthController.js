const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


// LOGIN PAGE
exports.getLogin = (req , res) => {

  res.render("Auth/login", {
    PageTitle: "Login Page",
    cssFile: "login",
    isLoggedIn: req.session.isLoggedIn || false,
    errorMessage: null,
    oldInput: {
      email: ""
    }
  });

};


// SIGNUP PAGE
exports.getSignUp = (req, res) => {

  res.render("Auth/signup", {
    PageTitle: "Sign-Up Page",
    cssFile: "signUp",
    isLoggedIn: false,
    errorMessages: [],
    oldInput: {},
    user: {}
  });

};



// SIGNUP POST
exports.postSignUp = async (req ,res) => {

  const { fullName, email ,password , role } = req.body;

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

    // EMAIL CHECK
    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(422).render("Auth/signup",{
        PageTitle:"Sign Up",
        cssFile:"signUp",
        isLoggedIn:false,
        errorMessages:[{msg:"Email already exists"}],
        oldInput:{fullName,email,password,role},
        user: {}
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password,12);

    const user = new User({
      fullName,
      email,
      password:hashedPassword,
      role
    });

    await user.save();

    console.log("User Created Successfully");

    res.redirect("/login");

  } catch(err){
    console.log(err);
    res.redirect("/signup");
  }

};



// LOGIN POST
exports.postLogin = async (req, res) => {

  const { email , password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
    return res.render("Auth/login", {
      PageTitle: "Login Page",
      cssFile: "login",
      isLoggedIn: false,
      errorMessage: "User does not exist",
      oldInput: { email }
    });
  }

  const isMatch = await bcrypt.compare(password , user.password);
  
  if(!isMatch){
    return res.render("Auth/login", {
      PageTitle: "Login Page",
      cssFile: "login",
      isLoggedIn: false,
      errorMessage: "Incorrect password",
      oldInput: { email }
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;

  res.redirect('/');

};



// LOGOUT
exports.postLogout = (req, res) => {

  req.session.destroy(() => {
    res.redirect('/login');
  });

};