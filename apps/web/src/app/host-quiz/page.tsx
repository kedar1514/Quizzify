"use client";
import { Button } from "@/components/ui";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
let count = 1;

const page = () => {
  
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  
  count++;

  const handleOnClick = () => {
    socket.emit("sendQuestion", {
      roomId: 500,
      question: count,
      options: count,
    });
  };

  useEffect(() => {
    socket.emit("joinRoom", 500);
  }, []);
  return (
    <div>
      <Button onClick={handleOnClick}>Next</Button>
    </div>
  );
};

export default page;
