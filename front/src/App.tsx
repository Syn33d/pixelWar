import React, { useState } from 'react';
import './App.css';

const GRID_SIZE = 30;

const App: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>(
    Array(GRID_SIZE).fill(Array(GRID_SIZE).fill('#FFFFFF')),
  );
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? selectedColor : cell,
      ),
    );
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <h1>Pixel War</h1>
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
    </div>
  );
};

export default App;