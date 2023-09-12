import { useState, useCallback } from "react";
import './styles/App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import CsvParser from './components/CsvParser'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "../particles.json";
import Papa from "papaparse";
import axios from "axios";

function App() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const systemMessage = {
    //  Explain things like you're talking to a data analyst with 10 years experience and include the data
    role: "system",
    content: `Explain things like you're a data analyst with 10 years experience and we are looking at this data ${JSON.stringify(
      csvData
      )}`,
    };
    
    // Handle the error if no API Key
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.error("ERROR: API_KEY environment variable is not set.");
    }
    
    const handleSend = async (message) => {
      const newMessage = {
        message,
      direction: 'outgoing',
      sender: "user"
    };
    
    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };
  
  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
    
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });
    
    
    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-4",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }
    
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
    .then((data) => {
      console.log(`hit console.log #1, data: ${data}`);
      return data.json();
    })
    .then((data) => {
      console.log(`hit console.log #2, data: ${data}`);
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        },
      ]);
      setIsTyping(false);
    });
  }
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });

    // Send the CSV to the endpoint /upload using axios
    const formData = new FormData();
    formData.append("file", file);
    const url = "http://localhost:8000/upload";

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div className="App">
      <Particles options={particlesOptions} init={particlesInit} />;
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ position: "relative", zIndex: 2 }}
        />
        <div style={{ backgroundColor: "black", position: "relative", zIndex: 2 }} >
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  console.log(`chatgpt message ${message}`);
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
          <CsvParser
            csv={csvData}
            style={{ position: "relative", zIndex: 2 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App
