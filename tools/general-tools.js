const path = require("path");
const multer = require("multer");
let generalTool = {};

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.session.user.userName}-${Date.now()}-${file.originalname}`);
  },
});


const articleImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/articles"));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.session.user.userName}-${Date.now()}.jpg`);
  },
});


generalTool.uploadArticleImg = multer({
  storage: articleImgStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("invalid type!"), false);
    }
  },
});

generalTool.uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("invalid type!"), false);
    }
  },
});


module.exports = generalTool;