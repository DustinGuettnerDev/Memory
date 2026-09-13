import { importOutOfLocalStorage } from "./localStorage";
import { Game } from "../models/game.class";
let gameTheme = importOutOfLocalStorage("settings-game-theme");
let playerColor = importOutOfLocalStorage("settings-player-color");
let boardSize = Number(importOutOfLocalStorage("settings-board-size"));

const exitButtonRef = document.getElementById("exit-game-link-id");
const backButtonRef = document.getElementById("back-to-game-button-id");

/**
 * Initializes the game page.
 */
async function initGame() {
    initButtons();
    await addTheme(gameTheme);
    await import("../styles/pages/_game.scss");
    const game = new Game(gameTheme, playerColor, boardSize);
    console.log(boardSize, playerColor, gameTheme);
}

/**
 * Loads the stylesheet for the selected game theme.
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
 * Initializes the quit dialog and its buttons.
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
