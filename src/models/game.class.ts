import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";

export class Game {
    cardBoardRef = document.getElementById("cardboard-id");
    cardLogoPool: string[] = [];

    constructor(
        private readonly gameTheme: string,
        private readonly playerColor: string,
        private readonly boardSize: string,
    ) {
        this.initGame();
    }

    initGame() {}
    /* 
    addRandomCardLogoPathToArray() {}

    renderCards() {
        for (let index = 0; index < this.boardSize.length; index++) {
            this.cardBoardRef!.innerHTML += new Card();
        }
    } */
}
