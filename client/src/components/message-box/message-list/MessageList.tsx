import { MessageType } from "../../Type";

export default function MessageList({
  filteredMessages,
  setMessages,
  newMessages,
}: {
  filteredMessages: MessageType[];
  setMessages: (newMessages: MessageType[])=>void;
  newMessages: MessageType[];
}) {
  const onMsgDeleteClick = (id: any) => {
    setMessages(
      newMessages.filter((msg) => {
        return msg.id !== id;
      })
    );

    fetch(`http://localhost:3002/messages/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="listStyle">
      {filteredMessages.map((msg) => {
        return (
          <div className="msgTransform" key={msg.id}>
            <div className="textMsgStyle">
              <div>
                <div>{msg.content}</div>
                <button onClick={() => onMsgDeleteClick(msg.id)}>X</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
