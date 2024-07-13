import { merge } from "./utils";

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
