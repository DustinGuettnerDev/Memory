import { createCard } from "../scripts/templates";

/**
 * Represents a memory card with front and back image paths.
 */
export class Card {
    /**
     * Creates a card.
     * @param front - The image path shown on the front of the card.
     * @param back - The image path shown on the back of the card.
     */
    constructor(
        private front: string,
        private back: string,
    ) {}

    render(): string {
        return createCard(this.front, this.back);
    }
}
