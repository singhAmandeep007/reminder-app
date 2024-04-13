import { appendQueryParams, getUrlSearchParams } from "./url";

describe("appendQueryParams", () => {
  it("should append multiple query params to url", () => {
    const url = "/reminders";
    const queryParams = {
      groupId: "1",
      status: "active",
    };
    expect(appendQueryParams(url, queryParams)).toBe("/reminders?groupId=1&status=active");
  });

  // NOTE: Edge case, no type checking for undefined values
  it("should not append query params to url if value is undefined", () => {
    const url = "/reminders";
    const queryParams = {
      groupId: undefined,
    } as unknown as Record<string, string>;
    expect(appendQueryParams(url, queryParams)).toBe("/reminders");
  });

  it("should not append query params to url if queryParams is empty", () => {
    const url = "/reminders";
    const queryParams = {};
    expect(appendQueryParams(url, queryParams)).toBe("/reminders");
  });

  it("should append single query params to url", () => {
    const url = "/reminders";
    const queryParams = {
      groupId: "1",
    };
    expect(appendQueryParams(url, queryParams)).toBe("/reminders?groupId=1");
  });
});

describe("getUrlSearchParams", () => {
  it("should return key value pairs of search params", () => {
    const url = "http://app.com/reminders?groupId=1&status=active";
    expect(getUrlSearchParams(url)).toEqual({ groupId: "1", status: "active" });
  });

  it("should return empty object if no search params", () => {
    const url = "http://app.com/reminders";
    expect(getUrlSearchParams(url)).toEqual({});
  });
});
