import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { Configuration, OpenAI } from "openai";
import DealScoringTable from './PipelineManFr';


const questions = [
    'Hi! Why do you want to implement Deal Scoring? For forecasting, pipeline management, or something else? ', ,
    'Do you want me add best practices and next steps to this as well? ',
  ];


export default function Dealscoring() {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  

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
        setIsLoading(true);
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
    console.log(message);
    
    setIsLoading(true);


    
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    const prompt1 = `pretend that you are a software developer developing revenue intelligence tools for your client is a RevOps professional. You want to have the best possible answer, under 40 words, to the question: ${currentQuestion}. Your client's response is: ${message}. Understand what the client said and answer the questions,always end the answer by asking ${currentQuestion}. Make the last line a natural continuation of the answer, remove 'Hi' from it and create an urgency. \n\nA:`;
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
  if (message.includes('yes')) {
    // Show popup screen with pipeline management framework
    setShowPopup(true);
    setIsLoading(false);
    return;
    }
  if (currentQuestion === questions[0]) {
    if (message.includes('pipeline management')) {
        receiveMessage("Got it! Based on your sales process, I have identified a framework for you to create scores. Do you want me to show you?", 'bot');
        setIsLoading(false);
        setCurrentQuestion(questions[1]);
    return;
    } 
  } 
  const botMessage = data.choices[0].text.trim();
  receiveMessage(botMessage, 'bot');
  setIsLoading(false);
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
    minHeight: '170px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'linear-gradient(to top, #000066 70%, #333399 100%)',
    paddingTop: '6rem',
    boxSizing: 'border-box',
              }}
            >
      <div
            style={{margin: '0 auto',
                position: 'relative',
  width: '50%',
  height: '290px',
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
          height: '60px',
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
          {isLoading && (
        <div className={styles.loadingAnimation}>
          <div className={styles.loadingDots}>
            <span className={styles.loadingDot}></span>
            <span className={styles.loadingDot}></span>
            <span className={styles.loadingDot}></span>
          </div>
        </div>
      )}
          <div
            style={{
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                height: '340px',
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
              height="300px"
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
          {showPopup && (
  <>
    <div
      className="backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998, // set a lower value than popup
      }}
    ></div>
    <div
      className="popup"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        maxHeight: '80%',
        overflow: 'auto',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '5px',
        backgroundColor: '#fff',
        zIndex: 9999, // set a high value for z-index
        // other styles...
      }}
    >
      <DealScoringTable />
    </div>
  </>
)}

    </>
  );
}

