import { useState, useEffect } from "react";
import MessageHeader from "./message-header/MessageHeader";
import MessageInput from "./message-input/MessageInput";
import MessageList from "./message-list/MessageList";
import { ContactType, MessageType } from "../Type";

export default function MessageBox({ selectedContact}: {selectedContact: ContactType}) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => { 
    fetch("http://localhost:3002/messages")
      .then((response) => response.json())
      .then((json) => setMessages(json));
      
  }, []);

  const addMessage = (message: MessageType) => { 
    const newMessages = [...messages, message];
    setMessages(newMessages);
  };

  const filteredMessages = messages.filter((message) => {
    return (
      message.recieverId === selectedContact.id && message.senderId === 777
    );
  });

  return (
    <div className="messageBoxMain">
      <MessageHeader selectedContact={selectedContact} />
      <MessageInput
        selectedContact={selectedContact}
        addMessage={addMessage}
      />
      <MessageList filteredMessages={filteredMessages} setMessages={setMessages}  newMessages={messages} />
    </div>
  );
}
