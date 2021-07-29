const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

async function checkSet (groupId){
    const sqlText = "SELECT * FROM expansion WHERE id = $1";
    const response = await pool.query(sqlText, [groupId])
    if (response.rows.length > 0){
        return true;
    } else { 
        return false;
    }

}


async function updateSets (results, req, res){

    const insertText = "INSERT INTO expansion (id, name) VALUES ($1, $2)"

    if (results.length > 0){
        for(let i = 0; i < results.length; i++){
            const result = await checkSet(results[i].groupId);
            if (result === false){
                pool.query(insertText, [results[i].groupId, results[i].name])
                    .catch( error => {
                        console.log('error inserting set into database inside updateSets function', error);
                    })
            }
        }
    } 
}

function getSets(i, req, res){

    const version = process.env.version;
    const accessToken = process.env.accessToken;
    let totalSets = 0;
    
    axios.get(`https://api.tcgplayer.com/${version}/catalog/categories/1/groups?limit=100&offset=${100*i}`,{
        "headers": {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(response => {
        totalSets = response.data.totalItems;
        updateSets(response.data.results, req, res);
        if(100 * i < totalSets ){
            setTimeout(function(){
                getSets(i + 1, req, res);
            }, 3000)
        } else {
            res.sendStatus(200);
        }

    })
    .catch(error => {
        console.log('Error inside GET request in mtgSetUpdate', error);
        res.sendStatus(500);
    })
}

// Get list of MTG sets and update the database. 
router.get('/', async (req, res) => {

    // Call getSets function which will make the API call to get the current set list.
    getSets(0, req, res);
    
});

module.exports = router;
