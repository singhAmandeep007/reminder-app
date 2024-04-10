export function merge<T extends object, U extends object>(target: T, source: U): T & U {
  const isObject = (item: unknown): item is object => item !== null && typeof item === "object" && !Array.isArray(item);

  for (const key of Object.keys(source)) {
    // @ts-expect-error
    const targetValue = target[key];
    // @ts-expect-error
    const sourceValue = source[key];

    if (isObject(targetValue) && isObject(sourceValue)) {
      // Recursive merge for nested objects
      // @ts-expect-error
      target[key] = merge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      // Overwrite primitives and undefined values from target
      // @ts-expect-error
      target[key] = sourceValue;
    }
  }

  return target as T & U;
}
