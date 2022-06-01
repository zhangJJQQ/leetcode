import { it, expect } from "../../libs/test/index.js";
import { generateTokens, calculateTokens, calculate } from "../../problems/224/index.js";
it("224: generateTokens", () => {
  expect(generateTokens, "1 + 1").toBe(["1", "+", "1"]);
  expect(generateTokens, " 2-1 + 2 ").toBe(["2", "-", "1", "+", "2"]);
  expect(generateTokens, "(1+(4+5+2)-3)+(6+8)").toBe([["1","+",["4","+","5","+","2"],"-","3"],"+",["6","+","8"]]);
});
it("224: calculateTokens", () => {
  expect(calculateTokens, generateTokens("1 + 1")).toBe(2);
  expect(calculateTokens, generateTokens(" 2-1 + 2 ")).toBe(3);
  expect(calculateTokens, generateTokens("(1+(4+5+2)-3)+(6+8)")).toBe(23);
});
it("224: calculate", () => {
  expect(calculate, "1 + 1").toBe(2);
  expect(calculate, " 2-1 + 2 ").toBe(3);
  expect(calculate, "(1+(4+5+2)-3)+(6+8)").toBe(23);
});