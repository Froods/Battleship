import { Ship } from '../src/classes/ship';
import { Gameboard } from '../src/classes/gameboard';

// Ship tests
test('Is hit', () => {
	const ship = new Ship(4, 0, 0, 4);
	ship.hit();
	expect(ship.hits).toBe(1);
});

test('Is sunk', () => {
	const ship = new Ship(4, 0, 0, 2);
	ship.hit();
	expect(ship.isSunk()).toBeFalsy();
	ship.hit();
	expect(ship.isSunk()).toBeTruthy();
});

// Gameboard tests
test('Place ship at', () => {
	const gameboard = new Gameboard();
	gameboard.placeShip(0, 0, 0, 3);
	expect(gameboard.ships[0]).toEqual(new Ship(0, 0, 0, 3));

	expect(() => gameboard.placeShip(0, 0, 0, 3)).toThrow();

	expect(() => gameboard.placeShip(1, 0, 1, 3)).toThrow();

	expect(() => gameboard.placeShip(8, 0, 0, 3)).toThrow();

	expect(() => gameboard.placeShip(0, 8, 1, 3)).toThrow();

	expect(gameboard.placeShip(3, 3, 0, 3)).toBeTruthy();
});

test('receiveAttack()', () => {
	const gameboard = new Gameboard();
	gameboard.placeShip(3, 4, 0, 3);

	gameboard.receiveAttack(4, 4);

	expect(gameboard.gameGrid[4][4]).toBe(2);

	gameboard.receiveAttack(8, 8);

	expect(gameboard.gameGrid[8][8]).toBe(3);

	expect(() => gameboard.receiveAttack(4, 4)).toThrow();

	expect(() => gameboard.receiveAttack(8, 8)).toThrow();
});

test('allShipsSunk()', () => {
	const gameboard = new Gameboard();
	gameboard.placeShip(0, 0, 0, 3);
	gameboard.receiveAttack(0, 0);
	gameboard.receiveAttack(1, 0);
	expect(gameboard.allShipsSunk()).toBeFalsy();

	gameboard.receiveAttack(2, 0);
	expect(gameboard.allShipsSunk()).toBeTruthy();
});
