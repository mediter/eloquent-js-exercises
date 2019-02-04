"use strict"

// Retry

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  let result = -1;

  for (;;) {
    try {
      result = primitiveMultiply(a, b);
      break;
    } catch (e) {
      continue;
    }
  }

  return result;
}

console.log(reliableMultiply(8, 8));

console.log(reliableMultiply(6, 7));


// Locked Box

/*
  Write a function called withBoxUnlocked that takes a
  function value as argument, unlocks the box, runs the
  function, and then ensures that the box is locked again
  before returning, regardless of whether the argument
  function returned normally or threw an exception.
*/

const box = {
  locked: true,
  unlock() { this.locked = false },
  lock() { this.locked = true },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  }
};

function withBoxUnlocked(body) {
  const lockStatus = box.locked;
  if (lockStatus) { box.unlock(); }

  try {
    body();
  } finally {
    if (!lockStatus) { box.lock(); }
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
})

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  })
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked);
// -> true
