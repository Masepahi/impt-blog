const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const generalTools = require("../tools/general-tools");
const User = require("../models/user");
const Article = require("../models/articles");
const Comment = require("../models/comment");

const router = express.Router();


router.post('/sendCm', async (req, res) => {
    try {
        
        const newComment = await new Comment ({
            text: req.body.commentBox,
            owner: req.session.user._id,
            article: req.body.articleId
        });

        await newComment.save();
        res.redirect(req.get('referer'));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: err.message })
    }
});



module.exports = router;
