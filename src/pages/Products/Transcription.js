import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import transcriptionstyles from '@/styles/Transcription.module.css';
import { Configuration, OpenAIApi } from 'openai';

const questions = [
  'Do you have stored any recording of the sales calls? If yes, please tell me where I can find them.',
  'Do you want to summarise the sales calls based on your company\'s sales call template?',
  'What were the key takeaways from the call?',
];

export default function FirstPost() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const messages = document.getElementById('messages');
    // Initialize messages with the first question as a bot message
    setMessages([{ message: currentQuestion, sender: 'bot' }]);
  

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
      sendMessage(message);
      messageInput.value = '';
    }
  });

  // Add bot message to the chat interface
  function receiveMessage(message) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'bot' }]);
  }

  // Send user message to OpenAI API and receive response
  async function sendMessage(message) {
    setMessages(prevMessages => [...prevMessages, { message, sender: 'user' }]);
    async function sendMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.className = 'message sent';
      messageElement.innerHTML = `
        <div class="text">${message}</div>
        <div class="avatar"></div>
      `;
      messages.appendChild(messageElement);
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
  
    const prompt = `pretend that you are a software developer developing a sales call transcription tool. You want to get the best possible answer to the questions. The customer said: ${message}. Ask follow up questions to these questions in order till you get satisfactory answers to the questions.`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.7,
      
    });
    const data= response.data;
    console.log(data);
    const answer = data.choices[0].text.trim();
    console.log(answer);
    receiveMessage(answer);
  }
}
  // Add bot message to the chat interface
  function receiveMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message received';
    messageElement.innerHTML = `
      <div class="avatar"></div>
      <div class="text">${message}</div>
    `;
    messages.appendChild(messageElement);
  }
}, []);

  return (
    <>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1800px',
          backgroundColor: '#292929',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <h1
            style={{
              color: '#fff',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Sales Call Transcription
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                flex: 1,
                marginRight: '2rem',
                marginBottom: '1rem',
                minHeight: '400px',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                padding: '2rem',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  position: 'relative',
    width: '100%',
    height: '400px',
    padding: '2rem',
    boxSizing: 'border-box',
                  
                }}
                id="chatcontainer"
              >
                {messages.map((message, index) => (
  <div
    key={index}
    className={`message ${message.sender === 'bot' ? 'received' : 'sent'}`} id="messages"
  >
    <div className={styles.avatar} id="avatar"></div>
    <div className={message.sender === 'bot' ? styles.text : `${styles.text} ${styles.sentText}`}id="message received">{message.message}</div>
  </div>
))}
              </div>
              <form
                style={{ display: 'flex',
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
                    backgroundColor: '#007bff',
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
                flex: 1,
                marginRight: '5rem',
                marginLeft: '1rem',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                width: '100%',
                height: '800px',
              }}
            >
              <iframe src="/Transcription-tool.html" width="500px" height="100%"></iframe>
            </div>
          </div>
        </div>
      </div>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
    );
    }



