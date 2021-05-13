const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const generalTools = require("../tools/general-tools");
const User = require("../models/user");
const Article = require("../models/articles");
const Comment = require("../models/comment");


const router = express.Router();

router.get("/newArticlePage", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    res.render("./pages/addArticle", { user });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

router.post("/newArticle", async (req, res) => {
  try {
    const newArticle = await new Article({
      title: req.body.title,
      text: req.body.text,
      author: req.session.user._id,
    });
    console.log(newArticle);
    await newArticle.save();
    res.status(200).send({ msg: "Article Published Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});

router.get("/getArticle", async (req, res) => {
  try {
    const userArticles = await Article.find({ author: req.session.user._id });
    res.send(userArticles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});

router.post("/articleImage/:id", (req, res) => {

  const upload = generalTools.uploadArticleImg.single("image");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err.message);

      res.status(500).send({ msg: err.message });
    } else if (err) {
      console.log(err.message);

      res.status(404).send({ msg: err.message });
    } else {

  console.log(req.file);

      Article.findByIdAndUpdate(
        { _id: req.params.id },
        { image: req.file.filename },
        { new: true },
        (err, article) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({ msg: err.message });
          } else { 
            res.render('./pages/editArticle', { article : article})
          }
      });
    }
  });
});


router.get("/editArticle/:id", async (req, res) => {
  try {
    const article = await Article.findById({ _id: req.params.id });
    const user = await User.findOne({ _id: req.session.user._id });
    res.render("./pages/editArticle", { article: article, user: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});


router.get('/readArticle/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    const author = await User.findOne({ _id: article.author });
    const comments = await Comment.find({ article: article._id }).populate('owner').exec();
    
  
  
    res.render("./pages/readArticle", { article: article, author: author, comments: comments });

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})

module.exports = router;
