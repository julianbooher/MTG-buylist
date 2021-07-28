const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


function updateSets (results, req, res){

    const insertText = "INSERT INTO expansion (id, name) VALUES ($1, $2)"

    if (results.length > 0){
        for(let i = 0; i < results.length; i++){
            pool.query(insertText, [results[i].groupId, results[i].name])
                .catch( error => {
                    console.log('error inserting set into database inside updateSets function', error);
                })
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(200);
    }
}

function getSets(i, req, res){

    const version = process.env.version;
    const accessToken = process.env.accessToken;
    
    axios.get(`https://api.tcgplayer.com/${version}/catalog/categories/1/groups?limit=100&offset=${100*i}`,{
        "headers": {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(response => {
        updateSets(response.data.results, req, res);
        
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
    console.log('inside mtgSetUpdate router');
    getSets(0, req, res);

    
});

module.exports = router;
