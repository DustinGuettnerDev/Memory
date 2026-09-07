import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";
import { saveInLocalStorage } from "./localStorage";

const settingsObject: Record<string, string> = {
    "settings-game-theme": "Code vibes theme",
    "settings-player-color": "Blue",
    "settings-board-size": "16 cards",
};

const gameThemePathObject: Record<string, string> = {
    "Code vibes theme": "/assets/imgs/settings/theme/code-vibes-preview.png",
    "Gaming theme": "/assets/imgs/settings/theme/gaming-preview.png",
};

/**
 * Initializes the settings page.
 */
function initSettings(): void {
    loadTemplates();
    initForms();
    initStartButton();
}

/**
 * Adds decorative templates to the settings page.
 */
function loadTemplates(): void {
    const headline1Ref = document.getElementById("headline1-id");

    if (headline1Ref) {
        headline1Ref.innerHTML += createFigure1({ lineWidth: 215, shift: -15 });
    }
}

/**
 * Initializes all settings selection forms.
 */
function initForms() {
    initFormRadioSelection("settings-game-theme-form-id", "start-board-game-theme-id", "settings-game-theme");
    initFormRadioSelection("settings-player-color-form-id", "start-board-player-color-id", "settings-player-color");
    initFormRadioSelection("settings-board-size-form-id", "start-board-board-size-id", "settings-board-size");
}

/**
 * Initializes selection handling for one settings form.
 * @param formId - The form element ID.
 * @param outputId - The preview output element ID.
 * @param key - The key used for the setting and local storage.
 */
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

    /**
     * Registers the change handler for the form's radio buttons.
     */
    function clickHandler() {
        formRef.addEventListener("change", (event) => {
            const targetInput = event.target! as HTMLInputElement;
            const actualValue = targetInput.value;
            const clickedLabel = targetInput.closest("label");

            setValues();
            addOrnamentToSelectedSetting();
            addOrnamentsToStartBoard();
            if (key !== "settings-game-theme") return;
            updatePreviewImg();

            /**
             * Stores the selected value and updates the preview text.
             */
            function setValues() {
                settingsObject[key] = actualValue;
                saveInLocalStorage(key, actualValue);
                outputRef.innerText = actualValue;
            }

            /**
             * Shows the selection ornament on the selected label.
             */
            function addOrnamentToSelectedSetting() {
                labelArray.forEach((el) => {
                    el.querySelector(".figure1")?.remove();
                });
                clickedLabel!.insertAdjacentHTML("beforeend", createFigure1({}));
            }

            /**
             * Replaces preview dividers after all settings are selected.
             */
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

            /**
             * Updates the theme preview image for the selected game theme.
             */
            function updatePreviewImg() {
                const previewImageRef = document.getElementById("preview-img-id") as HTMLImageElement;
                const gameThemeValue = settingsObject[key];
                previewImageRef.src = gameThemePathObject[gameThemeValue];
            }
        });
    }
}

/**
 * Registers navigation from the settings page to the game page.
 */
function initStartButton() {
    const startButtonRef = document.getElementById("start-board-button-id")!;
    startButtonRef.addEventListener("click", () => {
        window.location.href = "/game.html";
    });
}

initSettings();
