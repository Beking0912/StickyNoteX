import React, { useRef, useEffect } from "react";

interface GridProps {}

const fillColor = "#00000080";
const unit = 20;

const GridCanvas: React.FC<GridProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const [width, height] = [canvas.width, canvas.height];

    const wCount = Math.floor(width / unit);
    const hCount = Math.floor(height / unit);

    context.beginPath();
    for (let i = 0; i < hCount; i++) {
      for (let j = 0; j < wCount; j++) {
        context.fillStyle = fillColor;
        context.rect(j * unit + 1, i * unit + 1, 1, 1);
        context.fill();
      }
    }
    context.closePath();
  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
};

export default GridCanvas;
