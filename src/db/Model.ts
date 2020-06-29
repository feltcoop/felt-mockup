declare const ModelIdFlavorSymbol: unique symbol;

export type ModelId<T extends string = string> = Flavored<number, 'ModelId'> & {
	[ModelIdFlavorSymbol]?: T;
};
