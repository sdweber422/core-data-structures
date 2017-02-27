# Core Data Structures

Tests and implementations for common data structures.

Base repository for the [Core Data Structures](https://github.com/GuildCrafts/web-development-js/issues/128) goal. See specs and quality rubric in the [CONTRACT.md](./CONTRACT.md) file.

## Installation and Setup

git clone https://github.com/sdweber422/core-data-structures [repository name]
cd core-data-structures || [repository name]
npm install -g eslint
npm install

## Test

npm test

## Specs Completed
[X] Hash Table
[X] Hash Table Tests
[X] Binary Search Tree
[X] Binary Search Tree Tests
[ ] Directed Graph
[ ] Directed Graph Tests

## Usage and Examples

All data structure classes should be implementable using the methods given.
Here is an example using Set:

```
const mySet = new Set()
let otherSet = []
mySet.add( 5 ) // adds 5 to mySet
mySet.add( 6 ) // adds 6 to mySet
mySet.add( 7 ) // adds 7 to mySet
mySet.size() // size of mySet is 3
mySet.isEmpty() // returns false
mySet.contains( 7 ) // returns true
mySet.remove( 7 ) // removes given element from mySet
mySet.contains( 7 ) // returns false
mySet.size() // size of mySet is now 2
mySet.forEach( element => otherSet.push( element * 2 ) ) // changes otherSet to equal [ 10, 12 ]
mySet.intersect( [ 1, 2, 5, 6, 10 ] ) //returns [ 5, 6 ]
mySet.union( otherSet ) // returns a new set equal to [ 5, 6, 10, 12 ]
mySet.size() // size of mySet is now 4
mySet.isSubset( [ 5, 6, 10, 12 ] ) //returns true
mySet.difference( [ 5, 6 ] ) //returns [ 10, 12 ]
mySet.clone() // returns a new set object with same values as instance set: Set { _data: [ 5, 6, 10, 12 ] }
