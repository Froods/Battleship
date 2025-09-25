// Ship class

class Ship {
	constructor(x, y, dir, len) {
		this.dir = dir; // 0 = horizontal, 1 = vertical
		this.x = x;
		this.y = y;
		this.len = len;
		this.hits = 0;
	}

	hit() {
		this.hits++;
	}

	isSunk() {
		if (this.len <= this.hits) {
			return true;
		}
		return false;
	}
}

export { Ship };
