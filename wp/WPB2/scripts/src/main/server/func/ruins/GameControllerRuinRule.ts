import GameController from "../GameController.js";

export default class GameControllerRuinRule{
    game: GameController;

    constructor(game: GameController) {
        this.game = game;
    }
    get client(){
        return this.game.client;
    }
}