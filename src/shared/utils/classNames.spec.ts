import { cn } from "./classNames";
describe("cn", () => {
  it("should return an empty string when no arguments are provided", () => {
    const result = cn();
    expect(result).toEqual("");
  });

  it("should concatenate multiple class names into a single string", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toEqual("class1 class2 class3");
  });

  it("should handle arrays of class names", () => {
    const result = cn(["class1", "class2"], ["class3", "class4"]);
    expect(result).toEqual("class1 class2 class3 class4");
  });

  it("should ignore falsy values", () => {
    const result = cn("class1", null, undefined, "", "class2");
    expect(result).toEqual("class1 class2");
  });

  it("should handle conditional class names", () => {
    const isActive = false;
    const result = cn("class1", { class2: isActive }, "class3");
    expect(result).toEqual("class1 class3");
  });
});
