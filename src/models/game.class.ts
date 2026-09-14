import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";
import { Helper } from "./helper.class";

/**
 * Manages the card pool and initialization of a memory game.
 */
export class Game {
    private readonly cardBoardRef: HTMLElement;
    private cardBackPool: string[] = [];
    private cardFront: string = "";
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
        this.addCardLogos();
        this.cardBackPool = Helper.shuffleArray(this.cardBackPool);
        this.renderCards();
        this.changeCardsInRowAmount();
    }

    private addCardLogos() {
        this.addFrontLogo();
        this.addBackLogosToArray();
    }

    private addFrontLogo() {
        this.cardFront = cardPaths[this.gameTheme]["front"];
    }

    /**
     * Adds randomly selected card logo paths to the pool in pairs.
     */
    private addBackLogosToArray() {
        let usedIndex: number[] = [];
        let logoBackPaths = cardPaths[this.gameTheme]["backs"];
        for (let index = 0; index < this.boardSize / 2; index++) {
            let randomIndex = Helper.getRandomNumberNoDuplicates(usedIndex, logoBackPaths.length - 1);
            usedIndex.push(randomIndex);
            let i = 0;
            while (i < this.cardsPairAmount) {
                this.cardBackPool.push(Object.entries(logoBackPaths)[randomIndex][1]);
                i++;
            }
        }
    }

    private renderCards() {
        for (let index = 0; index < this.boardSize; index++) {
            const card = new Card(this.cardFront, this.cardBackPool[index]);
            this.cardBoardRef.innerHTML += card.render();
        }
    }

    private changeCardsInRowAmount() {
        this.cardBoardRef.classList.toggle("row-of-four", this.boardSize === 16);
        this.cardBoardRef.classList.toggle("row-of-six", this.boardSize !== 16);
    }
}
