'use strict';

const robot = require('robotjs');
const gamepad = require('gamepad');
const config = require('./controller.json');
const modifiersArray = [
	'control',
	'shift',
	'command',
	'alt'
];

let delay = (n: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, n);
	});
};
gamepad.init(); // initialize the library
setInterval(gamepad.processEvents, 100);

setInterval(gamepad.detectDevices, 5000);
robot.setMouseDelay(0);
// Listeners
// Listen for move events on all gamepadswwwwaaad
let upAndDown = false;

gamepad.on('move', async (id: number, axis: number, value: number) => {
	console.log(axis, value);

	/*
	let mousePosition = robot.getMousePos();
	value = Number(value.toFixed(3));

	switch (axis) {
		case 0:
			// upAndDown && (await delay(1000)) && (upAndDown = !upAndDown);

			if (!upAndDown && value > 0.5) {
				upAndDown = true;

				setTimeout(() => {
					upAndDown = false;
				}, 1000);
			} else if (!upAndDown && value <= 0.5) {
				upAndDown = true;

				setTimeout(() => {
					upAndDown = false;
				}, 1000);
			} else {
			}
			upAndDown &&
				setTimeout(() => {
					upAndDown = false;
				}, 1000);
			// upAndDown = true;
			break;
		case 1:
			break;
		case 3:
			robot.moveMouse(mousePosition.x + value * 10, mousePosition.y);

			break;
		case 4:
			robot.moveMouse(mousePosition.x, mousePosition.y + value * 10);

			break;
		case 6:
			// robot.moveMouse(mousePosition.x + value * 20, mousePosition.y);
			if (value === 1) {
				robot.keyTap('right');
			} else if (value === -1) {
				robot.keyTap('left');
			}
			await delay(10);

			break;
		case 7:
			if (value === 1) {
				robot.keyTap('down');
			} else if (value === -1) {
				robot.keyTap('up');
			}
			await delay(10);
			break;
	}
	await delay(10);

	*/
});

// Listen for button down events on all gamepads
let modifier: string | null;
let pressed: boolean;
gamepad.on('down', async (id: number, num: number) => {
	pressed = true;

	do {
		let key = config[num] ? config[num] : null;
		num === 9 ? robot.mouseClick() : num === 10 && robot.mouseClick('right');
		if (modifier) {
			key && robot.keyTap(config[num], modifier);
			modifier = null;
		} else {
			modifiersArray.includes(config[num]) ? (modifier = config[num]) : (modifier = null);
			key && robot.keyTap(config[num]);
		}

		await delay(10);
	} while (pressed);
});
gamepad.on('up', function(id: number, num: number) {
	pressed = false; // stop the pressing of button
});
gamepad.on('attach', function(id: number, num: number) {
	console.log('Controller enabled.');
});
