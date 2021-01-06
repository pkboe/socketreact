import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log(
//     "User Joined: " +
//       socket.request.connection.remoteAddress +
//       ":" +
//       socket.request.connection.remotePort +
//       " Socket ID : " +
//       socket.id
//   );
//   socket.on("CONNECTION_FROM_CLIENT_TO_SERVER", (data) => {
//     console.log(data.message);
//     socket.emit("ACK_SUCCESS", socket.id);
//   });
// });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });

  socket.on("room", (data) => {
    console.log("room join");
    console.log(data);
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    console.log("leaving room");
    console.log(data);
    socket.leave(data.room);
  });

  socket.on("new message", (data) => {
    console.log("new Massage" + socket.id);
    console.log(data.room);
    socket.broadcast.to(data.room).emit("receive message", data);
  });
});

httpServer.listen(4001);
