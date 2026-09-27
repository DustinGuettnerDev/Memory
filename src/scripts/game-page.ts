import "../styles/pages/_game.scss";
import { defaultGameSettings, supportedBoardSizes } from "../constants/game-settings";
import { importOutOfLocalStorage } from "./localStorage";
import { Game } from "../models/game.class";

const storedGameTheme = importOutOfLocalStorage("settings-game-theme");
const storedPlayerColor = importOutOfLocalStorage("settings-player-color");
const storedBoardSize = importOutOfLocalStorage("settings-board-size");
const gameTheme = storedGameTheme === "gaming" || storedGameTheme === "codeVibes" ? storedGameTheme : defaultGameSettings.theme;
const playerColor = storedPlayerColor === "orange" || storedPlayerColor === "blue" ? storedPlayerColor : defaultGameSettings.playerColor;
const boardSize =
    typeof storedBoardSize === "string"
        ? (supportedBoardSizes.find((size) => String(size) === storedBoardSize) ?? defaultGameSettings.boardSize)
        : defaultGameSettings.boardSize;
const exitButtonRef = document.getElementById("exit-game-link-id");
const backButtonRef = document.getElementById("back-to-game-button-id");

/**
 * Initializes the game page.
 */
async function initGame() {
    initButtons();
    await addTheme(gameTheme);
    await import("../styles/pages/_game.scss");
    new Game(gameTheme, playerColor, boardSize);
    console.log(boardSize, playerColor, gameTheme);
}

/**
 * Loads the selected theme stylesheet and applies its theme-specific UI settings.
 * @param gameTheme - The theme name stored in local storage.
 */
async function addTheme(gameTheme: string) {
    if (gameTheme === "codeVibes") {
        await import("../styles/themes/_code-vibes.scss");
        addTextQuitDialog({ textBack: "Back to game", textQuit: "Exit game" });
    } else if (gameTheme === "gaming") {
        await import("../styles/themes/_gaming.scss");
        removeColorNames();
        addTextQuitDialog({ textBack: "No, back to game", textQuit: "Yes, quit game" });
    }
}

/**
 * Removes score color names that are not displayed by the Gaming theme.
 */
function removeColorNames() {
    const playscoreColorNames = document.querySelectorAll(".playscore .playscore__color-name");
    playscoreColorNames.forEach((el) => {
        el.remove();
    });
}

/**
 * Updates the labels in the quit confirmation dialog.
 * @param textBack - The text for returning to the game.
 * @param textQuit - The text for leaving the game.
 */
function addTextQuitDialog({ textBack, textQuit }: { textBack: string; textQuit: string }) {
    backButtonRef!.innerText = textBack;
    exitButtonRef!.innerText = textQuit;
}

/**
 * Registers the quit dialog interactions for opening, closing, and backdrop clicks.
 */
function initButtons() {
    const quitGameButtonRef = document.getElementById("quit-game-button-id")!;
    const dialogRef = document.getElementById("quit-game-dialog-id")! as HTMLDialogElement;
    const backToGameButtonRef = document.getElementById("back-to-game-button-id")!;

    quitGameButtonRef.addEventListener("click", () => {
        dialogRef.showModal();
    });

    backToGameButtonRef.addEventListener("click", () => {
        dialogRef.close();
    });

    dialogRef.addEventListener("click", (event) => {
        if (event.target === dialogRef) {
            dialogRef.close();
        }
    });
}

initGame();
