import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  useEffect(() => {
    const fetchGrid = async () => {
      try {
        const response = await axios.get('http://localhost:3000/canvas/1');
        const canvas = response.data;
        const filledGrid = canvas.pixels.map((row: { color: string }[]) =>
          row.map((cell) => cell.color),
        );
        setGrid(filledGrid);
      } catch (error) {
        console.error('Error fetching grid:', error);
      }
    };

    fetchGrid();
  }, []);

  const handleCellClick = async (row: number, col: number) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? selectedColor : cell,
      ),
    );
    setGrid(newGrid);

    try {
      await axios.post('http://localhost:3000/canvas-log', {
        canvaId: 1,
        userId: 1,
        pixels: { x: col, y: row, color: selectedColor },
        timestamp: new Date(),
      });
      console.log('Pixel log saved successfully');
    } catch (error) {
      console.error('Error saving pixel log:', error);
    }

    try {
      await axios.put(`http://localhost:3000/canvas/1`, {
        pixel: { x: row, y: col, color: selectedColor },
        userId: 1,
      });
      console.log('Pixel updated successfully');
    } catch (error) {
      console.error('Error updating pixel:', error);
    }
  };

  const handleGenerateTimelapse = async () => {
    try {
      const response = await axios.get('http://localhost:3000/canvas-log');
      const canvasLog = response.data;

      const initialGrid = Array.from({ length: 30 }, () => Array(30).fill('#FFFFFF'));
      const timelapse = [initialGrid];

      canvasLog.forEach((log: any) => {
        const previousGrid = timelapse[timelapse.length - 1].map(row => [...row]);
        const { x, y, color } = log.pixels;
        previousGrid[y][x] = color;
        timelapse.push(previousGrid);
      });

      let index = 0;
      const interval = setInterval(() => {
        if (index >= timelapse.length) {
          clearInterval(interval);
        } else {
          setGrid(timelapse[index]);
          index++;
        }
      }, 50);

      console.log('Timelapse generated!');
    } catch (error) {
      console.error('Error fetching canvas log:', error);
      alert('Failed to generate timelapse');
    }
  };

  return (
    <div className="App">
      <h1>Pixel War</h1>
      <>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="cell"
                  style={{ backgroundColor: cell }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handleGenerateTimelapse}>Generate Timelapse</button>
      </>
    </div>
  );
};

export default App;