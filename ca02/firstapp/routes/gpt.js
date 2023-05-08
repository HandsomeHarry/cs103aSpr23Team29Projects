/*
  Zared Cohen
*/
const express = require("express");
const router = express.Router();
const ToDoItem = require("../models/ToDoItem");
const User = require("../models/User");
const axios = require("axios");

const harryPrompt = "Enter a field that you would like to analyze: ";
const harryGPTPrompt =
  "Analyze the following field for me, include various points of view, future prospect and profitability: \n";

const zaredPrompt = "Enter something to translate to Python: ";
const zaredGPTPrompt = "Translate this to Python: \n";

const aaronPrompt = "Enter a topic that you want to learn about its history: ";
const aaronGPTPrompt = "Introduce the history of this: \n";

const denisePrompt = "Enter the city you would like to visit:";
const deniseGPTPrompt = "Find tourist destinations in this city: \n";

const jakePrompt = "Enter the country you want to know about economically:  "
const jakeGPTPrompt = "List out GDP, GSP, Employment rate and labor force participation rate, per capita income, consumer spending and business climate ranking of the country: \n";

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
    const response = await axios.post(
      "http://gracehopper.cs-i.brandeis.edu:3500/openai",
      { prompt: prompt }
    );

    return response.data.choices[0].message.content;
  }
}

const gpt = new GPT();

router.get("/gpt", isLoggedIn, async (req, res, next) => {
  const prompt = req.query.prompt;
  if (prompt == "zared") {
    res.render("gpt", { prompt: zaredPrompt });
  } else if (prompt == "harry") {
    res.render("gpt", { prompt: harryPrompt });
  } else if (prompt == "aaron") {
    res.render("gpt", { prompt: aaronPrompt });
  } else if (prompt == "denise") {
    res.render("gpt", { prompt: denisePrompt });
  } else if (prompt == "jake") {
    res.render("gpt", { prompt: jakePrompt });
  }else {
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
  } else if (prompt == denisePrompt) {
    response = await gpt.getResponse(deniseGPTPrompt + input);
  } else if (prompt == jakePrompt) {
    response = await gpt.getResponse(jakeGPTPrompt + input);
  } else {
  }
  res.render("gpt", { prompt, input, response });
});

module.exports = router;
