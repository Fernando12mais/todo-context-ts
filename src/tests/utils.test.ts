import { expect, test, describe } from "vitest";
import { validateRow } from "../utils";

describe("Should test all cases for validateRow function", () => {
  test("should throw an error if the validation is invalid", () => {
    try {
      validateRow("t", 3, true);
    } catch (e) {
      expect(e).to.toBeTruthy();
    }
  });

  test("Should return true if it is valid", () => {
    try {
      const isValid = validateRow("132", 3, true);
      expect(isValid).toBe(true);
    } catch (e) {
      expect(e).to.eq(undefined);
    }
  });
});
