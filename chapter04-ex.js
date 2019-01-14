// the Sum of a Range

function range(start, end) {
  let numbers = [];

  for (var i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
}

function sum(numbers) {
  return numbers.reduce((a, b) => a + b)
}

function stepRange(start, end, step=1) {
  let numbers = [];

  let condition = i => { return step < 0 ? i >= end : i <= end; }

  for (var i = start; condition(i); i += step) {
    numbers.push(i);
  }

  return numbers;
}


// Reversing an Array

function reverseArray(inputArray) {
  let result = [];

  for (var i = inputArray.length - 1; i >= 0; i--) {
    result.push(inputArray[i]);
  }

  return result;
}

function reverseArrayInPlace(inputArray) {
  let end = Math.floor(inputArray.length / 2);

  let tempElement;

  for (var i = 0; i < end; i++) {
    tempElement = inputArray[i];

    let swapIndex = inputArray.length - 1 - i;

    inputArray[i] = inputArray[swapIndex];
    inputArray[swapIndex] = tempElement;
  }
}

// Thinking back to the notes about side effects and
// pure functions in the previous chapter:
// - Which variant do you expect to be useful in more situations?
// - Which one runs faster?



// a List

function arrayToList(inputArray) {
  let tempElement;

  for (var i = inputArray.length - 1; i >= 0; i--) {
    if (i === inputArray.length - 1) {
      tempElement = {
        value: inputArray[i],
        rest: null
      };
    } else {
      tempElement = {
        value: inputArray[i],
        rest: tempElement
      };
    }
  }

  return tempElement;
}

function listToArray(inputList) {
  let tempElement = inputList, outputArray = [];

  while (tempElement.rest !== null) {
    outputArray.push(tempElement.value);

    tempElement = tempElement.rest;
  }

  outputArray.push(tempElement.value);

  return outputArray;
}

function prepend(inputElement, inputList) {
  inputList = {
    value: inputElement,
    rest: inputList
  };

  return inputList;
}

function nth(inputList, index) {
  return listToArray(inputList)[index];
}

function recursiveNth(inputList, index) {
  if (index === 0) {
    return inputList.value;
  } else if (inputList.rest === null) {
    return;
  }
  
  return recursiveNth(inputList.rest, index - 1);
  // - after the recursion ends, it would reach here
  // - returns in the above steps ensures the recursion would terminate
  // - without the last return, after inner levels of recursion ends,
  //   it would be implicit return, thus return undefined.
}


// Deep Comparison

var allAreObjects = (...input) => {
  for (let item of input) {
    if (!isObject(item)) {
      return false
    }
  }
  return true;
}

var isObject = (input) => {
  return typeof (input) === 'object';
}

/* 
  Write a function deepEqual that takes two values and
  returns true only if they are the same value or are
  objects with the same properties, where the values of the
  properties are equal when compared with a recursive call
  to deepEqual.

  To find out whether values should be compared directly (use
  the === operator for that) or have their properties
  compared, you can use the typeof operator. If it produces
  "object" for both values, you should do a deep
  comparison.But you have to take one silly exception into
  account: because of a historical accident, typeof null
  also produces "object".
*/

function deepEqual(data1, data2) {
  // if at most one of them is object, compare directly
  // if at lease one of them is null, compare directly
  // if both non-null object, use deepEqual to check each key-value
  if (!allAreObjects(data1, data2)) {
    return data1 === data2;
  } else {
    if (data1 == null || data2 == null) {
      return data1 === data2;
    } else {
      const keys = Object.keys(data1);

      // for-of: individual item inside enumerable
      // for-in: each index of elements in enumerable
      for (const key of keys) {
        console.log('key deepcompare');

        if (!deepEqual(data1[key], data2[key])) {
          return false;
        }
        // only exit when key deepcompare returns false
        // continue comparing other keys when deepcampare true
      }
      return true;
    }
  }
}
