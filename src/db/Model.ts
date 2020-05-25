export type ModelId = number; // incrementing integers

// TODO abstract model class, similar to `./Repo.ts`?
// or are models plain JSON objects with associated (and generally pure) function helpers?
// if the latter, this file should probably be `model.ts` not `Model.ts`
// right now I'm leaning more towards the decoupled, non-class version of a "model",
// but perhaps we want both `Model` classes and a "record/doc/etc" plain JSON type that they wrap.
