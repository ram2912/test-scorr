import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import DealScoringTable from 'src/pages/Products/PipelineManFr.js';
import { Configuration, OpenAIApi } from "openai";
import { FaPaperPlane } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';






const questions = [
    'What do you want to build today?', 
    'Do you want me too add the reason for the deal score?',
  ];



export default function Dealscoring() {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeals, setShowDeals] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false);
    

   
    function handleSave() {
      // add your save logic here
      setCurrentQuestion(questions[1]);
      setMessages(prevMessages => [...prevMessages, { message: questions[1], sender: 'bot' }]);
      console.log("Save button clicked");
      setShowPopup(false);
    }
console.log(currentQuestion);
  useEffect(() => {
  // Get references to the chat interface elements
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  

  //setMessages([{ message: currentQuestion, sender: 'bot' }]);

  // Add event listener to the message form
  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        setIsLoading(true);
       
        sendMessage(message, currentQuestion);
        event.target.elements.message.value = '';
    }
  });
  function receiveMessage(message) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'bot' }]);
  }
console.log(showNextStep);
  // Send user message to OpenAI API and receive response
  async function sendMessage(message,currentQuestion) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'user' }]);
    console.log(message);
    console.log(currentQuestion);
    setIsLoading(true);

    if (message.includes('Steps')) {
      // Show Next Step column
      setTimeout(() => {
        setShowNextStep(true);
        setIsLoading(false);
        window.postMessage({ showNextStep: true }, '*');
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

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API,
    });
    const openai = new OpenAIApi(configuration);
    
    const prompt1 = `pretend that you are a software developer developing revenue intelligence tools for your client is a RevOps professional. Your client's wants to build: ${message}. Give response "yes" or "no" if you feel the client wants to build a deal scoring tool for pipeline management(deal prioritisation, deal prediction etc.). \n\nA:`;
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: prompt1,
        max_tokens: 100,  
        temperature: 0.7,
      });
    const data = response.data;
    console.log(data)
    if (data.choices[0].text.trim()==='Yes') {
      // Show popup screen with pipeline management framework
      
      setTimeout(() => {
        setShowDeals(true);
        setIsLoading(false);
        receiveMessage("Do you want to see the Deal Scoring framework?", 'bot')
      }, 2000);
      return;
    }
  
  if (currentQuestion === questions[0]) {
    const prompt2 = `pretend that you are a software developer developing revenue intelligence tools for your client is a RevOps professional. You ask the question: ${currentQuestion}. Your client's response is: ${message}. Give responce "yes" or "no" if you feel the client wants to use Deal Scoring for specifc usecase of pipeline management. \n\nA:`;
    const response1 = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: prompt2,
        max_tokens: 100,  
        temperature: 0.7,
      });
    const data2 = response1.data;
    console.log(data2);
    //if (data2.choices[0].text.trim()==='Yes') {
        //receiveMessage("Got it! Based on your sales process, I have identified a framework for you to create scores. Do you want me to show you?", 'bot');
        //setIsLoading(false);
        
    //return;
    //} 
   
  } 
  const botMessage = data.choices[0].text.trim();
  console.log(botMessage)
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
    {!showDeals && ( 
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
  <img src="./White logo - no background.png" alt="Logo" style={{width: '25%', height: 'auto'}} />
</div>
)}

            
    {showDeals && (  
      <>
          <div
            style={{
              margin: '0 auto', // center horizontally    
              flex: 1,
              width: '60%',
              minHeight: '190px',
              borderRadius: '5px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'linear-gradient(to top, #000066 70%, #333399 100%)',
              marginTop: '10rem',
              boxSizing: 'border-box',
            }}
          >
            <iframe
             src={`./Scoring.html?showNextStep=true`}
              width="100%"
              height="400px"
              style={{
                border: 'none',
                overflow: 'hidden',
                borderRadius: '5px',
              }} 
            ></iframe>
          </div>
          
          </>
)}

          <div
              style={{
                position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: '0 auto',
    width: '80%',
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
  height: '180px',
  padding: '2rem',

  boxSizing: 'border-box',
  display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: '#151515',
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
            placeholder="What do you want to build?"
            style={{
              display: 'flex',
              flex: 1,
              padding: '8px 10px',
              borderRadius: '5px',
              height: '37px',
              border: 'none',
              fontSize: '16px',
            }}
          />
         <button
  type="submit"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  }}
>
  <FaPaperPlane
    size={16}
    style={{
      marginRight: '8px',
      color: '#CACACA',
      backgroundColor: 'transparent',
    }}
  />
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
          
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '10px' }}>
  <Link href="/" passHref>
    <span style={{ marginTop: '2rem', color: '#fff', cursor: 'pointer', fontFamily: 'sans-serif'}}>
      <FaArrowLeft size={16} style={{ marginRight: '8px' }} />
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
        backgroundColor: '#040506',
        zIndex: 9999, // set a high value for z-index
        // other styles...
      }}
    >
      <DealScoringTable onClose={() => setShowPopup(false)} onSave={handleSave}/>
    </div>
  </>
)}

    </>
  );
}

