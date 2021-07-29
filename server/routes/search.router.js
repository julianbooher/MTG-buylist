const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


// Get list of search results from API call.
router.get('/', async (req, res) => {

    console.log('inside search router');    
    
});

module.exports = router;