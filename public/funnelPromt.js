import React, { useState } from "react";

export async function Handlefunnel(message, setIsLoading, setShowDeals, receiveMessage,showNextStep,setShowNextStep,setShowPopup) {
  const { Configuration, OpenAIApi } = require("openai");
    if (message.includes('yes and also add the next steps column')) {
        // Show Next Step column
        setTimeout(() => {
          setShowNextStep(true);
          setIsLoading(false);
       
          
        }, 2000);
        return;
      }
      console.log(showNextStep);
      if (message.includes('yes')) {
        // Show popup screen with pipeline management framework
        
        setTimeout(() => {
          setShowPopup(true);
          setIsLoading(false);
        
        }, 2000);
        return;
      }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
  });
  const openai = new OpenAIApi(configuration);

  const prompt1 = `pretend that you are a software developer developing revenue intelligence tools for your client is a RevOps professional. Your client wants to build: ${message}. Give response "yes" ONLY if you feel the client wants to build a stage conversion rate funnel for its sales process. Otherwise, give the response "No". Be very sure.\n\nA:`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt1,
    max_tokens: 100,
    temperature: 0.7,
  });
  const data = response.data;
  console.log(data);

  if (data.choices[0].text.trim() === "Yes") {
    // Show popup screen with pipeline management framework
    setTimeout(() => {
      setShowPopup(true);
      setIsLoading(false);
      
    }, 2000);
  } else {
    receiveMessage("Sorry, I do not understand your request. I currently offer deal scoring for pipeline management.", "bot");
  }
  const botMessage = data.choices[0].text.trim();h
  console.log(botMessage);

  setIsLoading(false);
  
}
