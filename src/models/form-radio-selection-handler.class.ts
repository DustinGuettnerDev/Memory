import { createFigure1 } from "../scripts/templates";
import { saveInLocalStorage } from "../scripts/localStorage";

/**
 * Handles form radio selection logic for settings.
 */
export class FormRadioSelectionHandler {
    private static readonly settingsObject: Record<string, string> = {
        "settings-game-theme": "codeVibes",
        "settings-player-color": "blue",
        "settings-board-size": "16",
    };

    private static readonly gameThemePathObject: Record<string, string> = {
        codeVibes: "/assets/imgs/settings/theme/code-vibes-preview.png",
        gaming: "/assets/imgs/settings/theme/gaming-preview.png",
    };

    private formRef: HTMLElement;
    private labelArray: NodeListOf<HTMLLabelElement>;
    private outputRef: HTMLElement;
    private startBoardThemeRef: HTMLElement;
    private startBoardPlayerRef: HTMLElement;
    private startBoardSizeRef: HTMLElement;
    private startBoardRef: HTMLElement;
    private previewImageRef: HTMLImageElement;
    private startLinkRef: HTMLElement;

    /**
     * Creates a handler for one settings radio form.
     * @param formId - The ID of the settings form.
     * @param outputId - The ID of the element displaying the selected value.
     * @param key - The local storage key for the selected setting.
     */
    constructor(
        formId: string,
        outputId: string,
        private key: string,
    ) {
        this.formRef = document.getElementById(formId)!;
        this.labelArray = this.formRef.querySelectorAll("label");
        this.outputRef = document.getElementById(outputId)!;
        this.startBoardThemeRef = document.getElementById("start-board-game-theme-id")!;
        this.startBoardPlayerRef = document.getElementById("start-board-player-color-id")!;
        this.startBoardSizeRef = document.getElementById("start-board-board-size-id")!;
        this.startBoardRef = document.getElementById("start-board-id")!;
        this.previewImageRef = document.getElementById("preview-img-id") as HTMLImageElement;
        this.startLinkRef = document.getElementById("start-board-button-id")!;

        this.initStartLink();
        this.formRef.addEventListener("change", (event) => this.handleChange(event));
    }

    /**
     * Handles a changed radio button.
     */
    private handleChange(event: Event) {
        if (!(event.target instanceof HTMLInputElement)) return;

        const actualValue = event.target.value;
        const clickedLabel = event.target.closest("label")!;

        this.setValues(actualValue, clickedLabel);
        this.addOrnamentToSelectedSetting(clickedLabel);
        this.checkIfAllSettingsAreSet();

        if (this.key === "settings-game-theme") {
            this.updatePreviewImg(actualValue);
        }
    }

    /**
     * Stores the selected value and updates the preview text.
     */
    private setValues(actualValue: string, clickedLabel: HTMLLabelElement) {
        FormRadioSelectionHandler.settingsObject[this.key] = actualValue;
        saveInLocalStorage(this.key, actualValue);
        this.outputRef.innerText = clickedLabel.innerText;
    }

    /**
     * Shows the selection ornament on the selected label.
     */
    private addOrnamentToSelectedSetting(clickedLabel: Element | null) {
        this.labelArray.forEach((element) => {
            element.querySelector(".figure1")?.remove();
        });
        clickedLabel?.insertAdjacentHTML("beforeend", createFigure1({}));
    }

    /**
     * Replaces preview dividers after all settings are selected.
     */
    private checkIfAllSettingsAreSet() {
        if (
            this.startBoardThemeRef.innerText !== "Game theme" &&
            this.startBoardPlayerRef.innerText !== "Player" &&
            this.startBoardSizeRef.innerText !== "Board size"
        ) {
            this.addOrnamentsToStartBoard();
            this.activateStartLink();
        }
    }

    /**
     * Enables the link used to start the game.
     */
    private activateStartLink() {
        this.startLinkRef.classList.add("enabled");
    }

    /**
     * Replaces the decorative lines on the start board.
     */
    private addOrnamentsToStartBoard() {
        this.startBoardRef.querySelectorAll(".start-board__line").forEach((element) => {
            element.outerHTML = createFigure1({
                rotate: 105,
                reverse: true,
                lineWidth: 50,
                lineHeight: 3,
            });
        });
    }

    /**
     * Updates the theme preview image for the selected game theme.
     */
    private updatePreviewImg(gameThemeValue: string) {
        this.previewImageRef.src = FormRadioSelectionHandler.gameThemePathObject[gameThemeValue];
    }

    /**
     * Registers navigation from the settings page to the game page.
     */
    private initStartLink() {
        this.startLinkRef.classList.add("disabled");
        this.startLinkRef.addEventListener("click", () => {
            window.location.href = "/game.html";
        });
    }
}
