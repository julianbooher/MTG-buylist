const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const {getSearchResults, getCardDetails, getCardPrices} = require('./routerFunctions');

// Get list of search results from API call.
router.get('/:searchPage/:searchValue', async (req, res) => {

    const results = await getSearchResults(req, res);
    if(results.data.results.length){
        const detailedResults = await getCardDetails(results.data.results);
        const financialResults = await getCardPrices(detailedResults);
        res.send(financialResults);
    } else {
        res.send(false);
    }
});

module.exports = router;