'use strict'

export default class PQueue {

  constructor() {
    this._list = []
    this._backElementIndex = -1
  }

  enqueue( element, priority ) {
    if ( priority < 1 ) {
      throw new Error( 'This priority is invalid' )
    }
    this._list[ ++this._backElementIndex ] = { element, priority }
    this._list = this._list.sort( ( element, nextElement ) => {
      return element.priority > nextElement.priority
    } )
  }

  dequeue() {
    let highestPriorityElement = this.front()
    this._list = this._list.reduce( ( memo, element, index ) => {
      if ( index < this._backElementIndex ) {
        memo[ index ] = this._list[ index + 1 ]
      }
      return memo
    }, [] )
    this._backElementIndex--
    return highestPriorityElement
  }

  front() {
    return this._list[ 0 ] || null
  }

  back() {
    return this._list[ this._backElementIndex ] || null
  }

  isEmpty() {
    return this.length() === 0
  }

  length() {
    return this._list.length
  }
  
}
