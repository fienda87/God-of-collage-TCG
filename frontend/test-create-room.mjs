import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected with id", socket.id);
  
  socket.emit("create_room", { deck: [] });
});

socket.on("room_created", (data) => {
  console.log("Room created", data);
  process.exit(0);
});

socket.on("error", (err) => {
  console.error("Error from server:", err);
  process.exit(1);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
  process.exit(1);
});

setTimeout(() => {
  console.error("Timeout waiting for room_created");
  process.exit(1);
}, 5000);
