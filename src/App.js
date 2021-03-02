// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import Webcam from "react-webcam";
// import { io } from "socket.io-client";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//////////////////////////////////////////////////////////////////

// const App = (props) => {
//   const socket = io("http://localhost:4001", {
//     reconnection: true,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     reconnectionAttempts: 99999,
//   });
//   const [Connected, setConnected] = useState("false");
//   const [imgSrc, setImgSrc] = useState();

//   const videoConstraints = {
//     width: 1000,
//     height: 1000,
//   };

//   const webcamRef = useRef(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     console.log(imageSrc);

//     setImgSrc(imageSrc);
//   };

//   useEffect(() => {
//     socket.on("connection", () => setConnected("True"));
//     socket.on("ACK_SUCCESS", (id) => {
//       alert("AcknowledgeMent Successful : " + id);
//     });
//   }, []);

//   const sendAckToServer = () => {
//     socket.emit("CONNECTION_FROM_CLIENT_TO_SERVER", {
//       id: socket.id,
//       message: "Hello! Im " + socket.id,
//     });
//     console.log("ACK");
//   };

//   return (
//     <div className=" container ">
//       <div
//         className=""
//         style={{ height: "100px", width: "0px", border: "1px solid" }}
//       >
//         <Webcam
//           position="relative"
//           mar
//           audio={false}
//           height={"100px"}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={"500"}
//           videoConstraints={videoConstraints}
//         />
//       </div>

//       <button className="btn btn-success" onClick={capture}>
//         Capture photo
//       </button>
//       <h1>Here we go with Socket And react 💙</h1>

//       <button onClick={sendAckToServer} className="btn btn-success">
//         Send Ack Message To Server
//       </button>
//       <h2> Connection : {Connected}</h2>
//       <div style={{ width: "200px", wordWrap: "normal" }}>
//         <img src={imgSrc} alt="Photo" />
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// import io from "socket.io-client";
// const socket = io("http://localhost:4001");

// function App() {
//   const [messageCount, setMessageCount] = useState(0);
//   const [theme, setTheme] = useState("dark");
//   const [inRoom, setInRoom] = useState(false);

//   useEffect(() => {
//     if (inRoom) {
//       console.log("joining room");
//       socket.emit("room", { room: "test-room" });
//     }

//     return () => {
//       if (inRoom) {
//         console.log("leaving room");
//         socket.emit("leave room", {
//           room: "test-room",
//         });
//       }
//     };
//   });

//   useEffect(() => {
//     socket.on("receive message", (payload) => {
//       setMessageCount(messageCount + 1);
//       document.title = `${messageCount} new messages have been emitted`;
//     });
//   }, [messageCount]); //only re-run the effect if new message comes in

//   const handleSetTheme = () => {
//     let newTheme;
//     theme === "light" ? (newTheme = "dark") : (newTheme = "light");
//     console.log("new theme: " + newTheme);
//     setTheme(newTheme);
//   };

//   const handleInRoom = () => {
//     inRoom ? setInRoom(false) : setInRoom(true);
//   };

//   const handleNewMessage = () => {
//     console.log("emitting new message");
//     socket.emit("new message", {
//       room: "test-room",
//     });
//     setMessageCount(messageCount + 1);
//   };

//   return (
//     <div className={`App Theme-${theme}`}>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//         <h1>
//           {inRoom && `You Have Entered The Room`}
//           {!inRoom && `Outside Room`}
//         </h1>

//         <p>{messageCount} messages have been emitted</p>

//         {inRoom && (
//           <button onClick={() => handleNewMessage()}>Emit new message</button>
//         )}

//         <button onClick={() => handleSetTheme()}>Toggle Theme</button>

//         <button onClick={() => handleInRoom()}>
//           {inRoom && `Leave Room`}
//           {!inRoom && `Enter Room`}
//         </button>
//       </header>
//     </div>
//   );
// }

// export default App;

//////////////////////////////////////////////////////////////
import AceEditor from "react-ace";
import axios from "axios";
import "./App.css";
// import Participents from "./Components/Participents.jsx";
import "ace-builds/src-noconflict/mode-python";
// import ChatOverlay from "./Components/ChatOverlay.jsx";
import "brace/theme/terminal";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import { useEffect, useState } from "react";
////////////////////////////////////////////////////////////
const CLIENT_ID = "99122d0aa958b08d0b22438887528695";
const CLIENT_SECRET =
  "a4ccd14cd72e85c9bc12b7096c910430c9ba4d99df9d50abb3981103e85e7a06";
const URL = "https://api.jdoodle.com/v1/execute"; //LocalHost Working Good

const App = (props) => {
  const [Code, setCode] = useState(``);
  const [Output, setOutput] = useState("😀");
  const [isOutputLoading, setIsOutputLoading] = useState(false);

  useEffect(() => {
    console.log(Code);
  }, [Code]);

  const handleCodeSubmit = async () => {
    setIsOutputLoading(true);
    const body = {
      script: Code,
      language: "python3",
      versionIndex: "0",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      stdin: "abc",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    await axios
      .post(URL, body, {
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          crossdomain: "true",
          crossorigin: "true",
        },
        proxy: { host: "https://api.jdoodle.com/" },
      })
      .then((res) => {
        setIsOutputLoading(false);
        console.log(res);
        setOutput(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {/* <Participents /> */}
      <h6>URL Using : {URL}</h6>
      <div
        className="App"
        style={{
          border: "15px solid lime",
          padding: "0px",
          borderRadius: "20px",
          boxShadow: "0 0px 20px #006600",
        }}
      >
        <AceEditor
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          value={Code}
          onChange={(value) => {
            setCode(value);
          }}
          mode="python"
          theme="terminal"
          style={{ width: "100%" }}
        />

        <button
          id="codeSubmitButton"
          className="codeSubmitButton"
          disabled={isOutputLoading}
          onClick={() => {
            console.log(Code);
            handleCodeSubmit();
          }}
          style={{
            backgroundColor: "yellow",
            color: "black",
            height: 45,
            width: "100%",
            transition: "1s",
            fontSize: 22,
            textAlign: "center",
            outline: "none",
          }}
        >
          {isOutputLoading && "Please Wait"}
          {!isOutputLoading && "Execute"}
        </button>
        {/* <Participents /> */}
        <div
          style={{
            backgroundColor: "black",
            overflowWrap: "break-word",
            width: "500px",
            height: "auto",
            padding: "10px",
            border: "2px solid green",
          }}
        >
          <p
            style={{
              color: "lime",
              fontFamily: "monospace",
              textAlign: "left",
              fontSize: 17,
            }}
          >
            {" "}
            Code OutPutt `Configured In Python For Testing Purpose ` : <br />{" "}
            {">" + Output}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect, useRef } from "react";

// function App() {
//   const [isVisible, setIsVisible] = useState();
//   const [isFull, setIsFull] = useState(false);
//   const onVisibilityChange = () => setIsVisible(document.hidden);
//   const [Warning, setWarning] = useState(0);
//   const AppRef = useRef(null);

//   const onFocus = () => {
//     console.log("Tab is in focus");
//     // alert("Focused");
//   };

//   // User has switched away from the tab (AKA tab is hidden)
//   const onBlur = () => {
//     console.log("Tab is blurred");
//     setWarning(Warning + 1);
//     alert("Blurred");
//   };

//   useEffect(() => {
//     window.addEventListener("focus", onFocus);
//     window.addEventListener("blur", onBlur);
//     // Specify how to clean up after this effect:
//     return () => {
//       window.removeEventListener("focus", onFocus);
//       window.removeEventListener("blur", onBlur);
//     };
//   });
//   useEffect(() => {
//     window.addEventListener("visibilitychange", onVisibilityChange);
//     document.title = isVisible;
//     // isVisible && setWarning(Warning + 1);
//     return () => {
//       window.removeEventListener("visibilitychange", onVisibilityChange);
//     };
//   }, [isVisible, Warning]);

//   return (
//     <div className="App" ref={AppRef}>
//       {" "}
//       <h1 style={{ color: "yellow", backgroundColor: "#00AFFF" }}>
//         WARNING! : {Warning}
//       </h1>
//     </div>
//   );
// }

// export default App;
