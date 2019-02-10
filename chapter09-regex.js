"use strict"

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
  (str) => {
    console.log(str);
    return str.toUpperCase();
  }));
// → the CIA and FBI

console.log("babanomore".indexOf("a"));
// -> 1

console.log("babanomore".indexOf("a", 2));
// -> 3


let config = `searchengine = https://duckduckgo.com/?q=$1
spitefulness = 9.7
; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname = Larry Doe
type = kindergarten bully
website = http://www.geocities.com/CapeCanaveral/11451
[davaeorn]
fullname = Davaeorn
type = evil wizard
outputdir = /home/marijn / enemies / davaeorn`;

function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if (match = line.match(/^(\w+)\s*=\s*(.*)$/)) {
      // attributes
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      // section header
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      // not comment line and not empty line
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}

console.log(parseINI(config));


console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}


// Exercises

/* RegEx Golf */
// Code golf is a term used for the game of trying to
// express a particular program in as few characters as
// possible. Similarly, regexp golf is the practice of
// writing as tiny a regular expression as possible to
// match a given pattern, and only that pattern.

// For each of the following items, write a regular
// expression to test whether any of the given substrings
// occur in a string. The regular expression should match
// only strings containing one of the substrings described.

/*
  the given substrings contain the unnecessary 'and', which
  is a bit misleading and confusing.
*/

// 1. car and cat
verify(/ca[rt]/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

// 2. pop and prop
verify(/pr?op/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

// 3. ferret, ferry, and ferrari
verify(/ferr(et|y|ari)/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

// 4. Any word ending in ious
verify(/\b.*ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

// 5. A whitespace character followed by
// a period, comma, colon, or semicolon
verify(/\s[.,:;]/,
  ["bad punctuation ."],
  ["escape the period"]);

// 6. A word longer than six letters
verify(/\w{7,}/,
  ["hottentottententen"],
  ["no", "hotten totten tenten"]);

// 7. A word without the letter e(or E)
verify(/\b[^eE\s]+\b/,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]);
// this one is a bit tricky
// Recommend to use the following website to debug RegEx:
//   https://rubular.com
// The website recommended by Eloquent Javascript has bad
// styling, bright pink as highlight for matches on white
// background. (https://www.debuggex.com)


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}


/* Quoting Style */

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/^'|'$|(?<=\s)'|'(?=\s)/g, "\""));
// → "I'm the cook," he said, "it's my job."

// At least in English, single quotes are at the beginning
// , end, before whitespace, or after whitespace.
//
// So here we use lookahead and lookbehind to select the
// latter two situations


/* Numbers Again */

/*
  matches only JavaScript-style numbers:
  - an optional minus or plus sign in front of the number
  - the decimal dot: not necessary for there to be digits in front
    of or after the dot, but the number cannot be a dot alone.
  - exponent notation —— 5e-3 or 1E10—again with an optional sign
    in front of the exponent
*/
// Fill in this regular expression.
let number = /^(?:\+|-)?(?:\d*|\d+\.\d*|\d*\.\d+)(?:[eE](\+|-)?\d+)?$/;
// need to escape +, as it is a specail character
// () for capture group
// (?:) for non-capture group

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
    "1.3e2", "1E-4", "1e+12"
  ]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
    ".5.", "1f5", "."
  ]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}