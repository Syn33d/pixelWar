import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getPixelWar(@Res() res: Response): void {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Canvas Drawing</title>
          <script src="/socket.io/socket.io.js"></script>
        </head>
        <body>
          <input type="color" id="colorPicker" value="#000000">
          <canvas id="myCanvas" width="400" height="400" style="border:1px solid #000000;"></canvas>
          <script>
            const canvas = document.getElementById('myCanvas');
            const context = canvas.getContext('2d');
            const socket = io();
            const pixelSize = 10;     
            const colorPicker = document.getElementById('colorPicker');

            canvas.addEventListener('click', (event) => {
              const rect = canvas.getBoundingClientRect();
              const x = Math.floor((event.clientX - rect.left) / pixelSize) * pixelSize;
              const y = Math.floor((event.clientY - rect.top) / pixelSize) * pixelSize;
              const color = colorPicker.value;
              socket.emit('updatePixel', { x, y, color });
            });

            socket.on('pixelUpdated', (data) => {
              context.fillStyle = data.color;
              context.fillRect(data.x, data.y, pixelSize, pixelSize);
            });
          </script>
        </body>
      </html>
    `);
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}
