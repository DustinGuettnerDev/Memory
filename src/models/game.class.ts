import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";
import { Helper } from "./helper.class";

/**
 * Manages the card pool and initialization of a memory game.
 */
export class Game {
    private readonly cardBoardRef;
    private readonly gameOverRef;
    private readonly gameOverWinningPlayerRef;
    private readonly gameOverWinningsPlayerIconRef;
    private cardBackPool: string[] = [];
    private cardFront = "";
    private readonly cardPaths = cardPaths;
    private readonly cardsPairAmount = 2;
    private playersTurn;
    private gameEnd = false;
    private lastTwoCards: HTMLElement[] = [];
    private timesPickedACard = 0;
    private allCards;
    private winner = "";
    private gameOverIcon = "";
    private gameOverPlayerColor = "";
    private score = {
        blue: 0,
        orange: 0,
    };

    /**
     * Creates and initializes a game.
     * @param gameTheme - The selected visual theme.
     * @param playerColor - The selected player color.
     * @param boardSize - The number of cards on the game board.
     */
    constructor(
        private readonly gameTheme: "codeVibes" | "gaming",
        playerColor: "blue" | "orange",
        private readonly boardSize: number,
    ) {
        this.cardBoardRef = document.getElementById("cardboard-id")!;
        this.gameOverRef = document.getElementById("game-over-dialog-id")! as HTMLDialogElement;
        this.gameOverWinningPlayerRef = document.getElementById("game-results-winning-player-id")!;
        this.gameOverWinningsPlayerIconRef = document.getElementById("game-results-winning-player-icon-id")!;
        this.initGame();
        this.playersTurn = playerColor;
        this.allCards = document.querySelectorAll<HTMLButtonElement>("button.card");
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

    /**
     * Attaches click handlers to each generated card button.
     */
    private async initCardButtons() {
        this.cardBoardRef.addEventListener("click", (event) => {
            const cardButtonRef = (event.target as HTMLElement).closest("button");
            if (!cardButtonRef) return;

            cardButtonRef.classList.add("selected-card");
            this.timesPickedACard += 1;
            this.lastTwoCards.push(cardButtonRef);
            this.handleTurnResult();
        });
    }

    /**
     * Evaluates the current turn and updates the player state, score, and card selection.
     */
    private async handleTurnResult() {
        this.awardPointOnPairMatch();
        await this.switchPlayerIfTurnComplete();
        this.endGameIfAllCardsFound();
    }

    /**
     * Clears the selection and scores a point when the last two cards match.
     */
    private awardPointOnPairMatch() {
        if (!this.isPairMatch(this.lastTwoCards)) return;
        this.clearSelectedCards();
        this.getAPoint();
    }

    /**
     * Switches to the other player and resets the selection once two cards were picked.
     */
    private async switchPlayerIfTurnComplete() {
        if (this.timesPickedACard < 2) return;

        this.playersTurn === "blue" ? (this.playersTurn = "orange") : (this.playersTurn = "blue");
        this.toggleCardButtons({ isDisabled: true });
        await Helper.delay(1000);
        this.resetSelectedCards();
        this.clearSelectedCards();
        this.toggleCardButtons({ isDisabled: false });
    }

    /**
     * Determines the winner and opens the game-over dialog once every card is found.
     */
    private endGameIfAllCardsFound() {
        //if (!this.allCardsAreFound()) return;

        this.winner = this.isWinner();
        this.setGameOverImgPath();
        this.setGameOverPlayerColor();
        this.gameOverRef.showModal();
    }

    /**
     * Removes the selected-card class from the two most recently picked cards.
     */
    private resetSelectedCards() {
        this.lastTwoCards.forEach((el) => el.classList.remove("selected-card"));
    }

    /**
     * Resets the temporary turn state after a comparison or delay.
     */
    private clearSelectedCards() {
        this.timesPickedACard = 0;
        this.lastTwoCards.length = 0;
    }

    /**
     * Updates the score display for a player color.
     * @param color - The player whose score should be rendered.
     */
    private setScore(color: "blue" | "orange" = this.playersTurn) {
        document.querySelectorAll<HTMLElement>(`.playscore__${color}-count`).forEach((el) => (el.innerText = String(this.score[color])));
    }

    /**
     * Adds one point to the current player and refreshes the score display.
     */
    private getAPoint() {
        this.score[this.playersTurn] += 1;
        this.setScore(this.playersTurn);
    }

    /**
     * Resets both players' scores to zero and updates the UI.
     */
    private settAllScoreToZero() {
        const array: ["blue", "orange"] = ["blue", "orange"];
        array.forEach((el) => {
            this.score[el] = 0;
            this.setScore(el);
        });
    }

    /**
     * Checks whether the last two selected cards show the same back image.
     * @param array - The two selected card buttons.
     * @returns True when both cards match.
     */
    private isPairMatch(array: HTMLElement[]) {
        const cardPaths = array.map((el) => (el.querySelector(".card__back") as HTMLImageElement).src);
        if (cardPaths[0] == cardPaths[1]) return true;
        return false;
    }

    /**
     * Enables or disables all card buttons.
     * @param isDisabled - Whether the buttons should be disabled.
     */
    private toggleCardButtons({ isDisabled }: { isDisabled: boolean }) {
        this.allCards.forEach((button) => {
            button.disabled = isDisabled;
        });
    }

    /**
     * Checks whether every card has been marked as selected.
     * @returns True when all cards in the board are selected.
     */
    private allCardsAreFound() {
        return Array.from(this.allCards).every((card) => card.classList.contains("selected-card"));
    }

    /**
     * Determines the winner based on the current score.
     * @returns "blue", "orange" or "draw".
     */
    private isWinner() {
        const blueScore = this.score.blue;
        const orangeScore = this.score.orange;

        if (blueScore === orangeScore) {
            return "draw";
        }

        if (blueScore > orangeScore) {
            return "blue";
        }

        return "orange";
    }

    /**
     * Applies the CSS class for the winner's result image.
     */
    private setGameOverImgPath() {
        this.gameOverWinningsPlayerIconRef.classList.toggle("game-results__winning-player-icon-blue", this.winner === "blue");
        this.gameOverWinningsPlayerIconRef.classList.toggle("game-results__winning-player-icon-orange", this.winner === "orange");
        this.gameOverWinningsPlayerIconRef.classList.toggle("game-results__winning-player-icon-draw", this.winner === "draw");
    }

    /**
     * Updates the winner label and applies the winner's color class.
     */
    private setGameOverPlayerColor() {
        this.gameOverWinningPlayerRef.innerText = this.winner === "draw" ? "DRAW" : `${this.winner.toUpperCase()} PLAYER`;
        this.gameOverWinningPlayerRef.classList.toggle("game-results__winning-player-blue", this.winner === "blue");
        this.gameOverWinningPlayerRef.classList.toggle("game-results__winning-player-orange", this.winner === "orange");
    }
}
