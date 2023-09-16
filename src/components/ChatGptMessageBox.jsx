import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, } from "@chatscope/chat-ui-kit-react";
import { globalContext } from "../context/dataContext";
import { useState, useContext } from "react";

const ChatGptMessageBox = () => {
    const [isTyping, setIsTyping] = useState(false);
        const [messages, setMessages] = useState([
            {
                message:
                "Hello, I'm your Data Assistant! upload your csv and start asking for insights!",
                sentTime: "just now",
                sender: "ChatGPT",
            },
        ]);
    const { csvData } = useContext(globalContext);
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
            direction: "outgoing",
            sender: "user",
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        // messages is an array of messages
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
        return { role: role, content: messageObject.message };
        });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
        model: "gpt-4",
        messages: [
            systemMessage, // The system message DEFINES the logic of our chatGPT
            ...apiMessages, // The messages from our chat with ChatGPT
        ],
    };

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
    return (
        <MainContainer style={{ height: "600px" }}>
            <ChatContainer>
                <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                    isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null
                }
                >
                {messages.map((message, i) => {
                    console.log(`chatgpt message ${JSON.stringify(message)}`);
                    return <Message key={i} model={message} />;
                })}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
    );
};

export default ChatGptMessageBox;