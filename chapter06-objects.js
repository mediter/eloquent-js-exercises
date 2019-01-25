// Chapter 6 The Secret Life of Objects :: Eloquent JavaScript

// a Vector type
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(aVec) {
    this.x += aVec.x;
    this.y += aVec.y;
    return this;
  }

  minus(aVec) {
    this.x -= aVec.x;
    this.y -= aVec.y;
    return this;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


// Groups

// Write a class called Group(since Set is already
//   taken). Like Set, it has add, delete, and has
//   methods. Its constructor creates an empty group, add
//   adds a value to the group(but only if it isn’ t already
//   a member), delete removes its argument from the
//   group(if it was a member), and has returns a Boolean
//   value indicating whether its argument is a member of
//   the group.

// Use the === operator, or something equivalent such as
//   indexOf, to determine whether two values are the same.

// Give the class a static from method that takes an
//   iterable object as argument and creates a group that
//   contains all the values produced by iterating over it.

class Group {
  constructor() {
    this.data = [];
  }

  add(aValue) {
    if (!this.has(aValue)) {
      this.data.push(aValue);
    }
  }

  delete(aValue) {
    if (this.has(aValue)) {
      this.data = this.data.filter(x => x != aValue);
    }
  }

  has(aValue) {
    return this.data.includes(aValue);
  }

  static from(iterableObj) {
    let newGroup = new Group();
    for (const element of iterableObj) {
      newGroup.add(element);
    }

    return newGroup;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


// Iterable Group

class GroupIterator {
  constructor(group) {
    this.x = 0;
    this.data = group.data;
  }

  next() {
    if (this.x == this.data.length) return {done: true};

    let value = this.data[this.x];

    this.x++;

    return {value, done: false};
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

for (let value of Group.from(["b", "c", "a", "a"])) {
  console.log(value);
}
// → b
// → c
// → a


// Borrowing a Method

// an object’s hasOwnProperty can be used as a more robust
// alternative to the in operator when you want to ignore
// the prototype’s properties. But what if your map needs to
// include the word "hasOwnProperty"? You won’t be able to
// call that method anymore because the object’s own
// property hides the method value.

// Can you think of a way to call hasOwnProperty on an
// object that has its own property by that name ?

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
// console.log(map.hasOwnProperty("one"));
// TypeError: map.hasOwnProperty is not a function
// → true

// Hints:
// 1. methods that exist on plain objects come from Object.prototype.


// 2. you can call a function with a specific this binding by using its call method.
console.log(hasOwnProperty.call(map, "one"));
// -> true
