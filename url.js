const express = require('express');
const { handleGenerateNewShortUrl, handlegetanalytics } = require('../controllers/url');
const URL = require('../models/url');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/analytics/:shortId', handlegetanalytics);

// NEW: Redirect route
router.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    return res.status(404).send('Not Found');
  }

  res.redirect(entry.redirectURL);
});

module.exports = router;
