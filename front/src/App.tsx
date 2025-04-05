import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { socket } from './socket';



const App: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const navigate = useNavigate();
  let canvasLog: any;
  const token = localStorage.getItem('token');

  const handleCellClick = async (row: number, col: number) => {

    // Décode le token pour extraire le userId
    const decodedToken: { sub: number } = jwtDecode(token!);
    const userId = decodedToken.sub;

    if (!userId) {
      console.error('User ID not found in token');
      return;
    }

    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? selectedColor : cell,
      ),
    );
    setGrid(newGrid);

    const payload = {
      data: {
        id: 1, // id du canvas
        userId, // id de l'utilisateur
        pixel: [{ x: row, y: col, color: selectedColor }],
      },
    };

    try {
      await axios.put(`http://172.233.255.18:3000/canvas/1`,
        {
          pixel: { x: row, y: col, color: selectedColor },
          userId,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      socket.emit('updateCanva', JSON.stringify(payload));
      console.log('🛰️ Événement WebSocket envoyé !');
    } catch (error) {
      console.error('Error updating pixel:', error);
    }
  };

  const handleGenerateTimelapse = async () => {
    try {
      const response = await axios.get('http://172.233.255.18:3000/canvas-log',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      canvasLog = response.data;

      const initialGrid = Array.from({ length: 30 }, () => Array(30).fill('#FFFFFF'));
      const timelapse = [initialGrid];

      canvasLog.forEach((log: any) => {
        const previousGrid = timelapse[timelapse.length - 1].map(row => [...row]);
        const { x, y, color } = log.pixels;
        previousGrid[x][y] = color;
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

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!token) {
        navigate('/login');
        return false;
      }

      return true;
    };

    const fetchGrid = async () => {
      try {
        const response = await axios.get('http://172.233.255.18:3000/canvas/1',
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        console.log('Grid fetched successfully:', response.data);

        const canvas = response.data;
        const filledGrid = canvas.map((row: { color: string }[]) =>
          row.map((cell) => cell.color),
        );
        setGrid(filledGrid);
      } catch (error) {
        console.error('Error fetching grid:', error);
      }
    };

    const initializeApp = async () => {
      const isAuthenticated = await checkAuthentication();
      if (isAuthenticated) {
        fetchGrid();
      }
    };

    socket.on('connect', () => {
      console.log('✅ WebSocket connecté !');
    });

    socket.on('updateCanva', ({ canvaId, pixel }) => {
      console.log(`🧩 Pixel mis à jour via WS pour le canva ${canvaId}`, pixel);

      setGrid((prevGrid) => {
        const updatedGrid = [...prevGrid];
        updatedGrid[pixel.x][pixel.y] = pixel.color;
        return updatedGrid;
      });
    });
    initializeApp();

    return () => {
      socket.off('connect');
      socket.off('updateCanva');
    };
  }, [navigate]);



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