import { Gameboard } from './gameboard';

class Player {
	constructor(type) {
		this.type = type; // 0 = Real player, 1 = PC
		this.gameboard = new Gameboard();
	}
}

export { Player };
