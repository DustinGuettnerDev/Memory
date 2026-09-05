import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";

const formObject = {
    "settings-theme-form-id": "start-board-game-theme-id",
    "settings-player-color-form-id": "start-board-player-color-id",
    "settings-board-size-form-id": "start-board-board-size-id",
};

function initSettings(): void {
    loadTemplates();
    initForms();
}

function loadTemplates(): void {
    const headline1Ref = document.getElementById("headline1-id");

    if (headline1Ref) {
        headline1Ref.innerHTML += createFigure1({ lineWidth: 215, shift: -15 });
    }
}

function initForms() {
    for (const [key, value] of Object.entries(formObject)) {
        initFormRadioSelection(key, value);
    }
}

function initFormRadioSelection(formId: string, outputId: string) {
    const formRef = document.getElementById(formId)!;
    const labelArray = formRef.querySelectorAll("label");
    const outputRef = document.getElementById(outputId)!;
    let answereObject: Record<string, string> = {};
    let actualValue: string;
    fillAnswereObject();
    clickHandler();

    function fillAnswereObject() {
        for (const labelRef of labelArray) {
            const inputRef = labelRef.querySelector("input")!;
            answereObject[inputRef.value] = labelRef.textContent;
        }
    }

    function clickHandler() {
        formRef.addEventListener("click", (event) => {
            const clickedLabel =
                event.target instanceof Element
                    ? event.target.closest("label")
                    : null;
            if (!clickedLabel) return;

            actualValue = clickedLabel.querySelector("input")!.value;

            outputRef.innerText = answereObject[actualValue];

            labelArray.forEach((el) => {
                el.querySelector(".figure1")?.remove();
            });
            clickedLabel.innerHTML += createFigure1({});
        });
    }
}

initSettings();
