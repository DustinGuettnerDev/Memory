import { importOutOfLocalStorage } from "./localStorage";

/**
 * Initializes the game page.
 */
function initGame() {
    loadSettings();
}

/**
 * Loads the saved game settings from local storage.
 */
function loadSettings() {
    const settingsGameTheme: string = importOutOfLocalStorage("settings-theme");
    const settingsPlayerColor: string = importOutOfLocalStorage("settings-player-color");
    const settingsBoardSize: string = importOutOfLocalStorage("settings-board-size");
    console.log(settingsGameTheme, settingsPlayerColor, settingsBoardSize);
}

initGame();
