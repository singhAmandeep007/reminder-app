import { waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { renderHook } from "tests/utils";

import { useOutsideClick } from "./useOnClickOutside";
describe("useOnClickOutside", () => {
  let ref: { current: HTMLDivElement | null };
  let handler: jest.Mock;

  beforeEach(() => {
    ref = { current: document.createElement("div") };
    handler = jest.fn();
    document.body.appendChild(ref.current as Node);
  });

  afterEach(() => {
    if (ref.current) {
      document.body.removeChild(ref.current);
    }
    jest.clearAllMocks();
  });

  it("should call handler when clicking outside the referenced element", async () => {
    renderHook(() => useOutsideClick({ ref, handler }));

    userEvent.click(document.body);

    await waitFor(() => {
      return expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call handler when clicking inside the referenced element", () => {
    renderHook(() => useOutsideClick({ ref, handler }));

    if (ref.current) {
      userEvent.click(ref.current);
    }

    expect(handler).not.toHaveBeenCalled();
  });

  it("should not call handler when ref is null", () => {
    const nullRef = { current: null };

    renderHook(() => useOutsideClick({ ref: nullRef, handler }));

    userEvent.click(document.body);

    expect(handler).not.toHaveBeenCalled();
  });

  it("should remove event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useOutsideClick({ ref, handler }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it("should add event listener only once", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");

    renderHook(() => useOutsideClick({ ref, handler }));

    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    addEventListenerSpy.mockRestore();
  });
});
