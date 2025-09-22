import { Ship } from '../src/classes/ship';
import { Gameboard } from '../src/classes/gameboard';

test('Is hit', () => {
	const ship = new Ship(4, 0);
	ship.hit();
	expect(ship.hits).toBe(1);
});

test('Is sunk', () => {
	const ship = new Ship(2, 0);
	ship.hit();
	expect(ship.isSunk()).toBeFalsy();
	ship.hit();
	expect(ship.isSunk()).toBeTruthy();
});

test('Place ship at', () => {
	// Place at ship
	const gameboard = new Gameboard();
	let coords = [4, 4];
	gameboard.placeShip(coords, 3);
	expect(gameboard.ships[0][0]).toEqual(new Ship(3, 0));
	// Don't allow ships to be placed on top of each other (use return values when checking, so we can keep track of turns later on)
	coords = [3, 4];
	expect(gameboard.placeShip(coords, 3)).toBeFalsy();
	coords = [3, 3];
	expect(gameboard.placeShip(coords, 3)).toBeTruthy();
});
