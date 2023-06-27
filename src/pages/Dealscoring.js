import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import DealScoringTable from 'src/pages/Products/PipelineManFr.js';
import { Configuration, OpenAIApi } from "openai";
import { FaPaperPlane } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import DeploymentPopup from 'src/pages/Products/DeploymentPopup.js';
import DealScoringSB from 'src/Components/DealscoringSB.js';
import BlankScreen from '@/Components/blankscreen';


const { Handledealscoring } = require("public/pipelinePromt.js");


const questions = [
    'What do you want to build today?', 
    'Do you want me to add the reason for the deal score?',
  ];



export default function Dealscoring() {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeals, setShowDeals] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false);
    const [typing, setTyping] = useState(false);
    const [showDeploymentPopup, setShowDeploymentPopup] = useState(false);
    const [suggestions, setSuggestions] = useState(true);
    const [chatInput, setChatInput] = useState('');


   
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
  // Get references to the chat interface elements
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  

  //setMessages([{ message: currentQuestion, sender: 'bot' }]);

  // Add event listener to the message form
  messageForm.addEventListener('submit', event => {
    setSuggestions(false);
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
    await Handledealscoring(message, setIsLoading, setShowDeals, receiveMessage,showNextStep,setShowNextStep,setShowPopup);
    document.getElementById('message-input').value = '';
  }

  // Add bot message to the chat interface
  function receiveMessage(message, sender) {
    setMessages(prevMessages => [...prevMessages, { message, sender }]);
  }

  const handleBlankScreenLinkClick = (prompt) => {
    setChatInput(prompt);
  };


  

  // Rest of your code...

}, []);

  return (
<>
     <div style={{ display: 'flex'}}>
    <div style={{ flex: '2', position: 'relative' }}>
  <DealScoringSB  style={{ position: 'absolute', top: 0, left: 0,}} onPop={() => setShowPopup(true)}/> 
</div>
<div style={{ flex: '8' , display: 'flex', flexDirection: 'column',}}>

<div style={{ flex: '10%', position: 'relative', marginLeft:'5%'}}>
      

        

        
      
      </div>
      
      <div style={{ flex: '65%',borderRadius: '10px', position: 'relative', backgroundColor: 'transparent', height: '100vh', paddingTop: '20px', overflow: 'hidden',  marginLeft: '5%', marginRight:'5%'}}>

      <>
      {suggestions && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%' }}>
        <BlankScreen setChatInput={setChatInput} />
        </div>
      )}

      {!suggestions && (
        <div style={{
       
    margin: '0 auto',
    marginLeft: '5%',
    width: '90%',
    height: '80%',
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'transparent',
  paddingTop: '1rem',
  boxSizing: 'border-box', }}>
    {showDeals && (  
      <>
          <div
  style={{
    margin: '0 auto',
    flex: 1,
    width: '90%',
    minHeight: '250px',
    borderRadius: '5px',
    overflowY: 'auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    boxSizing: 'border-box',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #E5E5E5', border:'none' }}>
    <h2 style={{ fontWeight: '400', fontFamily: 'inter, sans-serif', fontSize:'medium',color: 'white' }}>Deals Preview</h2>
    </div>
  <table style={{borderCollapse: 'collapse', width: '100%', borderRadius: '5px',backgroundColor: '#FFFFFF',}}>
    <thead style={{ fontFamily: 'sans-serif',
    color: 'white'}}>
      <tr>
        <th style={{textAlign: 'left', padding: '1rem', color: '#fff', fontSize: '14px', backgroundColor: '#3F3F3F'}}>Opportunity name</th>
        <th style={{textAlign: 'left', padding: '1rem', color: '#fff', fontSize: '14px', backgroundColor: '#3F3F3F'}}>Opportunity owner</th>
        <th style={{textAlign: 'left', padding: '1rem', color: '#fff', fontSize: '14px', backgroundColor: '#3F3F3F'}}>Stage</th>
        <th style={{textAlign: 'left', padding: '1rem', color: '#fff', fontSize: '14px', backgroundColor: '#3F3F3F'}}>Deal Score</th>
        {showNextStep && (
          <>
        <th className="reason hidden" style={{textAlign: 'left', padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5',backgroundColor: '#3F3F3F'}}>Reason</th>
        
        <th className="next-steps hidden" style={{textAlign: 'left', padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5',backgroundColor: '#3F3F3F'}}>Next steps</th>
        </>
        )}
      </tr>
    </thead>
    <tbody style={{ fontFamily: 'sans-serif',
    color: 'black'}}>
      <tr>
        <td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Kafene</td>
        <td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Roman Murov</td>
        <td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Demo</td>
        <td className="deal-score" style={{padding: '1rem', fontSize: '20px', borderBottom: '1px solid #E5E5E5', color: '#22B14C', fontWeight: 'bold'}}>75</td>
        {showNextStep && (
          <>
        <td className="reason hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Need for product</td>
        <td className="next-steps hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Follow up with client</td>
        </>
        )}
      </tr>
      <tr>
        <td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>OnsiteIQ</td>
        <td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Roman Murov</td>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Pricing</td>
<td className="deal-score" style={{padding: '1rem', fontSize: '20px', borderBottom: '1px solid #E5E5E5', color: '#22B14C', fontWeight: 'bold'}}>60</td>
{showNextStep && (
          <>
<td className="reason hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>CFO not involved</td>

<td className="next-steps hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Send follow-up with updated pricing</td>
</>
        )}
</tr>
<tr>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>DoControl</td>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Shriram Pawar</td>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Discovery</td>
<td className="deal-score" style={{padding: '1rem', fontSize: '20px', borderBottom: '1px solid #E5E5E5', color: '#22B14C', fontWeight: 'bold'}}>90</td>
{showNextStep && (
          <>
<td className="reason hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Urgent need for product</td>

<td className="next-steps hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Schedule demo next week</td>
</>
)}
</tr>
<tr>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>myoncare</td>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Roman Murov</td>
<td style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Pricing</td>
<td className="deal-score" style={{padding: '1rem', fontSize: '20px', borderBottom: '1px solid #E5E5E5', color: '#22B14C', fontWeight: 'bold'}}>95</td>
{showNextStep && (
          <>
<td className="reason hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>High budget</td>

<td className="next-steps hidden" style={{padding: '1rem', fontSize: '14px', borderBottom: '1px solid #E5E5E5'}}>Meeting with CEO</td>
</>
)}
</tr>
<tr>
<td style={{padding: '1rem', fontSize: '14px'}}>Virtucon Industries</td>
<td style={{padding: '1rem', fontSize: '14px'}}>Roman Murov</td>
<td style={{padding:'1rem', fontSize: '14px'}}>Negotiation</td>

<td className="deal-score" style={{padding: '1rem', fontSize: '20px', color: '#22B14C', fontWeight: 'bold'}}>85</td>
{showNextStep && (
          <>
<td className="reason hidden" style={{padding: '1rem', fontSize: '14px'}}>Previous customer</td>

<td className="next-steps hidden" style={{padding: '1rem', fontSize: '14px'}}>Offer discount less than 30%</td>
</>
)}
</tr>
</tbody>
</table>
</div>
          </>
)}
            
        </div>
      )}
        

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
  height: '150px',
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
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
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
    <span style={{ marginLeft: '17rem', marginTop: '2rem', color: '#fff', cursor: 'pointer', fontFamily: 'sans-serif'}}>
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
        backdropFilter: 'blur(10px)',
        zIndex: 9998, // set a lower value than popup
      }}
    ></div>
    <div
      className="popup"
      style={{
        position: 'fixed',
        top: '5%',
        left: '10%',
        width: '80%',
        maxHeight: '100%',
        margin: '0 auto',
        borderRadius: '5px',
        zIndex: 9999,
      }}
    >
      <DealScoringTable onClose={() => {
  setShowPopup(false);
  setShowDeals(true);
  handleSave();
}}
/>
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
