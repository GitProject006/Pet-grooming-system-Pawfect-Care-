const Admin = require("../models/Admin/AdminSchema");
const User = require("../models/User/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const aSignup = async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({ message: "Already have an account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ name, email, password: hashedPassword });

    const payload = {
      id: newAdmin._id,
      email: newAdmin.email,
      name: newAdmin.name,
    };

    const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; // Use .env in real projects
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return resp.status(201).json({
      message: "Account Created",
      user: payload,
      token
    });

  } catch (err) {
    console.error("Signup Error:", err);
    return resp.status(500).json({ message: "Failed to create account" });
  }
}

const aLogin =  async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return resp.json("no user");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.json("login fail");
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
console.log(token)
    return resp.json({
      Status: "Success",
      user: payload,
      token
    });

  } catch (err) {
    console.error("Login Error:", err);
    resp.status(500).json("Internal server error");
  }
}

const uSignup = async (req, resp) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp.status(400).send({ message: "Already have an account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const payload = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    };

    const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey"; // Use .env in real projects
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return resp.status(201).send({
      message: "Account Created",
      user: payload,
      token
    });

  } catch (err) {
    console.error("Signup Error:", err);
    return resp.status(500).json({ message: "Failed to create account" });
  }
}

const uLogin = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return resp.json("no user");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.json("login fail");
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
console.log(token)
    return resp.json({
      Status: "Success",
      user: payload,
      token
    });

  } catch (err) {
    console.error("Login Error:", err);
    resp.status(500).json("Internal server error");
  }
}

module.exports = {aSignup,aLogin,uSignup,uLogin}