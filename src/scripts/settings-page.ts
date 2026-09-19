import "../styles/pages/_settings.scss";
import { createFigure1 } from "../scripts/templates";
import { FormRadioSelectionHandler } from "../models/form-radio-selection-handler.class";

/**
 * Initializes the settings page.
 */
function initSettings() {
    loadTemplates();
    initForms();
}

/**
 * Adds the decorative headline ornament to the settings page.
 */
function loadTemplates() {
    const headline1Ref = document.getElementById("headline1-id");

    if (headline1Ref) {
        headline1Ref.innerHTML += createFigure1({ lineWidth: 215, shift: -15 });
    }
}

/**
 * Creates a selection handler for each settings form.
 */
function initForms() {
    new FormRadioSelectionHandler("settings-game-theme-form-id", "start-board-game-theme-id", "settings-game-theme");
    new FormRadioSelectionHandler("settings-player-color-form-id", "start-board-player-color-id", "settings-player-color");
    new FormRadioSelectionHandler("settings-board-size-form-id", "start-board-board-size-id", "settings-board-size");
}

initSettings();
