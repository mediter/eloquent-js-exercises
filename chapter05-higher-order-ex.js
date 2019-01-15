require('./scripts.js');

/* Helper */
function repeatLog(str, count) {
  console.log(str.repeat(count));
}

function testLabel(testname) {
  console.log(`Test for: ${testname}`);
}

/* Higher-Order Function */

// Flattening

let arrays = [
  [1, 2, 3],
  [4, 5],
  [6]
];

function flatten(inputArray) {
  return inputArray.reduce((a, b) => a.concat(b));
}

testLabel('flatten');
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]

repeatLog('*', 12);

// YOUR OWN LOOP
function loop(start, condition, update, action) {
  for (let i = start; condition(i); i = update(i)) {
    action(i);
  }
}

testLabel('loop')
// in this particular case, i in for-loop is simple value
// without reassigning update(i) to i, i would not be
// updated, thus resulting in infinite loop
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

repeatLog('*', 12);

// EVERYTHING
function every(array, test) {
  for (const item of array) {
    if (!test(item)) { return false; }
  }

  return true;
}

testLabel('every');
console.log(every([1, 3, 5], n => n < 10));
// → true

console.log(every([2, 4, 16], n => n < 10));
// → false

console.log(every([], n => n < 10));
// → true

repeatLog('*', 12);


// DOMINANT WRITING DIRECTION

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({
        name,
        count: 1
      });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

function dominantDirection(text) {
  let scriptArray = [];

  for (const char of text) {
    scriptArray.push(characterScript(char.codePointAt(0)));
  }

  // debugger;

  scriptArray = scriptArray.filter(e => e !== null);

  let scriptStats = countBy(scriptArray, script => script.name);

  let dominantScript = scriptStats.reduce((a, b) => a.count > b.count ? a : b);

  return SCRIPTS.filter(s => s.name == dominantScript.name)[0].direction;
}

testLabel('Dominant Writing Direction');

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

repeatLog('*', 12);