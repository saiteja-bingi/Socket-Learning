import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to Server");
    });

    socket.on("receive_message", (data) => {

      setChat((prev) => [...prev, data]);

    });

    return () => {

      socket.off("connect");
      socket.off("receive_message");

    };

  }, []);

  const sendMessage = () => {

    if(message.trim() === "") return;

    const messageData = {
      text: message
    };

    socket.emit("send_message", messageData);

    setMessage("");

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Mini Chat</h1>

      <input
        type="text"
        placeholder="Type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <div>

        {
          chat.map((msg, index) => (
            <p key={index}>
              {msg.text}
            </p>
          ))
        }

      </div>

    </div>
  );
}

export default App;