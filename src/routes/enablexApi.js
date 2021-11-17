const express = require('express');
let app = express.Router();

const vcxroom = require('./vcxroom');

// Application Server Route Definitions - These functions communicate with EnableX Server API
// Route: To get liist of all Rooms in your Application
app.get('/get-all-rooms', (req, res) => {
  vcxroom.getAllRooms((data) => {
    res.status(200);
    res.send(data);
  });
});

// Route: To get information of a given room.
app.get('/get-room/:roomName', (req, res) => {
  const { roomName } = req.params;
  vcxroom.getRoom(roomName, (status, data) => {
    res.status(200);
    res.send(data);
  });
});

// Route: To get Token for a Room
app.post('/create-token/', (req, res) => {
  vcxroom.getToken(req.body, (status, data) => {
    res.status(200);
    res.send(data);
  });
});

// Route: To create a Room (1to1)
app.post('/create-room/', (req, res) => {
  vcxroom.createRoom((status, data) => {
    res.send(data);
    res.status(200);
  });
});

// Route: To create a Room (multiparty)
app.post('/room/multi/', (req, res) => {
  vcxroom.createRoomMulti((status, data) => {
    res.send(data);
    res.status(200);
  });
});

module.exports = app