import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import transcriptionstyles from '@/styles/Transcription.module.css';
import { Configuration, OpenAI } from "openai";

const questions = [
    'Which CRM do you want me to integrate?',
    'Do you want a manual framework for scoring or should I automate it? ',
    'Do you want me add best practices and next steps to this as well? ',
  ];


export default function Dealscoring() {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  // Get references to the chat interface elements
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  

  setMessages([{ message: currentQuestion, sender: 'bot' }]);

  // Add event listener to the message form
  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
      sendMessage(message);
      messageInput.value = '';
    }
  });
  function receiveMessage(message) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'bot' }]);
  }

  // Send user message to OpenAI API and receive response
  async function sendMessage(message) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'user' }]);
    

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    const prompt1 = `pretend that you are a software developer developing a deal scoring framework. As a usual process, first you request the user to sign in by providing the link. But you only provide the link when you get a name of the CRM from the user. You want to get the best possible answer to the questions: ${currentQuestion}. The customer said: ${message}. Ask 1 follow up question to thid questions in order till you get satisfactory answers to the questions. For the question: Which CRM do you want me to intergrate?, as soon as you get a name for the CRM, you send the user an authentication link.`;
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: prompt1,
        max_tokens: 100,
        temperature: 0.7,
      });
    const data = response.data;
    console.log(data)
  if (data.choices.length === 0) {
    receiveMessage("Sorry, I didn't understand that.");
    return;
  }
  const botMessage = data.choices[0].text.trim();
  receiveMessage(botMessage, 'bot');
}

  // Add bot message to the chat interface
  function receiveMessage(message, sender) {
    const newMessage = { message, sender };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }
  
}, []);

  return (
    <>
    
            
            <div
              style={{
                margin: '0 auto', // center horizontally    
    flex: 1,
    marginRight: '2rem',
    marginBottom: '1rem',
    minHeight: '200px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'linear-gradient(to top, #000066 70%, #333399 100%)',
    padding: '2rem',
    boxSizing: 'border-box',
              }}
            >
      <div
            style={{margin: '0 auto',
                position: 'relative',
  width: '50%',
  height: '350px',
  padding: '2rem',
  marginBottom: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: '#36486b',
    borderRadius: '10px',
    overflow: 'auto', 
        }}
        id="chatcontainer"
      >
          
          {messages.slice(0).reverse().map((message, index) => (
  <div
    key={index}
    className={`message ${message.sender === 'bot' ? 'received' : 'sent'}`} id="messages" style={{ width: '100%' }}
  >
            <div className={styles.avatar} id="avatar"></div>
            <div className={message.sender === 'bot' ? styles.text : `${styles.sentText}`} id="message received">{message.message}</div>
  </div>
  ))}
          </div>
        <form
          style={{ display: 'flex',
          width: '50%',
          margin: '0 auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
          padding: '10px',
          borderTop: '1px solid #ddd',
        }}
        id="message-form"
        onSubmit={event => {
          event.preventDefault();
          const message = event.target.elements.message.value.trim();
          if (message !== '') {
            sendMessage(message);
            event.target.elements.message.value = '';
          }
        }}
        >
          <input
            type="text"
            id="message-input"
            name="message"
            placeholder="Type your message..."
            style={{
              display: 'flex',
              flex: 1,
              marginRight: '10px',
              padding: '8px 10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
            }}
          />
          <button
            type="submit"
            style={{
                padding: '8px 16px',
                borderRadius: '5px',
                backgroundColor: '#1e7145',
                color: '#fff',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
            </form>
          </div>
        
          <div
            style={{
                position: 'absolute',
                bottom: '100px',
                width: '100%',
                height: '400px',
                left: 0,
                backgroundColor: 'linear-gradient(to top, #000066 70%, #333399 100%)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                paddingLeft: '100px',
                paddingRight: '100px',
                boxSizing: 'border-box',
                borderRadius: '10px',
            }}
          >
            <iframe

              src="/Scoring.html"
              width="100%"
              height="500px"
              style={{
                border: 'none',
                overflow: 'hidden',
                borderRadius: '5px',
              }}
            ></iframe>
          </div>
          
        
          <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '10px',
            }}
          >
            <Link href="/" passHref>
    <span style={{ marginTop: '2rem', color: '#fff', cursor: 'pointer', fontFamily: 'sans-serif'}}>
      Back to home
    </span>
  </Link>
          </div>
        </>
      );
    }  

