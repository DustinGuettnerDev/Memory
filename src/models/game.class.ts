import { cardPaths } from "../constants/card-paths";
import { Card } from "./card.class";

export class Game {
    private cardBoardRef: HTMLElement;
    private cardLogoPool: string[] = [];
    private cardPaths = cardPaths;

    constructor(
        private readonly gameTheme: "codeVibes" | "gaming",
        private readonly playerColor: string,
        private readonly boardSize: string,
    ) {
        this.cardBoardRef = document.getElementById("cardboard-id")!;
        this.initGame();
    }

    initGame() {}

    addRandomCardLogoPathToArray() {
        let usedIndex: number[] = [];
        let logoBackPaths = cardPaths[this.gameTheme]["backs"];
        logoBackPaths.forEach(() => {
            let randomIndex = createRandomIndex();
            usedIndex.push(randomIndex);
            this.cardLogoPool.push(Object.entries(logoBackPaths)[randomIndex][1]);

            function createRandomIndex() {
                let randomIndex = Math.round(Math.random() * (logoBackPaths.length - 1));
                if (usedIndex.includes(randomIndex)) {
                    return createRandomIndex();
                }
                return randomIndex;
            }
        });
    }

    renderCards() {
        for (let index = 0; index < this.boardSize.length; index++) {
            this.cardBoardRef!.innerHTML += new Card();
        }
    }
}
