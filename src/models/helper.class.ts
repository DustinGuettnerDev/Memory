/**
 * Helper class for game utility functions.
 */
export class Helper {
    /**
     * Generates a random integer between zero and the specified limit.
     * @param untilNumber - The highest possible random number.
     * @returns A random integer within the specified range.
     */
    static getRandomNumber(untilNumber: number): number {
        return Math.round(Math.random() * untilNumber);
    }

    /**
     * Generates a random integer that is not contained in the used indexes.
     * @param usedIndex - Indexes that must not be returned.
     * @param untilNumber - The highest possible random number.
     * @returns An unused random integer within the specified range.
     */
    static getRandomNumberNoDuplicates(usedIndex: number[], untilNumber: number): number {
        let randomIndex = this.getRandomNumber(untilNumber);
        if (usedIndex.includes(randomIndex)) {
            return this.getRandomNumberNoDuplicates(usedIndex, untilNumber);
        }
        return randomIndex;
    }

    /**
     * Returns a shuffled copy of an array without changing the original.
     * @param array - The array to shuffle.
     * @returns A new array containing the same elements in random order.
     */
    static shuffleArray<T>(array: T[]): T[] {
        const usedIndex: number[] = [];
        const temporaryArray: T[] = new Array(array.length);

        for (let index = 0; index < array.length; index++) {
            const randomIndex = this.getRandomNumberNoDuplicates(usedIndex, array.length - 1);

            usedIndex.push(randomIndex);
            temporaryArray[randomIndex] = array[index];
        }

        return temporaryArray;
    }

    /**
     * Pauses execution for the specified number of milliseconds.
     * @param milliseconds - The duration of the pause.
     */
    static async delay(milliseconds: number) {
        await new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
