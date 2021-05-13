const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('../tools/validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    validate: validator.isLength
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    validate: validator.isLength
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    unique: [true, "Username must be unique"],
    validate: validator.isLength
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: validator.isPasswordOk
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sex: {
    type: String,
    required: [true, "Sex is required"],
    enum: ["male", "Male", "Female", "female"],
  },
  mobile: {
    type: String,
    required: [true, "mobile is required"],
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: validator.isEmail
  },
  role: {
    type: String,
    enum: ["admin", "Admin", "Blogger","blogger"],
    default: "blogger",
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    minlength: 50,
    maxlength: 250
  }
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isNew || this.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});


UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
