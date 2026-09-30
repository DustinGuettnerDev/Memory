import { FormRadioSelectionHandler } from "./form-radio-selection-handler.class";

/**
 * Handles theme-specific radio selection and preview behavior.
 */
export class FormRadioSelectionThemeHandler extends FormRadioSelectionHandler {
    /**
     * Registers the shared change listener and theme preview hover listeners.
     */
    protected initRadioButtonListener() {
        super.initRadioButtonListener();
        this.initPreviewHoverListener(this.labelCodeVibes);
        this.initPreviewHoverListener(this.labelGaming);
    }

    /**
     * Updates the selected theme and its preview state.
     */
    protected handleChange(event: Event) {
        super.handleChange(event);

        if (this.selectedValue === null) return;

        this.updatePreviewImg(this.selectedValue);
        this.lastPreviewTheme = this.selectedValue;
    }
}
