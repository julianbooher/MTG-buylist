const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
require('dotenv').config();

// Global variables from .env;
const version = process.env.version;
const accessToken = process.env.accessToken;

async function getSearchResults(req, res){

    
    const searchData = {
        "sort": "name",
        "limit": 10,
        "offset": req.params.searchPage - 1,
        // RequiredTypeCb was added to filters because if that didn't exist, we were getting products as results (e.g. boosters, starters).
        "filters": [
            { "name": "ProductName", "values": [ req.params.searchValue ] },
            { "name": "RequiredTypeCb", "values": [
                "Artifact", "Creature", "Enchantment", "Instant", "Land", "Legendary", "Planeswalker", "Sorcery"
            ]}
        ]    
    };

    const headers = {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    };
    

    try {
        const results = await axios.post(`https://api.tcgplayer.com/${version}/catalog/categories/1/search`, searchData, headers)
        return results;
    } catch (error) {
        console.log('error in axios result in apiRequest function', error);
    }
    


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

    // Loop through results and append the plaintext card set to the object.
    for (let i = 0; i < response.data.results.length; i++){
        const cardSet =  await getCardSet(response.data.results[i].groupId);
        response.data.results[i].setName = cardSet;
    }

    return response.data.results;
};

async function getCardSet(setId){

    // Queries the local DB of card sets to get the name of the set.
    // Doing this from the API would be incredibly taxing on the # of calls and speed.

    const sqlText = "SELECT * FROM expansion WHERE id = $1";
    const response = await pool.query(sqlText, [setId])
    return response.rows[0].name
};

async function getCardPrices(cardList){

    
    let requestText = `https://api.tcgplayer.com/${version}/pricing/product/`

    // Append the IDs to the request text for the API call.
    for (let i = 0; i < cardList.length; i++){
        requestText += `${cardList[i].productId},`
    }


    // API request to tcgplayer for prices about these particular cards.
    const response = await axios.get(requestText, {
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })
    .catch( error => {
        console.log('error inside getCardPrices function', error);
    })

    const { results } = response.data

    // Loop over the results of the search for card prices, append those prices to the appropriate objects in cardList array.
    for (let i = 0; i < results.length; i++){

        // Using the productId's this finds the correct index in cardList where we'll append the price.
        let arrayIndex = cardList.findIndex(j => j.productId === results[i].productId);

        // Check to see if the price is for foil or regular, append the appropriate key:value.
        if (results[i].subTypeName === 'Foil'){
            cardList[arrayIndex].foilMarketPrice = results[i].marketPrice;
            cardList[arrayIndex].foilLowPrice = results[i].lowPrice;
        } else { 
            cardList[arrayIndex].marketPrice = results[i].marketPrice;
            cardList[arrayIndex].lowPrice = results[i].lowPrice;
        }
    }

    return cardList;
}

module.exports = {getSearchResults, getCardDetails, getCardSet, getCardPrices}