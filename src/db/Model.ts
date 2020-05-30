export type ModelId<T extends string = string> = number & {__type?: 'ModelId'; __model?: T};
