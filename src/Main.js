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
      <h1>Main Component</h1>
      {Connected ? <p>Welcome from server!</p> : <p>Not connected yet...</p>}
    </div>
  );
};

export default Main;
