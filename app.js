
var spiDev = "/dev/spidev0.0";
var cePin = 15; //RPI_BPLUS_GPIO_J8_15
var irqPin = null;
var channel = 0x5a; //90

var radio = require('nrf').connect(spiDev, cePin, irqPin);

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
