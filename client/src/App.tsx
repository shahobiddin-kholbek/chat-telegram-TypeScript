import { useState, useEffect } from "react";
import { ContactType, UserAuth } from "./components/Type";
import Contacts from "./components/contacts/Contacts";
import MessageBox from "./components/message-box/MessageBox";
import Auth from "./components/auth/Auth";

function App() {
  const local = JSON.parse(localStorage.getItem("selectedContact")||'')
  const [selectedContact, setSelectedContact] = useState<ContactType | "">(local ? local: "");

  useEffect(() => {
    localStorage.setItem("selectedContact", JSON.stringify(selectedContact))
  }, [selectedContact]);

  const chooseContact = (contact: ContactType) => {
    setSelectedContact(contact);
  };
  const dataFromLC: UserAuth | null = JSON.parse(
    localStorage.getItem("user") || ""
  );
  return (
    <div>
      {dataFromLC && dataFromLC.password !== "7" ? (
        <Auth />
      ) : (
        <div>
          <Contacts chooseContact={chooseContact} />
          {selectedContact && 
          <MessageBox selectedContact={selectedContact} />
        } 
        </div>
      )}
    </div>
  );
}

export default App;
