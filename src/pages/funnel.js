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
import config from 'public/config.js';
import { env } from '../../next.config';
import { useRouter } from 'next/router';

const environment = env;
console.log(environment);



const { Handlefunnel } = require("../../public/funnelPromt")

const { handleDealScoring } = require("../../public/pipelinePromt");
 const authorizationStatusUrl = config.endpoints.authorizationStatusUrl;





const questions = [
    'What do you want to build today?', 
    'Do you want me to add the reason for the deal score?',
  ];



export default function Funnel() {
  const router = useRouter();
  console.log('Router',router);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeals, setShowDeals] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false);
    const [typing, setTyping] = useState(false);
    const [showDeploymentPopup, setShowDeploymentPopup] = useState(false);
    const [conversionRates, setConversionRates] = useState([]);
    const [selectedFunnel, setSelectedFunnel] = useState('');
    const [leadPipeline, setLeadPipeline] = useState('');
  const [bdrPipeline, setBdrPipeline] = useState('');
  const [salesPipeline, setSalesPipeline] = useState('');
  

    const handleConversionRatesUpdate = (rates) => { setConversionRates(rates) };

    const handleFunnelSelection = (funnelName) => {
        setSelectedFunnel(funnelName);
      };

    const handleLeadPipelineSelection = (pipelineName) => {
        setLeadPipeline(pipelineName);
      };

    const handleBdrPipelineSelection = (pipelineName) => {
        setBdrPipeline(pipelineName);
      };

    const handleSalesPipelineSelection = (pipelineName) => {
        setSalesPipeline(pipelineName);
      };

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

const checkAuthorizationStatus = async () => {
  try {
    const response = await fetch(authorizationStatusUrl, {
      credentials: 'include'
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Hubspot Connection', data.status);
      
    } else {
      console.log('Hubspot Connection',data.status); 
      
      //router.push('/login');// "unauthorized"
      
    }
  } catch (error) {
    console.log('Error checking authorization status:', error);
    
    //router.push('/login');
  }
};

  useEffect(() => {

    checkAuthorizationStatus();
    

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



  



}, []);

  return (
    <>
     <div style={{ display: 'flex'}}>
    <div style={{ flex: '2', position: 'relative' }}>
  <Sidebar onConversionRatesUpdate={handleConversionRatesUpdate} onFunnelSelection={handleFunnelSelection} onLeadPipelineSelection={handleLeadPipelineSelection} onBdrPipelineSelection={handleBdrPipelineSelection} onSalesPipelineSelection={handleSalesPipelineSelection} style={{ position: 'absolute', top: 0, left: 0,}} onPop={() => setShowPopup(true)}/> 
</div>
<div style={{ flex: '8' , display: 'flex', flexDirection: 'column',}}>

<div style={{ flex: '15%', display:'flex', flexDirection:'column', position: 'relative', marginLeft:'5%', marginBottom:'20px'}}>
  <div style={{ flex: '30%', display:'flex', position: 'relative', justifyContent:'center', margin:'auto'}}>
      
      </div>
      <div style={{ flex: '70%', display:'flex', position: 'relative', justifyContent:'center', paddingRight:'5%'}}>
<div style={{ flex: '1', display:'flex', position: 'relative',justifyContent:'center', margin:'auto',border:'1px solid grey',borderRadius:'8px',marginRight:'100px'}}>
      <h2 style={{ fontSize: '10px',color:'#eeeeee', fontFamily: 'inter, sans-serif',fontWeight:'300', padding:'10px',paddingBottom: '30px' }}>
        Lead Pipeline: <br /><span style={{ fontSize: '15px',color: 'white',letterSpacing: '0.5px'  }}>{leadPipeline}</span>
      </h2>
      </div>
      <div style={{ flex: '1', display:'flex', position: 'relative',justifyContent:'center', margin:'auto',border:'1px solid grey',borderRadius:'8px',marginRight:'100px'}}>
      <h2 style={{ fontSize: '10px',color:'#eeeeee', fontFamily: 'inter, sans-serif',fontWeight:'300', padding:'10px',paddingBottom: '30px' }}>
        BDR Pipeline: <br /> <span style={{ color: 'white',fontSize: '15px', letterSpacing: '0.5px'  }}>{bdrPipeline}</span>
      </h2>
      </div>
      <div style={{ flex: '1', display:'flex', position: 'relative',justifyContent:'center', margin:'auto', border:'1px solid grey', borderRadius:'8px'}}>
      <h2 style={{ fontSize: '10px',color:'#eeeeee', fontFamily: 'inter, sans-serif', fontWeight:'300',padding:'10px',paddingBottom: '30px' }}>
        Sales Pipeline: <br /> <span style={{ color: 'white',fontSize: '15px',letterSpacing: '0.5px'  }}>{salesPipeline}</span>
      </h2>
      </div>
      </div>
      </div>
      
      <div style={{ flex: '65%',border: '1px solid #3B3B3B',borderRadius: '10px', position: 'relative', backgroundColor: '#010102', height: '100vh', paddingTop: '30px', overflow: 'hidden', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)', marginLeft: '5%', marginRight:'5%'}}>

      <>
        <div style={{
       
    margin: '0 auto',
    marginLeft: '5%',
    width: '90%',
    height: '100%',
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent',
  paddingTop: '1rem',
  boxSizing: 'border-box', }}>
            <ConversionRatesPage conversionRates={conversionRates} />
        </div>
        

         </>
            </div>
            <div style={{ flex: '20%', position: 'relative'}}>

          <div
              style={{
    
    bottom: '1rem',
    
   
    margin: '0 auto',
    
    width: '90%',
    
    minHeight: '170px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent',
    paddingTop: '2rem',
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
    backgroundColor: 'black',
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
              backgroundColor:'black',
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
        backdropFilter: 'blur(10px)',
        zIndex: 9998, // set a lower value than popup
      }}
    ></div>
    <div
      className="popup"
      style={{
        position: 'fixed',
        top: '50%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        maxHeight: '80%',
        overflow: 'auto',
        margin: '0 auto',
        marginLeft: '20rem',
        padding: '2rem',
        borderRadius: '5px',
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
</div>
</div>
    </>
  );
}

