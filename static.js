const express = require('express');
const URL = require('../models/url');
const router = express.Router(); // ✅ use lowercase `router`

// 🏠 Home Page: Show all short URLs
router.get("/", async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allUrls,
    });
});

// 📝 Signup Page
router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
