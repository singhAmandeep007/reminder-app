export function merge<T extends object, U extends object[]>(target: T, ...sources: U): T & U[number] {
  const isObject = (item: unknown): item is object => item !== null && typeof item === "object" && !Array.isArray(item);

  for (const source of sources) {
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
  }

  return target as T & U[number];
}

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
