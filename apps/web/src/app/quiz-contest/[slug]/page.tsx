"use client";
import { Button, Input } from "@/components/ui";
import { useSocket } from "@/context/SocketProvider";
import io from 'socket.io-client';
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
  
  const socket = io("http://localhost:3001", { transports : ['websocket'] });

  socket.on('quizStarted', () => {
    console.log('Quiz started');
    // Perform actions when the quiz starts
  });
  
  socket.on('receiveQuestion', (data: any) => {
    const { roomId, question, options } = data;
    console.log(`Received question to clients in room with ID: ${roomId}`, data);
  });

  useEffect(()=>{
    socket.emit('joinRoom',500);
  },[]);
  return (
    <div className="flex justify-center items-center">
      <div>
        <Input
          onChange={(e) => {}}
          className={""}
          placeholder="Message..."
        />
        <Button variant={"outline"}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default page;
