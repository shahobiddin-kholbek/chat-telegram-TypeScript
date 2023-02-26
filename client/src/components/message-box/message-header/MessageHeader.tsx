import { ContactType } from "../../Type";
export default function MessageHeader({selectedContact} : {selectedContact: ContactType }) {
    return (
      <div className="headerNameMain">
        {selectedContact.id ? (
          <div className="headerName">
            <div>{selectedContact.name}</div>
            <div>{selectedContact.lastname}</div>
          </div>
        ) : (
          <div className="headerName">Choose contact...</div>
        )}
      </div>
    );
  }
  