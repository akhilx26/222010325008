const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls) {
      return res.status(400).json({ error: 'No URLs provided in query parameters' });
    }

    const results = await Promise.all(urls.map(async url => {
      try {
        const response = await axios.get(url);
        return { url, data: response.data };
      } catch (error) {
        return { url, error: error.message };
      }
    }));

    res.json(results);
  } catch (error) {
    console.error('Error processing /numbers request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;