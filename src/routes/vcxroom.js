/// ////////////////////////////////////////////////////
//
// This file does RestAPI Call to communicate with EnableX Server API
//
/// //////////////////////////////////////////////////

const fs = require('fs');
require('dotenv').config();
const vcxutil = require('./vcxutil');

const vcxroom = {};

// room object for creating room for one to one call
const roomObj = {
  name: 'room for one to one video meeting',
  owner_ref: 'github sample',
  settings: {
    description: 'Video-Conferencing-Open-Source-Web-Application-Sample',
	mode: "group",
    scheduled: false,
    adhoc: false,
	moderators: '1',
    participants: '1',
    duration: '60',
    quality: 'SD',
	screen_share: true,
    auto_recording: false,
  },
};

// room object for creating room with multi party calling
const multiPartyRoomObj = {
  name: 'room for multiparty video meeting',
  owner_ref: 'github sample',
  settings: {
    description: 'Video-Conferencing-Open-Source-Web-Application-Sample',
    scheduled: false,
    adhoc: true,
    participants: '6',
    duration: '30',
    quality: 'SD',
    auto_recording: false,
  },
};

// HTTP Request Header Creation
const options = {
  host: 'api.enablex.io',
  port: 443,
  //key: fs.readFileSync(process.env.CERTIFICATE_SSL_KEY).toString(),
  //cert: fs.readFileSync(process.env.CERTIFICATE_SSL_CERT).toString(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  },
};

// Function: To get Token for a Room
vcxroom.getToken = (details, callback) => {
  options.path = `/v1/rooms/${details.roomId}/tokens`;
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };

  vcxutil.connectServer(options, JSON.stringify(details), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

// Function: To get a list of Rooms
vcxroom.getAllRooms = (callback) => {
  options.path = '/v1/rooms/';
  options.method = 'GET';
  vcxutil.connectServer(options, null, (status, data) => {
    callback(data);
  });
};

// Function: To get information of a Room
vcxroom.getRoom = (roomName, callback) => {
  options.path = `/v1/rooms/${roomName}`;
  options.method = 'GET';
  vcxutil.connectServer(options, null, (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

// Function: To create Room
vcxroom.createRoom = (callback) => {
  const roomMeta = roomObj;
  options.path = '/v1/rooms/';
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };
  vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

vcxroom.createCustRoom = (details,callback) => {
	const roomMeta = {
		name: 'room for one to one video meeting',
		owner_ref: details.askedQuesId,
		settings: {
			description: 'one-to-one-video-call-schedule-for-talk-electrical-show',
			mode: "group",
			scheduled: false,
			adhoc: false,
			moderators: '1',
			participants: '2',
			duration: '60',
			quality: 'SD',
			screen_share: true,
			auto_recording: true,
			wait_for_moderator: false,
		},
	};
	options.path = '/v1/rooms/';
	options.method = 'POST';
	options.headers = {
		'Content-Type': 'application/json',
		Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
	};
	vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
		if (status === 'success') {
			callback(status, data);
		} else if (status === 'error') {
			callback(status, data);
		}
	});
};

// Function: To create Room
vcxroom.createRoomMulti = (callback) => {
  const roomMeta = multiPartyRoomObj;
  options.path = '/v1/rooms/';
  options.method = 'POST';
  options.headers = {
	'Content-Type': 'application/json',
	Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };
  vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

module.exports = vcxroom;
