const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP POST
exports.postSignUp = async (req ,res) => {
  const { fullName, email ,password , role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      message: "Validation failed", 
      errors: errors.array() 
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(422).json({ 
        message: "Email already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: "User created successfully!" });

  } catch(err){
    console.log(err);
    res.status(500).json({ message: "Signup Failed" });
  }
};

// LOGIN POST
exports.postLogin = async (req, res) => {
  const { email , password } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user){
      return res.status(401).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { 
        email: user.email, 
        userId: user._id.toString(),
        role: user.role 
      },
      process.env.JWT_SECRET || 'supersecretsecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token: token, 
      userId: user._id.toString(),
      role: user.role,
      fullName: user.fullName
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};