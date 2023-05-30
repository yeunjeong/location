const express = require('express');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

let connectedClients = [];

wss.on('connection', (ws) => {
  connectedClients.push(ws);
  
  ws.on('message', (message) => {
    // 클라이언트로부터 메시지 수신
    console.log('수신된 메시지:', message);
    // 위치 정보 처리 로직 및 알림 전송 로직 추가
    
    // 예시: 위치 정보 비교 및 알림 전송
    const coordinates = JSON.parse(message);
    const { latitude, longitude } = coordinates;
    const notificationRange = 0.1; // 일정 범위 (예시: 0.1도)

    // 다른 기기의 위치와 비교하여 일정 범위 내에 있는지 확인
    connectedClients.forEach((client) => {
      if (client !== ws) { // 자기 자신 제외
        const clientCoordinates = client.coordinates;
        if (
          Math.abs(clientCoordinates.latitude - latitude) <= notificationRange &&
          Math.abs(clientCoordinates.longitude - longitude) <= notificationRange
        ) {
          // 일정 범위 내에 있는 경우 알림 전송
          client.send('알림: 일정 범위 내에 있습니다.');
        }
      }
    });
  });

  ws.on('close', () => {
    connectedClients = connectedClients.filter((client) => client !== ws);
  });
});

app.listen(3000, () => {
  console.log('웹 서버가 시작되었습니다.');
});
