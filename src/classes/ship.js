// Ship class

class Ship {
	constructor(length, hits) {
		this.length = length;
		this.hits = hits;
	}

	hit() {
		this.hits++;
	}

	isSunk() {
		if (this.length <= this.hits) {
			return true;
		}
		return false;
	}
}

export { Ship };
