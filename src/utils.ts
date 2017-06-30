export function randomNumber(max: number): number {
    return randomNumberBetween(0, max);
}

export function randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
