/**
 * Helper class for game utility functions.
 */
export class Helper {
    /**
     * Generates a random number up to the specified limit.
     */
    static getRandomNumber(untillNumber: number): number {
        return Math.round(Math.random() * untillNumber);
    }

    /**
     * Generates a random number that hasn't been used before.
     */
    static getRandomNumberNoDuplicates(usedIndex: number[], untillNumber: number): number {
        let randomIndex = this.getRandomNumber(untillNumber);
        if (usedIndex.includes(randomIndex)) {
            return this.getRandomNumberNoDuplicates(usedIndex, untillNumber);
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
}
