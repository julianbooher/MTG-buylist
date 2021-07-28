const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


function updateSets(i, req, res){

    const version = process.env.version;
    const accessToken = process.env.accessToken;
    
    axios.get(`https://api.tcgplayer.com/${version}/catalog/categories/1/groups?limit=1000&offset=${100*i}`,{
        "headers": {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(response => {
        console.log(response.data.results.length);
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('Error inside GET request in mtgSetUpdate', error);
        res.sendStatus(500);
    })
}

// Get list of MTG sets and update the database. 
router.get('/', (req, res) => {

    // Environment variables for the API request.
    const insertText = "INSERT INTO expansion (id, name) VALUES ($1, $2)"
    console.log('inside mtgSetUpdate router');
    updateSets(0, req, res);

    
});

module.exports = router;
