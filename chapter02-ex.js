// Looping a Triangle

for (var i = 1; i < 7; i++) {
  let str = "";

  for (var n = 1; n <= i; n++) {
    str += "#";
  }

  console.log(str);
}

// FizzBuzz

function fizzBuzzPrinter(start=1, end=100) {
  for (var i = start; i <= end; i++) {
    if ( (i % 3 === 0) && (i % 5 === 0)) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}

// ChessBoard

function fenceGrid(size=8) {
  for (var i = 1; i <= size; i++) {
    let line = (i % 2 === 1) ? " " : "#";
    for (var n = 2; n <= size; n++ ) {
      if (i % 2 === 1) {
        if (n % 2 === 1) {
          line += " ";
        } else {
          line += "#";
        }
      } else {
        if (n % 2 === 1) {
          line += "#";
        } else {
          line += " ";
        }
      }
    }

    console.log(line);
  }
}