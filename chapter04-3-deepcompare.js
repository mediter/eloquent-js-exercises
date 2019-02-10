var allAreObjects = (...input) => {
  for (let item of input) {
    if (!isObject(item)) {
      return false
    }
  }
  return true;
}

var isObject = (input) => {
  return typeof(input) === 'object';
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
      for (const i in keys) {
        console.log('key deepcompare');

        const key = keys[i];

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

/* Accessing Data in Object
  - obj.key would use key as string literal "key"
  - obj[key] would recognize key as an expression
*/

// Test for Deep Comparison
let obj = {
  here: {
    is: "an"
  },
  object: 2
};

console.log('*'.repeat(12));
console.log(deepEqual(obj, obj));
// → true

console.log('*'.repeat(12));
console.log(deepEqual(obj, {
  here: 1,
  object: 2
}));
// → false

console.log('*'.repeat(12));
console.log(deepEqual(obj, {
  here: {
    is: "an"
  },
  object: 2
}));
// → true