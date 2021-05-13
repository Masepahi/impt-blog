const express = require("express");
const User = require("../models/user");
const session = require("express-session");
const Article = require("../models/articles");
const Comment = require("../models/comment")
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select(['-password']);
    const articles = await Article.find({}).populate('author').exec();
    
    res.render('home', { articles: articles, users: users });
  } catch (err) {
    res.status(500).send({ msg: "Server Error :(" });
  }
});



router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});

    let result = users.map(function (obj) {
      return {
        avatar: obj.avatar,
        role: obj.role,
        _id: obj._id,
        firstName: obj.firstName,
        lastName: obj.lastName,
        userName: obj.userName,
        sex: obj.sex,
        mobile: obj.mobile,
        email: obj.email,
        createdAt: obj.createdAt,
        lastUpdate: obj.lastUpdate,
      };
    });

    return res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});


module.exports = router;
