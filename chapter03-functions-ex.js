// Minimum

function min(a, b) {
  return a <= b ? a : b;
}

// Recursion

function isEven(number) {
  if (number < 0) {
    // without this, it would result in:
    //   RangeError: Maximum call stack size exceeded
    return isEven(number * -1);
  } else if (number === 0) {
    return true;
  } else if (number === 1) {
    return false;
  } else {
    return isEven(number - 2);
  }
}


// Bean Counting
function countBs(source) {
  let count = 0;
  for (var i=0; i < source.length; i++) {
    if (source[i] === "B") { count += 1; }
  }

  return count
}

function countChar(source, targetChar) {
  let count = 0;
  for (var i=0; i < source.length; i++) {
    if (source[i] === targetChar) { count += 1; }
  }

  return count;
}

function countBsImproved(source) {
  return countChar(source, "B");
}