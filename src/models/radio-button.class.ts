class RadioButtonSelection {
    formRef: HTMLElement | null;
    actualValue: string | undefined;
    answereObject: { [key: string]: string } = {};
    labelArray: NodeListOf<Element> | undefined;

    constructor(formId?: string) {
        this.formRef = document.getElementById("formId");
        if (!this.formRef) return;

        this.labelArray = this.formRef.querySelectorAll(".label");
        if (!this.labelArray || this.labelArray.length === 0) return;

        this.#createAnswerObject();
        this.#clickHandler();
    }

    #createAnswerObject(): void {
        const labelArray = this.labelArray;

        if (!labelArray || labelArray.length === 0) return;

        for (const label of labelArray) {
            const key = label.querySelector("input")?.value;
            if (!key) continue;
            this.answereObject[key] = label.textContent ?? "";
        }
    }

    #clickHandler(): void {
        const labelArray = this.labelArray;

        if (!labelArray || labelArray.length === 0) return;

        document.addEventListener("click", (event) => {
            for (const label of labelArray) {
                if (label === event.target) {
                    this.actualValue = label.querySelector("input")?.value;
                }
            }
        });
    }

    #setValueInStartBoard() {}
}
