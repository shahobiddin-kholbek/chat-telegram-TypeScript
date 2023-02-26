import { useState } from "react";
import { ContactType, MessageType } from "../../Type";

// function a() {
//   return function () {
//     console.log("hello");
//   };
// }
// a()()
// function calculator(
//   num1: number,
//   num2: number,
//   calcFunction: (arg1: number, arg2: number) => number
// ) {
//   const result = calcFunction(num1, num2);
//   console.log(result);
// }

// const sum = (a: number, b: number) => a + b;
// const minus = (a: number, b: number) => a - b;
// const multiply = (a: number, b: number) => a * b;
// calculator(1, 2, sum);
// calculator(3, 4, minus);
// calculator(2, 2, multiply);

export default function MessageInput({
  selectedContact,
  addMessage,
}: {
  selectedContact: ContactType;
  addMessage: (message: MessageType) => void;
}) {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage === "") {
      alert("Type message");
    } else {
      const message = {
        id: new Date().toISOString(),
        recieverId: selectedContact.id,
        senderId: 777,
        content: newMessage,
      };

      fetch("http://localhost:3002/input-messages", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setNewMessage(json));
      addMessage(message);
      setNewMessage("");
    }
  };
  return (
    <div className="messageInputMain">
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          disabled={selectedContact.id ? false : true}
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className="inputMessage"
          type="text"
        />
        <input
          type="submit"
          disabled={selectedContact.id ? false : true}
          value="Send"
          className="sendMessage"
        />
      </form>
    </div>
  );
}
