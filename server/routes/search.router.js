const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


// Get list of search results from API call.
router.get('/', async (req, res) => {

    const version = process.env.version;
    const accessToken = process.env.accessToken;

    const searchData = 
    {
        "sort": "name",
        "limit": 10,
        "offset": req.params.searchPage - 1,
        "filters": [
            { "name": "ProductName", "values": [ req.params.searchValue ] }
        ]    
    }
    
    axios.post(`https://api.tcgplayer.com/${version}/catalog/categories/1/search`, searchData, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })

    console.log('inside search router');    
    
});

module.exports = router;