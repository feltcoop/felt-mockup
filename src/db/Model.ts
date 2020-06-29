declare const ModelFlavorSymbol: unique symbol;
export interface ModelFlavor<T> {
	[ModelFlavorSymbol]?: T;
}

export type ModelId<T> = Flavored<number, 'ModelId'> & ModelFlavor<T>;
