/*
  Zared Cohen
*/
const express = require('express');
const router = express.Router();
const ToDoItem = require('../models/ToDoItem')
const User = require('../models/User')
const axios = require('axios');

const harryPrompt= ''
const harryGPTPrompt = ''

const zaredPrompt = 'Enter something to translate to Python: '
const zaredGPTPrompt = 'Translate this to Python: \n'


isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

require('dotenv').config();

const apiKey = process.env.APIKEY;

class GPT {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.modelEngine = 'text-davinci-003';
    this.apiUrl = 'https://api.openai.com/v1/engines/' + this.modelEngine + '/completions';
  }

  async getResponse(prompt) {
    const response = await axios.post(
      this.apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.8,
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].text;
  }
}

const gpt = new GPT(apiKey);

router.get('/gpt',
  isLoggedIn,
  async (req, res, next) => {
    const prompt = req.query.prompt;
    if (prompt == "zared") {
        res.render('gpt', { prompt: zaredPrompt })
    } else if (prompt == "harry") {
        res.render('gpt', { prompt: harryGPTPrompt })
    } else {

    }
    res.render('gpt', {prompt});
});

router.post('/gpt',
  isLoggedIn,
  async (req, res, next) => {
    const prompt = req.body.prompt;
    const input = req.body.input;
    console.log(prompt + " " + input)
    if (prompt == zaredPrompt) {
        const response = await gpt.getResponse(zaredGPTPrompt + input);
    } else if (prompt == harryPrompt) {
        const response = await gpt.getResponse(harryGPTPrompt + input);
    } else {

    }
    res.render('gpt', { prompt, input, response });
});

module.exports = router;