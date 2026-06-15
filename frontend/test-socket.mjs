import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected with id", socket.id);
  
  // Custom deck with 20 Zaka Maba
  const customDeck = [
    { cardId: "zaka-maba", quantity: 20 }
  ];
  
  console.log("Emitting create_room with deck");
  socket.emit("create_room", { deck: customDeck });
});

socket.on("room_created", (data) => {
  console.log("Room created", data.roomCode);
  
  // Need to add a guest to trigger startSetupPhase
  const guestSocket = io("http://localhost:5000");
  guestSocket.on("connect", () => {
    console.log("Guest connected with id", guestSocket.id);
    const guestDeck = [
      { cardId: "baydar-maba", quantity: 20 }
    ];
    guestSocket.emit("join_room", { roomCode: data.roomCode, deck: guestDeck });
  });

  guestSocket.on("game_state_sync", (state) => {
    // This might not be triggered automatically, wait for game_start or state_update
  });

  guestSocket.on("state_update", ({ gameState }) => {
    console.log("Guest received state update, phase:", gameState.phase);
    if (gameState.phase === "setup") {
       console.log("Host hand:", gameState.players[socket.id].hand.map(c => c.id));
       console.log("Guest hand:", gameState.players[guestSocket.id].hand.map(c => c.id));
       process.exit(0);
    }
  });
});

setTimeout(() => {
  console.log("Timeout");
  process.exit(1);
}, 3000);
