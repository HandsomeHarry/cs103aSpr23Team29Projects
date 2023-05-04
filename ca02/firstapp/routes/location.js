/* Denise Zhong
  location.js -- Router accessing APIs
  express server getting information using an APIs.
  Ziptastic APIT is an API that returns the Country, 
  State, and city of a zipcode
*/
const express = require('express');
const router = express.Router();
const ToDoItem = require('../models/ToDoItem')
const axios = require('axios')

router.get('/location', (req,res,next) => {
    res.render('location')
})

// returns a Country, State, and City 
//Give a zipcode
const get_location = async (zipcode) => {
    zipcode = encodeURI(zipcode);
    let url="https://ziptasticapi.com/"+
            "?location="+zipcode+
            "&benchmark=2020"+
            "&format=json"
    let response = await axios.get(url)
    return response.data.location
}

router.post('/location.json',
  async (req,res,next) => {
    const location = await get_location(req.body.zipcode)
    res.json(location)
  }
)

router.post('/location',
  async (req,res,next) => {
    console.log('retreiving location info')
    res.body.location = await get_weather(req.body.zipcode)
    res.render('LocationInfo')
}
)

  module.exports = router;
