import { performance } from "perf_hooks";
import { parentPort } from "worker_threads";
import { isObject, isEqual } from "lodash-es";

let testCount = 0;
let passedTestCount = 0;
let failedTestCount = 0;
let failedTestDetails = [];

function log(info) {
  if (parentPort) {
    return parentPort.postMessage(info);
  }
  return console.log(info);
}
function isSameValue(actualValue, expectedValue) {
  if (isObject(actualValue) && isObject(expectedValue)) {
    return isEqual(actualValue, expectedValue);
  }
  return actualValue === expectedValue;
}
function isSameError(actualError, expectedError) {
  if (isObject(actualError) && isObject(expectedError)) {
    return actualError.message === expectedError.message;
  }
  return actualError === expectedError;
}

export function expect(func, ...args) {
  testCount++;
  let actualValue;
  let actualError;
  try {
    actualValue = func(...args);
  } catch (error) {
    actualError = error.message;
  }
  return {
    toBe: (expectedValue) => {
      if (isSameValue(actualValue, expectedValue)) {
        passedTestCount++;
        return;
      }
      failedTestCount++;
      failedTestDetails.push(
        `${actualValue} is not equal to ${expectedValue}
        arguments: ${args}`
      );
      return;
    },
    toErr: (expectedError) => {
      if (isSameError(actualError, expectedError)) {
        passedTestCount++;
        return;
      }
      failedTestCount++;
      failedTestDetails.push(
        `${actualValue} is not equal to ${expectedValue}
        arguments: ${args}`
      );
      return;
    },
  };
}

export function it(name, callback) {
  testCount = 0;
  passedTestCount = 0;
  failedTestCount = 0;
  failedTestDetails = [];
  const start = performance.now();
  callback();
  const end = performance.now();
  log(
    `Test problem: ${name}
Test latency: ${((end - start) / testCount).toFixed(2)} ms
    ${passedTestCount} tests passed
    ${failedTestCount} tests failed
    ${
      failedTestCount > 0
        ? `Details:
        ${failedTestDetails.map((detail) => detail)}`
        : ``
    }`
  );
}