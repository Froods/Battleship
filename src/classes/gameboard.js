import { Ship } from './ship';

class Gameboard {
	constructor() {
		this.gameGrid = [
			// 0 = water, 1 = ship, 2 = hit ship, 3 = hit water
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		this.ships = [];
	}

	placeShip(x, y, dir, len) {
		if (x < 0 || x > 9 || y < 0 || y > 9) {
			throw new Error('Ship can only be placed inside grid');
		}

		/// Check if ship is inside grid
		// Horizontal
		if (dir === 0) {
			if (x + len - 1 > 9) {
				throw new Error('Ship reaches outside grid');
			}
		}
		// Vertical
		if (dir === 1) {
			if (y + len - 1 > 9) {
				throw new Error('Ship reaches outside grid');
			}
		}

		/// Check if ship is on top of another ship
		for (let i = 0; i < len; i++) {
			// Horizontal
			if (dir === 0) {
				let curX = x + i;
				if (this.gameGrid[y][curX] !== 0) {
					throw new Error('Ships cannot be placed on top of eachother');
				}
			}

			// Vertical
			if (dir === 1) {
				let curY = y + i;
				if (this.gameGrid[curY][x] !== 0) {
					throw new Error('Ships cannot be placed on top of eachother');
				}
			}
		}

		/// Place ship
		for (let i = 0; i < len; i++) {
			// Horizontal
			if (dir === 0) {
				let curX = x + i;
				this.gameGrid[y][curX] = 1;
			}

			// Vertical
			if (dir === 1) {
				let curY = y + i;
				this.gameGrid[curY][x] = 1;
			}
		}
		this.ships.push(new Ship(x, y, dir, len));
		return true;
	}

	receiveAttack(x, y) {
		// Check if square has already been attacked
		if (this.gameGrid[y][x] !== 0 && this.gameGrid[y][x] !== 1) {
			throw new Error('Cannot attack sqaure twice!');
		}

		// Check if ship is hit
		for (let i = 0; i < this.ships.length; i++) {
			const curShip = this.ships[i];

			// Horizontal ship
			if (curShip.dir === 0) {
				// Check if y value is right
				if (curShip.y !== y) {
					continue;
				}

				// Check for ship at x coordinate
				for (let j = 0; j < curShip.len; j++) {
					if (x === curShip.x + j) {
						this.gameGrid[y][x] = 2;
						curShip.hit();
						return true;
					}
				}
			}

			// Vertical ship
			if (curShip.dir === 1) {
				// Check if x value is right
				if (curShip.x !== x) {
					continue;
				}

				// Check for ship at y coordinate
				for (let j = 0; j < curShip.len; j++) {
					if (y === curShip.y + j) {
						this.gameGrid[y][x] = 2;
						curShip.hit();
						return true;
					}
				}
			}
		}

		// Hit water
		this.gameGrid[y][x] = 3;
		return true;
	}

	allShipsSunk() {
		if (this.ships.length === 0) {
			throw new Error('Gameboard contains no ships');
		}

		for (let i = 0; i < this.ships.length; i++) {
			const curShip = this.ships[i];
			if (!curShip.isSunk()) {
				return false;
			}
		}

		return true;
	}
}

export { Gameboard };
