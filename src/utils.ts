// TODO this should probably be moved, maybe upstream to Gro -
// it's a little specialized but not _that_ specialized.

// `unwrap` is a helper for working with result values.
// In many cases, it should not be used, and instead error conditions should be manually handled,
// but it's helpful in situations where you want to express, "if this fails, bubble up any error".
// Generally speaking that means you're not expecting an error to occur.
export const unwrap = <
	TValue extends {value: TWrappedValue},
	TWrappedValue,
	TError extends {reason?: string}
>(
	result: Result<TValue, TError>,
): TWrappedValue => {
	if (result.ok) {
		return result.value;
	} else {
		throw Error(result.reason || `Failed to unwrap result with unknown reason`);
	}
};
