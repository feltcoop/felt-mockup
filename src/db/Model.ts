// TODO do we want to use this pattern for improved type safety?
// reference: https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
// export type ModelId = Flavor<number, 'ModelId'>; // with helper
export type ModelId = number & {__type?: 'ModelId'}; // incrementing integers

// TODO abstract model class, similar to `./Repo.ts`?
// or are models plain JSON objects with associated (and generally pure) function helpers?
// if the latter, this file should probably be `model.ts` not `Model.ts`
// right now I'm leaning more towards the decoupled, non-class version of a "model",
// but perhaps we want both `Model` classes and a "record/doc/etc" plain JSON type that they wrap.
