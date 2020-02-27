// TODO consider checking if max < min, because it doesn't work correctly
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randItem = (arr) => arr[randInt(0, arr.length - 1)];
