import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import DealScoringTable from 'src/pages/Products/PipelineManFr.js';
import { Configuration, OpenAIApi } from "openai";
import { FaPaperPlane } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import DeploymentPopup from 'src/pages/Products/DeploymentPopup.js';
import PipelineForm from './Products/funnelTable';
import Sidebar from './Products/sidebar'
import ConversionRatesPage from 'public/ConversionRatesPage.js';


const { Handlefunnel } = require("../../public/funnelPromt")


const { handleDealScoring } = require("../../public/pipelinePromt");






const questions = [
    'What do you want to build today?', 
    'Do you want me to add the reason for the deal score?',
  ];



export default function Funnel() {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeals, setShowDeals] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false);
    const [typing, setTyping] = useState(false);
    const [showDeploymentPopup, setShowDeploymentPopup] = useState(false);
    const [conversionRates, setConversionRates] = useState([]);

    const handleConversionRatesUpdate = (rates) => { setConversionRates(rates) };


   
    function handleSave() {
      // add your save logic here
      setCurrentQuestion(questions[1]);
      setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { message: questions[1], sender: 'bot' }]);
      setIsLoading(false);
    }, 2000);
      console.log("Save button clicked");
      setShowPopup(false);
    }
console.log(currentQuestion);
  useEffect(() => {

    fetch('https://backend.scorr-app.eu/deals', {
        credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });

        function handleClose() {
            // add your save logic here
            setCurrentQuestion(questions[1]);
            setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { message: questions[1], sender: 'bot' }]);
            setIsLoading(false);
          }, 2000);
            console.log("Save button clicked");
            setShowPopup(false);
          }
        
        function handlePopup() {
            // add your save logic here
            
            setTimeout(() => {
            setIsLoading(false);
          }, 2000);
            console.log("Save button clicked");
            setShowPopup(true);
          }


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
  async function sendMessage(message, currentQuestion) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'user' }]);
    console.log(message);
    console.log(currentQuestion);

    // Call handleDealScoring after sending the message
    await Handlefunnel(message, setIsLoading, setShowDeals, receiveMessage,showNextStep,setShowNextStep,setShowPopup)
  }

  // Add bot message to the chat interface
  function receiveMessage(message, sender) {
    setMessages(prevMessages => [...prevMessages, { message, sender }]);
  }

  // Rest of your code...

}, []);

  return (
    <>
     
    <div style={{ position: 'relative' }}>
  <Sidebar onConversionRatesUpdate={handleConversionRatesUpdate} style={{ position: 'absolute', top: 0, left: 0, width: '250px' }} onPop={() => setShowPopup(true)}/> 
</div>

      


          <div
              style={{
                position: 'fixed',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: '0 auto',
    marginLeft: '8rem',
    width: '80%',
    flex: 1,
    minHeight: '170px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent',
    paddingTop: '6rem',
    boxSizing: 'border-box',
              }}
            >
      <div
            style={{margin: '0 auto',
                position: 'relative',
  width: '50%',
  height: '80px',
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
    className={`message ${message.sender === 'bot' ? 'received' : 'sent'} ${
      message.typing && message.sender === 'bot' ? 'typing' : '' 
    }`} id="messages" style={{ width: '100%' }}
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
          marginTop: '0.5rem',
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
            placeholder="Tell me what you want to build..."
            autocomplete="off"
            style={{
              display: 'flex',
              color: '#fff',
              backgroundColor:'#151515',
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

<div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '10px' }}>
  <button style={{ backgroundColor: '#255690', color: 'white', fontFamily: 'sans-serif', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '20px', transition: 'background-color 0.3s' }} class="button" onMouseOver={(e) => e.target.style.backgroundColor = '#1C416F'} onMouseOut={(e) => e.target.style.backgroundColor = '#255690'} onClick={() => setShowDeploymentPopup(true)}>
    <FaCloudUploadAlt style={{ marginRight: '10px' }} />
    Deploy
  </button>
  <button style={{ backgroundColor: '#255690', color: 'white', fontFamily: 'sans-serif', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '20px', transition: 'background-color 0.3s' }} class="button" onMouseOver={(e) => e.target.style.backgroundColor = '#1C416F'} onMouseOut={(e) => e.target.style.backgroundColor = '#255690'}>
    <FaSave style={{ marginRight: '10px' }} />
    Save project
  </button>
</div>
          
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '10px' }}>
  <Link href="/" passHref>
    <span style={{ marginLeft: '13rem', marginTop: '2rem', color: '#fff', cursor: 'pointer', fontFamily: 'sans-serif'}}>
      <FaArrowLeft size={16} style={{ marginRight: '8px' }} />
      Back to home
    </span>
  </Link>
</div>

<div style={{ position: 'absolute', top: '5rem', left: '15rem', padding: '10px', color: '#fff', fontFamily: 'sans-serif' }}>
        
          <h1 style={{fontSize: 'x-large'}}>Selected Funnel</h1>
        
      </div>

      <>
        <div style={{ position: 'fixed',
  bottom: '1rem',
  left: '50%',
    transform: 'translateX(-50%)',
    margin: '0 auto',
    marginLeft: '26rem',
    marginTop: '20rem',
    width: '100%',
  minHeight: '700px',
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent',
  paddingTop: '1rem',
  boxSizing: 'border-box', }}>
            <ConversionRatesPage conversionRates={conversionRates} />
        </div>

         </>


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
        backdropFilter: 'blur(10px)',
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
        marginLeft: '20rem',
        padding: '2rem',
        borderRadius: '5px',
        backgroundColor: '#040506',
        zIndex: 9999, // set a high value for z-index
        // other styles...
      }}
    >
      <PipelineForm onClose={() => setShowPopup(false)} onSave={handleSave}/>
    </div>
  </>
)}
{showDeploymentPopup && (
  <>
 

     <DeploymentPopup onClose={() => setShowDeploymentPopup(false)} />
     
</>
)}

    </>
  );
}

