import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";

function initSettings(): void {
    loadTemplates();
}

function loadTemplates(): void {
    const headline1Ref = document.getElementById("headline1-id");

    if (headline1Ref) {
        headline1Ref.innerHTML += createFigure1({lineWidth: 215, shift: -15});
    }
}

initSettings();