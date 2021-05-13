const express = require("express");
const session = require("express-session");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/signUpPage", async (req, res) => {
  try {
    const users = await User.find({});
    res.render("./pages/signUp", { users });
  } catch (err) {
    res.status(500).send({ msg: "Server Error :(" });
  }
});



router.post("/createAdmin", async (req, res) => {
  console.log("testAdmin");
  try {
    const existAdmin = User.findOne({ role: "admin" });
    console.log(existAdmin);
    if (!existAdmin.length) {
      const newAdmin = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        sex: req.body.sex,
        email: req.body.email,
        mobile: req.body.mobile,
        role: req.body.role,
      });
      await newAdmin.save();
      res.status(200).send("Admin Created Successfully");
    } else {
      throw "Error in creating admin";
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const existUser = await User.findOne({ userName: req.body.userName })
    if (existUser) {
      res.status(403).send({ msg: "User already exists" });
    } else {
      const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        sex: req.body.sex,
        mobile: req.body.mobile,
        role: req.body.role,
        email: req.body.email,
      });
      await newUser.save();
      res.status(200).send({ msg: 'Signed Up Successfully'});
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});

router.get("/signInPage", async (req, res) => {
  try {
    if (req.session.user) {
      return res.render('dashboard');
    } else {
      res.render("./pages/signin");
    }
  } catch (err) {
    res.status(500).send({ msg: "Server Error :(" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
   
    const password = req.body.password;
    const existUser = await User.findOne({
      $or: [
        { email: req.body.emailOrUserName },
        { userName: req.body.emailOrUserName },
      ],
    });

    let result;
    
    if (existUser) {
      result = bcrypt.compareSync(req.body.password, existUser.password);
    } else {
      res.status(404).send({ msg: "User not found" });
    }

    if (result) {
      req.session.user = existUser;
      res.status(200).send({ msg: 'logged in successfully' });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }

});

module.exports = router;
