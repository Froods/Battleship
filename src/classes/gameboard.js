import { Ship } from './ship';

class Gameboard {
	constructor() {
		this.gameGrid = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		];

		this.ships = [];
	}

	placeShip(coords, len) {
		let checkingPositions = [];

		for (let i = 0; i < this.ships.length; i++) {
			checkingPositions.length = 0;

			checkingPositions = [...this.ships[i][1]];

			for (let j = 0; j < len; j++) {
				for (let k = 0; k < checkingPositions.length; k++) {
					if (
						coords[0] + j === checkingPositions[k][0] &&
						coords[1] === checkingPositions[k][1]
					) {
						return false;
					}
				}
			}
		}

		let positionsTaken = [];

		for (let i = 0; i < len; i++) {
			if (i === 0) {
				positionsTaken.push(coords);
				continue;
			}
			positionsTaken.push([coords[0] + i, coords[1]]);
		}

		this.ships.push([new Ship(len, 0), positionsTaken]);
		return true;
	}
}

export { Gameboard };
