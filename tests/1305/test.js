import { it, expect } from "../../libs/test/index.js";
import { array2tree } from "../../src/common/index.js";
import { getAllElements } from "../../src/1305/index.js";
it("1305", () => {
  expect(getAllElements, array2tree([2, 1, 4]), array2tree([1, 0, 3])).toBe([
    0, 1, 1, 2, 3, 4,
  ]);
  expect(getAllElements, array2tree([1, null, 8]), array2tree([8, 1])).toBe([
    1, 1, 8, 8,
  ]);
});