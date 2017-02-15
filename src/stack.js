'use strict'

// Attempted implementation without using built-in array methods, such as
// push(), pop(), slice(), splice(), reduce(), map(), etc.

export default class Stack {
  constructor() {
    this._list = []
    this._topIndex = -1
  }
  push(element) {
    return this._list[ ++this._topIndex ] = element
  }
  pop() {
    let newList = []
    let topElement = this.peek()
    this._topIndex--
    for ( let i = 0; i <= this._topIndex; i++ ) {
      newList[ i ] = this._list[ i ]
    }
    this._list = newList
    return topElement
  }
  peek() {
    return this._list[ this._topIndex ] || null
  }
  isEmpty() {
    return this.length() === 0
  }
  length() {
    return this._list.length
  }
}
