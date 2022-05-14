import { EOL } from "os";
import { readFile } from "fs/promises";
import { isNumber, flow } from "lodash-es";

const sliceTableText = (readmeText) => readmeText.split(`## 题目${EOL}`)[1];
const text2Table = (text) => {
  const rows = text.split(EOL);
  const header = rows[0].split("|");
  const body = rows.slice(2).map((row) => row.split("|"));
  return [header, body];
};
const getTableBody = (table) => table[1];
const table2Matrix = (table) =>
  table.map((row) => row.map((text) => parseFloat(text)));
const transposeMatrix = (matrix) =>
  matrix.reduce(
    (pre, cur) => pre.map((row, i) => [...row, cur[i]]),
    new Array(matrix[0].length).fill(new Array())
  );
const getLast2Row = (matrix) => matrix.slice(matrix.length - 2, matrix.length);
const filterValidNumber = (matrix) =>
  matrix.map((row) => row.filter((item) => isNumber(item) && !isNaN(item)));
const calculateAverage = (matrix) =>
  matrix.map((row) => row.reduce((pre, cur) => pre + cur) / row.length);
const toFixed2Digit = (arr) => arr.map((item) => item.toFixed(2));

(async () => {
  const readmeText = await readFile("README.md", { encoding: "utf-8" });
  const [timeComplexity, spaceComplexity] = flow(
    sliceTableText,
    text2Table,
    getTableBody,
    table2Matrix,
    transposeMatrix,
    getLast2Row,
    filterValidNumber,
    calculateAverage,
    toFixed2Digit
  )(readmeText);

  console.log(`Average time complexity percentage: ${timeComplexity}%`);
  console.log(`Average space complexity percentage: ${spaceComplexity}%`);
})();
