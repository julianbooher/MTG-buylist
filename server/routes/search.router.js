const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Global variables from .env;
const version = process.env.version;
const accessToken = process.env.accessToken;

async function apiRequest(req, res){

    console.log('inside search router, params', req.params)

    const searchData = {
        "sort": "name",
        "limit": 10,
        "offset": req.params.searchPage - 1,
        "filters": [
            { "name": "ProductName", "values": [ req.params.searchValue ] }
        ]    
    };
    
    await axios.post(`https://api.tcgplayer.com/${version}/catalog/categories/1/search`, searchData, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })
    .then( response => {
        getCardDetails(response.data.results);
    })
    .catch( error => {
        console.log('Error inside POST request in search', error);
        res.sendStatus(500);
    })


}

async function getCardDetails(cardList){

    let requestText = `http://api.tcgplayer.com/${version}/catalog/products/`;

    // Append the cardList id's onto the end of the request
    for (let i = 0; i < cardList.length; i++){
        requestText += `${cardList[i]},`
    };

    // API request to tcgplayer for details about these particular cards.
    const response = await axios.get(requestText, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })
    .catch( error => {
        console.log('error inside getCardDetails function', error);
    })

    console.log(response.data.results);
};

async function getCardSet(setId){

};

async function getCardPrices(cardList){

}


// Get list of search results from API call.
router.get('/:searchPage/:searchValue', async (req, res) => {

    await apiRequest(req, res);

    res.sendStatus(200);
    
    
});

module.exports = router;