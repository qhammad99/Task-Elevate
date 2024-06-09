const express = require('express');
const path = require('path');
const router = express.Router();

/**
 * GUI Route
 * we can use regex in path too,,
 * here that regex means
 * ^ start of strting, / match slash, $ end of string, | mean or
 * /index means index written after / and (.html) means .html at end is optional
 */
router.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;