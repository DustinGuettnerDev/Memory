import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";
import { saveInLocalStorage } from "./localStorage";

const settingsObject: Record<string, string> = {
    "settings-game-theme": "",
    "settings-player-color": "",
    "settings-board-size": "",
};

const gameThemePathObject: Record<string, string> = {
    "Code vibes theme": "public/assets/imgs/settings/theme/code-vibes-preview.png",
    "Gaming theme": "public/assets/imgs/settings/theme/gaming-preview.png",
};

function initSettings(): void {
    loadTemplates();
    initForms();
    initStartButton();
}

function loadTemplates(): void {
    const headline1Ref = document.getElementById("headline1-id");

    if (headline1Ref) {
        headline1Ref.innerHTML += createFigure1({ lineWidth: 215, shift: -15 });
    }
}

function initForms() {
    initFormRadioSelection("settings-theme-form-id", "start-board-game-theme-id", "settings-game-theme");
    initFormRadioSelection("settings-player-color-form-id", "start-board-player-color-id", "settings-player-color");
    initFormRadioSelection("settings-board-size-form-id", "start-board-board-size-id", "settings-board-size");
}

function initFormRadioSelection(formId: string, outputId: string, key: string) {
    const formRef = document.getElementById(formId)!;
    const labelArray = formRef.querySelectorAll("label");
    const startBoardThemeRef = document.getElementById("start-board-game-theme-id")!;
    const startBoardPlayerRef = document.getElementById("start-board-player-color-id")!;
    const startBoardSizeRef = document.getElementById("start-board-board-size-id")!;
    const startBoardRef = document.getElementById("start-board-id")!;
    const outputRef = document.getElementById(outputId)!;
    let actualValue: string;

    clickHandler();

    function clickHandler() {
        formRef.addEventListener("change", (event) => {
            const clickedLabel = event.target instanceof Element ? event.target.closest("label") : null;
            if (!clickedLabel) return;
            setValues();
            addOrnamentToSelectedSetting();
            addOrnamentsToStartBoard();
            if (key !== "settings-game-theme") return;
            updatePreviewImg();

            function setValues() {
                actualValue = clickedLabel!.querySelector("input")!.value;
                settingsObject[key] = actualValue;
                saveInLocalStorage(key, actualValue);
                outputRef.innerText = actualValue;
            }

            function addOrnamentToSelectedSetting() {
                labelArray.forEach((el) => {
                    el.querySelector(".figure1")?.remove();
                });
                clickedLabel!.insertAdjacentHTML("beforeend", createFigure1({}));
            }

            function addOrnamentsToStartBoard() {
                if (
                    !(startBoardThemeRef.innerText == "Game theme") &&
                    !(startBoardPlayerRef.innerText == "Player") &&
                    !(startBoardSizeRef.innerText == "Board size")
                ) {
                    startBoardRef.querySelectorAll(".start-board__line").forEach((el) => {
                        el.outerHTML = createFigure1({
                            rotate: 105,
                            reverse: true,
                            lineWidth: 50,
                            lineHeight: 3,
                        });
                    });
                }
            }

            function updatePreviewImg() {
                const previewImageRef = document.getElementById("preview-img-id") as HTMLImageElement;
                const gameThemeValue = settingsObject[key];
                previewImageRef.src = gameThemePathObject[gameThemeValue];
            }
        });
    }
}

function initStartButton() {
    const startButtonRef = document.getElementById("start-board-button-id")!;
    startButtonRef.addEventListener("click", () => {
        window.location.href = "/game.html";
    });
}

initSettings();
