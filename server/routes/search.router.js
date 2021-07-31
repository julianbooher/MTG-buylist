const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

async function getCardDetails(cardList){

    const requestText = `http://api.tcgplayer.com/${version}/pricing/product/`

    // Append the cardList id's onto the end of the request
    for (let i = 0; i < cardList.length; i++){
        requestText += `${cardList[i]},`
    }

    // API request to tcgplayer for details about these particular cards.
    axios.post(requestText, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })
    .catch( error => {
        console.log('error inside getCardDetails function', error);
    })
};

async function getCardSet(setId){

};

async function getCardPrices(cardList){

}


// Get list of search results from API call.
router.get('/:searchPage/:searchValue', (req, res) => {

    const version = process.env.version;
    const accessToken = process.env.accessToken;

    console.log('inside search router, params', req.params)

    const searchData = {
        "sort": "name",
        "limit": 10,
        "offset": req.params.searchPage - 1,
        "filters": [
            { "name": "ProductName", "values": [ req.params.searchValue ] }
        ]    
    };
    
    axios.post(`https://api.tcgplayer.com/${version}/catalog/categories/1/search`, searchData, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })
    .then( response => {
        res.send(response.data);
    })
    .catch( error => {
        console.log('Error inside POST request in search', error);
        res.sendStatus(500);
    })
    
});

module.exports = router;