import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
  origin: 'http://localhost:3000',
  // Add other CORS options if needed
}));
// Express route to serve the client-side application
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Adjust the path to your HTML file
});

// WebSocket connection handler
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle joining a room (quiz)
  socket.on('joinRoom', (roomId: string) => {
    console.log(`User joined room with ID: ${roomId}`);
    socket.join(roomId); // Join the room identified by roomId
  });

  // Handle starting the quiz by the host
  socket.on('startQuiz', (roomId: string) => {
    console.log(`Host started quiz in room with ID: ${roomId}`);
    io.to(roomId).emit('quizStarted'); // Emit 'quizStarted' event to all clients in the room
  });

  // Handle sending a question to the clients in a room
  socket.on('sendQuestion', (data: any) => {
    const { roomId, question, options } = data;
    console.log(`Sending question to clients in room with ID: ${roomId}`);
    io.to(roomId).emit('receiveQuestion', { question, options }); // Emit 'receiveQuestion' event to all clients in the room
  });

  // Handle disconnecting
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});