const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Get list of MTG sets and update the database. 
router.get('/', (req, res) => {

    // Environment variables for the API request.
    const version = process.env.version;
    const accessToken = process.env.accessToken;
    const publicId = process.env.publicId;
    const privateId = process.env.privateId;
    console.log('inside mtgSetUpdate router');

    const sqlText = `INSERT INTO set (id, name) VALUES ($1, $2)`;
    axios.get(`https://api.tcgplayer.com/${version}/catalog/categories/1/groups?limit=1000`,{
        "headers": {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(response => {
        console.log(response);
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('Error inside GET request in mtgSetUpdate', error);
        res.sendStatus(500);
    })
    
});

module.exports = router;