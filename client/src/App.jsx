import io from "socket.io-client";
import {useState, useEffect } from "react";
const socket = io("http://localhost:3001");

function App() {
  const [messages,setMessages]=useState([]);

  useEffect(()=>{
    
    socket.emit("hello",{
      message:"Hello from Client"
    });

    socket.on("welcome",(data)=>{
      setMessages((prev)=>[...prev,data.message])
    });
    
  },[]);

  return (
    <div>
      <h1>Socket Learning</h1>

      {
        messages.map((msg,idx)=>(
          <p key={idx}>{msg}</p>
        ))
      }
    </div>
  );
}

export default App;