import { importOutOfLocalStorage } from "./localStorage";
function initGame() {
    loadSettings();
}

function loadSettings() {
    const settingsGameTheme: string = importOutOfLocalStorage("settings-theme");
    const settingsPlayerColor: string = importOutOfLocalStorage("settings-player-color");
    const settingsBoardSize: string = importOutOfLocalStorage("settings-board-size");
    console.log(settingsGameTheme, settingsPlayerColor, settingsBoardSize);
}

initGame();
