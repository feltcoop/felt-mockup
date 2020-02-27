// TODO consider checking if max < min, because it doesn't work correctly
export const randInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const randItem = <T>(arr: T[]): T | undefined =>
	arr[randInt(0, arr.length - 1)];
