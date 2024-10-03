import { TAsyncRecord, handleAsync, waitUntil } from "./async";

describe("handleAsync", () => {
  describe("given a callback function that returns a value", () => {
    let result: TAsyncRecord;

    beforeAll(async () => {
      result = await handleAsync(() => Promise.resolve("value"));
    });

    it("should return explicit null as the error", () => {
      expect(result.error).toBe(null);
    });

    it("should return data", () => {
      expect(result.data).toEqual("value");
    });
  });

  describe("given a callback function that throws an exception", () => {
    const customError = new Error("Error message");

    const run = () => {
      return handleAsync(() => {
        throw customError;
      });
    };

    it("should not throw when called", () => {
      expect(run).not.toThrow();
    });

    it("should return caught error as error", async () => {
      const { error } = await run();
      expect(error).toEqual(customError);
    });

    it("should return explicit null as data", async () => {
      const { data } = await run();
      expect(data).toBe(null);
    });
  });

  describe("given a Promise that rejects", () => {
    let result: TAsyncRecord;

    beforeAll(async () => {
      result = await handleAsync(() => Promise.reject(new Error("Error message")));
    });

    it("should return the rejected error", () => {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error).toHaveProperty("message", "Error message");
    });

    it("should return explicit null as data", () => {
      expect(result.data).toBeNull();
    });
  });
});

describe("waitUntil", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("resolves when the condition is true", async () => {
    const condition = jest.fn(() => true);
    const promise = waitUntil(condition, { timeout: 2000, tick: 100 });

    jest.advanceTimersByTime(100);

    await expect(promise).resolves.toBeUndefined();
    expect(condition).toHaveBeenCalledTimes(1);
  });

  it("resolves after condition becomes true", async () => {
    const condition = jest
      .fn()
      .mockReturnValueOnce(false) // First call returns false
      .mockReturnValueOnce(false) // Second call returns false
      .mockReturnValueOnce(true); // Third call returns true

    const promise = waitUntil(condition, { timeout: 2000, tick: 100 });

    // Fast forward time by 300ms (3 ticks)
    jest.advanceTimersByTime(300);

    await expect(promise).resolves.toBeUndefined();
    expect(condition).toHaveBeenCalledTimes(3);
  });

  it("rejects when the condition is false after timeout", async () => {
    const condition = jest.fn(() => false);
    const promise = waitUntil(condition, { timeout: 2000, tick: 100 });

    jest.advanceTimersByTime(2000);

    await expect(promise).rejects.toEqual("Timeout");

    expect(condition).toHaveBeenCalledTimes(20);
  });
});
