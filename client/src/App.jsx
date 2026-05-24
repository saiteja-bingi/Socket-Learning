import io from "socket.io-client";
import {useState, useEffect } from "react";
const socket = io("http://localhost:3001");

function App() {
  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState("");
  const [username,setUsername]=useState("");

  useEffect(()=>{
    socket.on("welcome",(data)=>{
      setMessages((prev)=>[...prev,data])
    });
  
  },[]);

  const sendMessage=()=>{
    socket.emit("hello",{
      username:username,
      message:message,
      time:new Date().toLocaleTimeString()
    });
    setMessage("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <h1>Socket Learning</h1>

      {
        messages.map((msg,idx)=>(
          <div key={idx}>
            <h3>{msg.username}</h3>
            <p>{msg.message}</p>
            <p>{msg.time}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;