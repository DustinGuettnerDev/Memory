import { importOutOfLocalStorage } from "./localStorage";
let settingsGameTheme: string;
let settingsPlayerColor: string;
let settingsBoardSize: string;

/**
 * Initializes the game page.
 */
async function initGame() {
    loadSettings();
    initButtons();
    await addTheme(settingsGameTheme);
    await import("../styles/pages/_game.scss");
}

/**
 * Loads the saved game settings from local storage.
 */
function loadSettings() {
    settingsGameTheme = importOutOfLocalStorage("settings-game-theme");
    settingsPlayerColor = importOutOfLocalStorage("settings-player-color");
    settingsBoardSize = importOutOfLocalStorage("settings-board-size");
    console.log(settingsGameTheme, settingsPlayerColor, settingsBoardSize);
}

/**
 * Loads the stylesheet for the selected game theme.
 * @param gameTheme - The theme name stored in local storage.
 */
async function addTheme(gameTheme: string) {
    if (gameTheme === "Code vibes theme") {
        await import("../styles/themes/_code-vibes.scss");
    } else if (gameTheme === "Gaming theme") {
        await import("../styles/themes/_gaming.scss");
        adjustmentsGamingTheme();
    }
}

/**
 * Removes score color names that are not displayed by the Gaming theme.
 */
function adjustmentsGamingTheme() {
    const playscoreColorNames = document.querySelectorAll(".playscore .playscore__color-name");
    playscoreColorNames.forEach((el) => {
        el.remove();
    });
}

function initButtons() {
    const quitGameButtonRef = document.getElementById("quit-game-button-id")!;
    const dialogRef = document.getElementById("quit-game-dialog-id")! as HTMLDialogElement;

    quitGameButtonRef.addEventListener("click", () => {
        dialogRef.showModal();
    });
}

initGame();
