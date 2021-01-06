import axios from "axios";
import { useState, useRef, useEffect } from "react";

import socketIOClient from "socket.io-client";
const ChatOverlay = (props) => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      alert(data);
    });
  }, []);

  useEffect(() => {
    if (enter) handleSenderMessage();
    return () => {
      setEnter(false);
    };
  });
  const handleInputEnter = () => {
    if (chatInputRef.current.value !== "") {
      setSenderState([
        ...senderState,
        {
          id: senderState.length + 1,
          origin: "sender",
          value: chatInputRef.current.value,
        },
      ]);
      setEnter(true);
      chatButtonRef.current.disabled = true;
      chatInputRef.current.disabled = true;
    }
  };
  const ENDPOINT = " http://localhost:2000";

  const [senderState, setSenderState] = useState([
    { id: 1, value: "Hello", origin: "sender" },
    { id: 2, value: "Hello", origin: "receiver" },
  ]);
  const [enter, setEnter] = useState(false);
  const chatInputRef = useRef();
  const chatContainerRef = useRef();
  const chatButtonRef = useRef();
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [senderState]);

  const handleSenderMessage = async () => {
    // const response = await axios.get("https://pkaychatapi.herokuapp.com/greet");
    const response = await axios.get("http://localhost:2000/greet");
    setSenderState([
      ...senderState,
      {
        id: senderState.length + 100,
        origin: "receiver",
        value: response.data,
      },
    ]);
    chatInputRef.current.value = "";
    chatInputRef.current.disabled = false;
    chatButtonRef.current.disabled = false;
  };
  return (
    <>
      <div
        ref={chatContainerRef}
        id="chatContainer"
        className="chatContainer"
        z
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          scrollBehavior: "smooth",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "60%",
          minWidth: "300px",
          height: "400px",
          border: "solid 10px blueviolet",

          borderRadius: "10px",
          paddingLeft: "5px",
          paddingRight: "5px",

          // maxWidth: "250px",
        }}
      >
        <div className="reciever">
          <p className={"messageContainer"} style={{ textAlign: "center" }}></p>
        </div>

        {senderState.map((item) => (
          <div key={item.id} className={item.origin}>
            {/* <gg style={{ height: "1px" }}>{new Date().toLocaleString()}</gg> */}
            <p className={"messageContainer"}>{item.value.toString()}</p>
          </div>
        ))}
      </div>
      <div className="inputBar">
        <input
          ref={chatInputRef}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleInputEnter();
            }
          }}
          type="text"
          placeholder="Type Something..."
        />
        <button ref={chatButtonRef} type="submit" onClick={handleInputEnter}>
          Send Message
        </button>
      </div>
    </>
  );
};

export default ChatOverlay;
