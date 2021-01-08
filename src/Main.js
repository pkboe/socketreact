import { socket } from "./service/socket";
import "./App.css";
import { useEffect, useState } from "react";
const Main = (props) => {
  const [Connected, setConnected] = useState(false);
  useEffect(() => {
    socket.emit("HELLO_THERE");
    const eventHandler = () => setConnected(true);
    socket.on("WELCOME_FROM_SERVER", eventHandler);

    socket.on("A_CLIENT_CONNECTED", (data) =>
      console.log("NEW CLIENT CONNECTED : ", data)
    );
    socket.on("A_CLIENT_LEFT", (data) =>
      console.log("NEW CLIENT LEFT : ", data)
    );
    // unsubscribe from event for preventing memory leaks
    return () => {
      socket.off("WELCOME_FROM_SERVER", eventHandler);
    };
  }, []);

  return (
    <div className="App Main">
      <h1>Welcome! 👋</h1>
      {Connected ? (
        <h2 style={{ color: "lime" }}>Welcome from server!</h2>
      ) : (
        <h2 style={{ color: "tomato" }}>Not connected yet...</h2>
      )}
      <div className="Notice">
        <h2>Why You Seeing This ? 🤔 </h2>
        <h5>
          Well, This page is made to check whether the socket connnection made
          from SERVER to CLIENT is Consistant Or Not On various devices.
        </h5>
        <br />
        <h2>To Check It : </h2>
        <h6>
          <ul
            style={{
              textAlign: "left",
              fontFamily: "monospace",
              color: "lime",
              backgroundColor: "black",
              borderWidth: "5px",
              borderStyle: "solid",
              borderColor: "grey",
              borderRadius: "5px",
              fontSize: "14px",
              minHeight: "120px",
            }}
          >
            <li>Consider Any Of The Instances FIX</li>
            <li>Open Terminal / Console </li>
            <li>Create Multiple Instances Of THIS Site.</li>
            <li>
              And Now While Observing The Dev Console Check Whether The ID's Are
              getting changed.
            </li>
          </ul>
          <h2>What You Have To Check Here ? </h2>
          <h3>
            THE ONE TAB YOU DELETE OR EITHER ADD, REMAINING IDs Must BE INTACT.
          </h3>

          <br />
          <h1>Thank You!</h1>
        </h6>
      </div>
    </div>
  );
};

export default Main;
