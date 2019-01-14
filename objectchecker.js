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

// test cases
var testcases = [
  1,
  '1',
  {date: '2019'},
  [{date: '2019'}, 1],
  [{date: '2019'}, {time: '2019'}]
]

/* Rest Parameters
  function somefunction(...input) {}

  somefunction(a, b, c)
  input: [a, b, c]

  somefunction([a, b, c])
  input: [[a, b, c]]
*/

for (var i = 0; i < testcases.length; i++) {
  if (testcases[i].length > 1) {
    console.log(`${i}: ${allAreObjects(...testcases[i])};`);
  } else {
    console.log(`${i}: ${isObject(testcases[i])};`);
  }
}

// ... spread operator
// when used in function call
// if the used with an array, the passed in data are the elements
// of the array instead of the array itself.

/* expected output:
  1: false
  2: false
  3: true
  4: false
  5: true
*/

export { isObject };