import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";
import { Helper } from "./helper.class";

/**
 * Manages the card pool and initialization of a memory game.
 */
export class Game {
    private readonly cardBoardRef: HTMLElement;
    private cardLogoPool: string[] = [];
    private readonly cardPaths = cardPaths;
    private readonly cardsPairAmount = 2;

    /**
     * Creates and initializes a game.
     * @param gameTheme - The selected visual theme.
     * @param playerColor - The selected player color.
     * @param boardSize - The number of cards on the game board.
     */
    constructor(
        private readonly gameTheme: "codeVibes" | "gaming",
        private readonly playerColor: string,
        private readonly boardSize: number,
    ) {
        this.cardBoardRef = document.getElementById("cardboard-id")!;
        this.initGame();
    }

    /**
     * Initializes the game.
     */
    private initGame() {
        this.addRandomCardLogoPathToArray();
        this.cardLogoPool = Helper.shuffleArray(this.cardLogoPool);
    }

    /**
     * Adds randomly selected card logo paths to the pool in pairs.
     */
    private addRandomCardLogoPathToArray() {
        let usedIndex: number[] = [];
        let logoBackPaths = cardPaths[this.gameTheme]["backs"];
        for (let index = 0; index < this.boardSize / 2; index++) {
            let randomIndex = Helper.getRandomNumberNoDuplicates(usedIndex, logoBackPaths.length - 1);
            usedIndex.push(randomIndex);
            let i = 0;
            while (i < this.cardsPairAmount) {
                this.cardLogoPool.push(Object.entries(logoBackPaths)[randomIndex][1]);
                i++;
            }
        }
    }

    /*private renderCards() {
        for (let index = 0; index < this.boardSize.length; index++) {
            this.cardBoardRef!.innerHTML += new Card();
        }
    } */
}
