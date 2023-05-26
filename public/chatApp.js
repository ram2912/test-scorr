import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  background-color: #f0f0f0;
  width: 400px;
  height: 600px;
  margin: 20px auto;
  padding: 10px;
  overflow-y: scroll;
`;

const ChatBubble = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  font-family: sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const InputBox = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-family: sans-serif;
`;

const SendButton = styled.button`
  background-color: #008000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-family: sans-serif;
  cursor: pointer;
  margin-left: 10px;
`;

function ChatApp() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSend = () => {
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div>
      <ChatContainer>
        {messages.map((message, index) => (
          <ChatBubble key={index}>{message}</ChatBubble>
        ))}
      </ChatContainer>
      <InputContainer>
        <InputBox
          type="text"
          placeholder="Type your message here"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <SendButton onClick={handleMessageSend}>Send</SendButton>
      </InputContainer>
    </div>
  );
}

export default ChatApp;
