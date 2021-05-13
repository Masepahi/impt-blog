const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const generalTools = require("../tools/general-tools");
const User = require("../models/user");
const { find } = require("../models/user");
const Article = require("../models/articles");
const Comment = require("../models/comment");



const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const userArticles = await Article.find({ author: req.session.user._id });
    const loggedUser = await User.findById({ _id: req.session.user._id });
    
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.render('adminDashboard', { user: loggedUser, articles: userArticles });
      } else {
        return res.render('dashboard',  { user: loggedUser, articles: userArticles });
      }
    } else {
      res.render('home')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }

});



router.get('/userList', async (req, res) => {
  try {
    const userList = await User.find({ role: 'blogger' });

    if (req.session.user.role === 'admin') {
      res.render('./pages/userList', { users: userList })
    } else {
      res.redirect('/dashboard')
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }

})

router.get("/loggedUser", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.session.user._id });
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});

router.get("/updateInfoPage", async (req, res) => {
  try {
    const userInfo = await User.findOne({ _id: req.session.user._id });
    res.render("./pages/updateInfo", { loggedUser: userInfo });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});


router.get('/removeAvatar' , async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    delete user.avatar;
    res.redirect('../user/updateInfoPage')
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})


router.get('/deleteUser', async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.session.user._id });
    const article = await Article.deleteMany({ author: req.session.user._id });
    const comments = await Comment.deleteMany({ owner: req.session.user._id });

    res.redirect('../auth/signinPage')
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }

});


router.get('/deleteSelectedUser/:id', async (req, res) => {
  try {
    const selectedUser = await User.deleteOne({ _id: req.params.id });
    const cms = await Comment.deleteMany({ owner: req.params.id });
    const articles = await Article.deleteMany({ author: req.params.id });

    res.redirect('./userList')
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})

router.get("/loggedInUser", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const article = await Article.find({ author: req.params.id })

    res.render('userPage', { loggedUser: user, articles: article });

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})


router.post("/avatar", (req, res) => {

  const upload = generalTools.uploadAvatar.single("avatar");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("Server Error!");
    } else if (err) {
      res.status(404).send(err.message);
    } else {
      User.findByIdAndUpdate(
        req.session.user._id,
        { avatar: req.file.filename },
        { new: true },
        (err, user) => {
          if (err) {
            res.status(500).json({ msg: "Server Error!" });
          } else {
            if (req.session.user.avatar) {
              fs.unlink(
                path.join(
                  __dirname,
                  "../public/images",
                  req.session.user.avatar
                ),
                (err) => {
                  if (err) {
                    res.status(500).json({ msg: "Server Error!" });
                  } else {
                    req.session.user = user;

                    res.redirect("./updateInfoPage");
                  }
                }
              );
            } else {
              req.session.user = user;

              res.redirect("./updateInfoPage");

            }
          }
        }
      );
    }
  });
});

router.put("/updateUser", async (req, res) => {
  try {
    let updateContent = {
      email: req.body.email,
      userName: req.body.userName,
      mobile: req.body.mobile,
      bio: req.body.bio,
      lastUpdate: Date.now(),
    };
    let user = await User.update({ _id: req.session.user._id }, updateContent, { multi: true });

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });

  }
});

router.get('/resetPass/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);

    const newUser = await User.updateOne({ _id: user._id }, { password: user.mobile }, { new: true });
    console.log(newUser);
    res.redirect(req.get('referer'));

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})

router.get('/:', async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    // res.status(200).send({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
})




router.use('./oneUser:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).send({ user })
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
})

module.exports = router;
