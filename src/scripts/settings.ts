import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";
import { saveInLocalStorage } from "./localStorage";
let settingsArray: string[] = ["", "", ""];

const formObject = {
    "settings-theme-form-id": "start-board-game-theme-id",
    "settings-player-color-form-id": "start-board-player-color-id",
    "settings-board-size-form-id": "start-board-board-size-id",
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
    const formObjectKeys = Object.keys(formObject);
    const formObjectValue = Object.values(formObject);

    for (let index = 0; index < formObjectKeys.length; index++) {
        initFormRadioSelection(formObjectKeys[index], formObjectValue[index], index);
    }
}

function initFormRadioSelection(formId: string, outputId: string, index: number) {
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

            function setValues() {
                actualValue = clickedLabel!.innerText;
                settingsArray[index] = actualValue;
                const keyName = Object.keys(formObject)[index].replace("-form-id", "");
                saveInLocalStorage(keyName, actualValue);
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
