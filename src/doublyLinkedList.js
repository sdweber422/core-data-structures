class Node {

  constructor( data ) {
    this._data = data
    this._prev = null
    this._next = null
  }

  data() {
    return this._data
  }

  prev() {
  	return this._prev
  }

  next() {
    return this._next
  }

}

export default class DoublyLinkedList {

  constructor() {
    this._head = null
    this._tail = null
    this._size = 0
  }

  getHeadNode() {
    return this._head
  }

  getTailNode() {
    return this._tail
  }

  contains( data ) {
    return this.find( data ) !== -1
  }

  find( data ) {
    if ( !this.isEmpty() ) {
      let node = this.getHeadNode()
      let nextNode
      do {
        nextNode = node
        if ( node.data() === data ) {
          return node
        }
        else {
          node = node.next()
        }
      } while ( nextNode.next() !== null )

    }
    return -1
  }

  insert( data ) {
    const node = new Node( data )
    if ( this.isEmpty() ) {
      this._head = node
      this._tail = node
    }
    else {
      let previousNode = this._tail
      previousNode._next = node
      node._prev = previousNode
      this._tail = node
    }
    this._size++
  }

  insertFirst( data ) {

  }

  insertBefore( nodeData, data ) {

  }

  insertAfter( nodeData, data ) {

  }

  remove() {

  }

  removeFirst() {

  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this._size
  }

  clear() {
    this._head = null
    this._tail = null
    this._size = 0
  }

}
