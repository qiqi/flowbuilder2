import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function FlowCanvas(props) {
  let particles = [100, 100];
  const canvasRef = useRef(null);

  useEffect(() => {
    setInterval(() => {
      particles[1] += 1;
      console.log(particles[1]);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000000";
      ctx.fillRect(particles[0], particles[1], 10, 10);
    }, 1000);
  });
  return <canvas ref={canvasRef} {...props} />;
}
