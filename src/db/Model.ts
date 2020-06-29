declare const ModelFlavorSymbol: unique symbol;
export interface ModelFlavor<T> {
	[ModelFlavorSymbol]?: T;
}

export type ModelId<T extends string = string> = Flavored<number, 'ModelId'> & ModelFlavor<T>;
