import { expect, test, describe } from "vitest";
import { validateRow, validateContent } from "../utils";

describe("Should test all cases for validateRow function", () => {
  test("should throw an error if the validation is invalid", () => {
    try {
      validateRow({ checked: false, content: "t", id: 1 }, 3);
    } catch (e) {
      expect(e).to.toBeTruthy();
    }
  });

  test("Should return true if it is valid", () => {
    try {
      const isValid = validateRow({ checked: false, content: "132", id: 1 }, 3);
      expect(isValid).toBe(true);
    } catch (e) {
      expect(e).to.eq(undefined);
    }
  });
});

describe("Should test all cases for validateContent function", () => {
  test("Should return true if there are characters equal or greater than the minChars", () => {
    const isValid = validateContent("test", 4);
    expect(isValid).toBe(true);
  });
  test("Should return false if there are characters less than the minChars", () => {
    const isValid = validateContent("1", 2);
    expect(isValid).toBe(false);
  });
});
