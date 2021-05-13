const express = require("express");
const User = require("../models/user");
const auth = require("./auth");
const home = require("./home");
const user = require("./user");
const article = require("./article");
const comments = require("./comment");



const router = express.Router();

router.use("/auth", auth);
router.use("/", home);
router.use("/user", user);
router.use("/article", article);
router.use("/comment", comments);


router.get("/logout", async (req, res) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            } else {
                req.session = null;

                return res.redirect('/');
            }
        });
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
});


module.exports = router;
