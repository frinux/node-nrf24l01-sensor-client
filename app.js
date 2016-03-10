//Requirements
var amqp = require('amqplib');
var when = require('when');
var util = require('util');
var http = require('http');
var nrf = require('nrf');

//Socket.io init
var express = require('express'), app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

//Configuration
var amqp_server = 'localhost';
var amqp_channel = 'teleinfo';
var port = 8082;
var amqp_publish_frequency = 60000;
var debug = true;

//NRF24 Configuration
var spiDev = "/dev/spidev0.0";
var cePin = 15; //RPI_BPLUS_GPIO_J8_15
var irqPin = null;
var channel = 0x5a; //90

//nrf24l01+ init
var radio = nrf.connect(spiDev, cePin, irqPin);

radio
	.channel(channel)
	.dataRate('1Mbps')
	.crcBytes(1)
//	.autoRetransmit({count:15, delay:4000})
	;

radio.begin(function () {
    var rx = radio.openPipe('rx', 0xcccccccc3c);
    rx.pipe(process.stdout);
});

//TODO: send to AMQP

//TODO: send to socket.io