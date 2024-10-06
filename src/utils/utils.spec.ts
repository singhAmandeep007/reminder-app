import { merge, generateUniqueRandomNumbers, truncateText } from "./utils";

describe("merge", () => {
  it("should return correct value if empty object passed", () => {
    const obj1 = { a: 1, b: 2 };
    expect(merge(obj1, {}, {})).toEqual({ a: 1, b: 2 });
  });
  it("should merge two objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge objects from source to destination", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const obj3 = { c: 5, d: 6, b: 9 };
    expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 9, c: 5, d: 6 });
  });

  it("should merge nested objects", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3, e: 4 } };
    const obj2 = { b: { c: 4, e: [1, 2] } };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: { c: 4, d: 3, e: [1, 2] } });
  });

  it("should not merge nested objects with undefined values", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3, e: 4 } };
    const obj2 = { b: { c: 4, e: undefined } };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: { c: 4, d: 3, e: 4 } });
  });

  it("should merge nested objects with null values", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3, e: 4 } };
    const obj2 = { b: { c: 4, e: null } };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: { c: 4, d: 3, e: null } });
  });

  it("should merge nested objects with empty objects", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3, e: 4 } };
    const obj2 = { b: { c: 4, e: {} } };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: { c: 4, d: 3, e: {} } });
  });

  it("should not merge destination arrays with source arrays", () => {
    const obj1 = { a: 1, b: { c: 2, d: 3, e: [4, { f: 5 }] } };
    const obj2 = { b: { c: 4, e: [1, 2] } };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: { c: 4, d: 3, e: [1, 2] } });
  });
});

describe("generateUniqueRandomNumbers", () => {
  it("should generate an array of unique random numbers with correct length", () => {
    const result = generateUniqueRandomNumbers(5, 1, 10);
    expect(result).toHaveLength(5);

    expect(new Set(result).size).toBe(5); // Ensure all elements are unique
  });

  it("generates numbers within the specified range", () => {
    const result = generateUniqueRandomNumbers(10, 1, 10);
    result.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    });
  });

  it("throws an error when requested length exceeds possible unique numbers", () => {
    expect(() => generateUniqueRandomNumbers(11, 1, 10)).toThrow(
      "Cannot generate unique random numbers. Requested length is greater than the range of numbers."
    );
  });

  it("returns an empty array when length is 0", () => {
    const result = generateUniqueRandomNumbers(0, 1, 10);
    expect(result).toEqual([]);
  });

  it("returns the only possible combination when length equals range", () => {
    const result = generateUniqueRandomNumbers(5, 1, 5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles negative numbers in range", () => {
    const result = generateUniqueRandomNumbers(3, -5, 5);
    result.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(-5);
      expect(num).toBeLessThanOrEqual(5);
    });
  });
});

describe("truncateText", () => {
  it("should return the original text if it is shorter than or equal to the maximum length", () => {
    const text = "Hello, World!";
    const options = { maxLength: 13 };
    expect(truncateText(text, options)).toEqual(text);
  });
  it("should truncate the text from the end if start and middle options are not provided", () => {
    const text = "Hello, World!";
    const options = { maxLength: 10 };
    expect(truncateText(text, options)).toEqual("Hello, ...");
  });
  it("should truncate the text from the start if start option is provided", () => {
    const text = "Hello, World!";
    expect(truncateText(text, { maxLength: 10, position: "start" })).toEqual("... World!");
  });
  it("should truncate the text from the middle if middle option is provided", () => {
    const text = "Hello, World!";

    expect(truncateText(text, { maxLength: 10, position: "middle" })).toEqual("Hell...ld!");
  });
  it("should truncate the text from the middle if both start and middle options are provided", () => {
    const text = "Hello, World!";

    expect(truncateText(text, { maxLength: 10, position: "end" })).toEqual("Hello, ...");
  });

  it("handles empty string input", () => {
    expect(truncateText("", { maxLength: 5 })).toBe("");
  });

  it("handles unicode characters correctly", () => {
    const unicodeText = "This 👍 is a 🎉 test";
    expect(truncateText(unicodeText, { maxLength: 12 })).toBe("This 👍 i...");
  });
});
