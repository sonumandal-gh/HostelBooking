const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// LOGIN GET
exports.getLogin = (req, res) => {
  res.render('Auth/login', {
    PageTitle: "Login",
    cssFile: 'login',
    isLoggedIn: req.isLoggedIn,
    errorMessage: null,
    oldInput: { email: "" }
  });
};

// SIGNUP GET
exports.getSignUp = (req, res) => {
  res.render('Auth/signup', {
    PageTitle: "Sign Up",
    cssFile: 'signUp',
    isLoggedIn: req.isLoggedIn,
    errorMessages: [],
    oldInput: { fullName: "", email: "", role: "guest" }
  });
};


// SIGNUP POST
exports.postSignUp = async (req ,res) => {

  const { fullName, email ,password , role } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('Auth/signup', {
      PageTitle: "Sign Up",
      cssFile: 'signUp',
      isLoggedIn: req.isLoggedIn,
      errorMessages: errors.array(),
      oldInput: { fullName, email, role }
    });
  }

  try {
    // EMAIL CHECK
    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(422).render('Auth/signup', {
        PageTitle: "Sign Up",
        cssFile: 'signUp',
        isLoggedIn: req.isLoggedIn,
        errorMessages: [{ msg: "Email already exists" }],
        oldInput: { fullName, email, role }
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.redirect('/login');

  } catch(err){
    console.log(err);
    res.status(500).render('Auth/signup', {
      PageTitle: "Sign Up",
      cssFile: 'signUp',
      isLoggedIn: req.isLoggedIn,
      errorMessages: [{ msg: "Signup Failed" }],
      oldInput: { fullName, email, role }
    });
  }

};


// LOGIN POST
exports.postLogin = async (req, res) => {

  const { email , password } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user){
      return res.status(401).render('Auth/login', {
        PageTitle: "Login",
        cssFile: 'login',
        isLoggedIn: req.isLoggedIn,
        errorMessage: "User does not exist",
        oldInput: { email }
      });
    }

    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch){
      return res.status(401).render('Auth/login', {
        PageTitle: "Login",
        cssFile: 'login',
        isLoggedIn: req.isLoggedIn,
        errorMessage: "Incorrect password",
        oldInput: { email }
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = { _id: user._id, email: user.email, role: user.role }; 

    req.session.save(err => {
      if (err) console.log(err);
      res.redirect('/');
    });

  } catch (err) {
    console.log(err);
    res.status(500).render('Auth/login', {
      PageTitle: "Login",
      cssFile: 'login',
      isLoggedIn: req.isLoggedIn,
      errorMessage: "Login failed",
      oldInput: { email }
    });
  }
};


// LOGOUT
exports.postLogout = (req, res) => {

  req.session.destroy(() => {
    res.redirect('/');
  });

};