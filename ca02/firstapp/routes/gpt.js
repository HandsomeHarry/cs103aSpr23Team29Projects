/*
  Zared Cohen
*/
const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/ToDoItem");
const User = require("../models/User");
const axios = require("axios");

const harryPrompt = "Enter a field that you would like to analyze: ";
const harryGPTPrompt = "Analyze the following field for me, include various points of view, future prospect and profitability: \n";

const zaredPrompt = "Enter something to translate to Python: ";
const zaredGPTPrompt = "Translate this to Python: \n";

const aaronPrompt = "Enter a city to find the weather: ";
const aaronGPTPrompt = "Check the weather for this city: \n";

isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

//require("dotenv").config();
//const apiKey = process.env.APIKEY;

class GPT {
  constructor() {
    //this.apiKey = apiKey;
    //this.modelEngine = "text-davinci-003";
    //this.apiUrl = "https://api.openai.com/v1/engines/" + this.modelEngine + "/completions";
  }

  async getResponse(prompt) {
    const response = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai', 
    {prompt: prompt});

    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  }
}

const gpt = new GPT();

router.get("/gpt", isLoggedIn, async (req, res, next) => {
  const prompt = req.query.prompt;
  if (prompt == "zared") {
    res.render("gpt", { prompt: zaredPrompt });
  } else if (prompt == "harry") {
    res.render("gpt", { prompt: harryGPTPrompt });
  } else if (prompt == "aaron") {
    res.render("gpt", { prompt: aaronPrompt });
  } else {
  }
  res.render("gpt", { prompt });
});

router.post("/gpt", isLoggedIn, async (req, res, next) => {
  const prompt = req.body.prompt;
  const input = req.body.input;
  response = undefined;
  console.log(prompt + " " + input);
  if (prompt == zaredPrompt) {
    response = await gpt.getResponse(zaredGPTPrompt + input);
  } else if (prompt == harryPrompt) {
    response = await gpt.getResponse(harryGPTPrompt + input);
  } else if (prompt == aaronPrompt) {
    response = await gpt.getResponse(aaronGPTPrompt + input);
  } else {
  }
  console.log(response)
  res.render("gpt", { prompt, input, response });
});

module.exports = router;
