import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";
import { Helper } from "./helper.class";

/**
 * Manages the card pool and initialization of a memory game.
 */
export class Game {
    private readonly cardBoardRef: HTMLElement;
    private cardBackPool: string[] = [];
    private cardFront = "";
    private readonly cardPaths = cardPaths;
    private readonly cardsPairAmount = 2;
    private playersTurn;
    private gameEnd = false;
    private lastTwoCards: HTMLElement[] = [];
    private timesPickedACard = 0;
    private score = {
        blue: 0,
        yellow: 0,
    };

    /**
     * Creates and initializes a game.
     * @param gameTheme - The selected visual theme.
     * @param playerColor - The selected player color.
     * @param boardSize - The number of cards on the game board.
     */
    constructor(
        private readonly gameTheme: "codeVibes" | "gaming",
        playerColor: "blue" | "yellow",
        private readonly boardSize: number,
    ) {
        this.cardBoardRef = document.getElementById("cardboard-id")!;
        this.initGame();
        this.playersTurn = playerColor;
    }

    /**
     * Initializes the game.
     */
    private async initGame() {
        this.settAllScoreToZero();
        this.addCardLogos();
        this.cardBackPool = Helper.shuffleArray(this.cardBackPool);
        this.renderCards();
        this.changeCardsInRowAmount();
        this.initCardButtons();
    }

    /**
     * Adds the front logo and the shuffled pair logos to the card pool.
     */
    private addCardLogos() {
        this.addFrontLogo();
        this.addBackLogosToArray();
    }

    /**
     * Loads the selected front logo path for the current theme.
     */
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

    /**
     * Renders all memory cards onto the board.
     */
    private renderCards() {
        for (let index = 0; index < this.boardSize; index++) {
            const card = new Card(this.cardFront, this.cardBackPool[index]);
            this.cardBoardRef.innerHTML += card.render();
        }
    }

    /**
     * Applies the correct row layout depending on board size.
     */
    private changeCardsInRowAmount() {
        this.cardBoardRef.classList.toggle("row-of-four", this.boardSize === 16);
        this.cardBoardRef.classList.toggle("row-of-six", this.boardSize !== 16);
    }

    private async initCardButtons() {
        this.cardBoardRef.addEventListener("click", (event) => {
            const cardButtonRef = (event.target as HTMLElement).closest("button");
            if (!cardButtonRef) return;

            cardButtonRef.classList.add("selected-card"); // rotates a card
            /*hier müssen noch alle cardbuttons deaktiviert werden und erst nach der zeit beim delay wieder 
            aktiviert werden*/

            this.timesPickedACard += 1;
            this.lastTwoCards.push(cardButtonRef); //put the cards path in an array
            this.changePlayerOrNextTurn();
            console.log(this.playersTurn);
        });
    }

    private async changePlayerOrNextTurn() {
        if (this.timesPickedACard < 2) {
            if (this.checkCardForTag(this.lastTwoCards)) {
                this.clearSelectedCards();
                this.getAPoint();
            }
        } else {
            this.playersTurn === "blue" ? (this.playersTurn = "yellow") : (this.playersTurn = "blue");
            await Helper.delay(2000);
            this.resetSelectedCards();
            this.clearSelectedCards();
        }
    }

    private resetSelectedCards() {
        this.lastTwoCards.forEach((el) => el.classList.remove("selected-card"));
    }

    private clearSelectedCards() {
        this.timesPickedACard = 0;
        this.lastTwoCards.length = 0;
    }

    private setScore(color: "blue" | "yellow" = this.playersTurn) {
        document.getElementById(`playscore-${color}-count-id`)!.innerText = String(this.score[color]);
    }

    private getAPoint() {
        this.score[this.playersTurn] += 1;
        this.setScore(this.playersTurn);
    }

    private settAllScoreToZero() {
        const array: ["blue", "yellow"] = ["blue", "yellow"];
        array.forEach((el) => {
            this.score[el] = 0;
            this.setScore(el);
        });
    }

    private checkCardForTag(array: HTMLElement[]) {
        if (array[0] === array[1]) return true;
        return false;
    }
}
