class Node {

  constructor( data ) {
    this._data = data
    this._next = null
  }

  data() {
    return this._data
  }

  next() {
    return this._next
  }

}

export default class LinkedList {

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

// Helper function
  findNodeWithNext( data ) {
    if ( !this.isEmpty() ) {
      let node = this.getHeadNode()
      let nextNode
      let lastOccurenceOfNodeWithNextData = -1
      do {
        nextNode = node
        if ( node.next() !== null && node.next()._data ) {
          lastOccurenceOfNodeWithNextData = node
        }
        node = node.next()
      } while ( nextNode.next() !== null )
      return lastOccurenceOfNodeWithNextData
    }
    return -1
  }

// Helper function
  findFirstNodeWithNext( data ) {
    if ( !this.isEmpty() ) {
      let node = this.getHeadNode()
      let nextNode
      let lastOccurenceOfNodeWithNextData = -1
      do {
        nextNode = node
        if ( node.next() !== null && node.next()._data ) {
          return lastOccurenceOfNodeWithNextData = node
        }
        node = node.next()
      } while ( nextNode.next() !== null )
      return lastOccurenceOfNodeWithNextData
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
      this._tail = node
    }
    this._size++
  }

  insertFirst( data ) {
    if( this.isEmpty() ) {
      this.insert( data )
    }
    else {
      const node = new Node( data )
      let secondNode = this._head
      node._next = secondNode
      this._head = node
      this._size++
    }
  }

  insertBefore( nodeData, data ) {
    let nodeToInsertBefore = this.find( nodeData )
    let previousNodeToInsertBefore = this.findFirstNodeWithNext( nodeData )
    if ( nodeToInsertBefore === -1 ) {
      this.insert( data )
    }
    else if( this.isEmpty() || nodeToInsertBefore === this.getHeadNode() ) {
      this.insertFirst( data )
    }
    else {
      const newNode = new Node( data )
      newNode._next = nodeToInsertBefore
      previousNodeToInsertBefore._next = newNode
      this._size++
    }
  }

  insertAfter( nodeData, data ) {
    let nodeToInsertAfter = this.find( nodeData )
    if ( this.isEmpty() || nodeToInsertAfter === -1 || nodeToInsertAfter.next() === null ) {
      this.insert( data )
    }
    else {
      const newNode = new Node( data )
      newNode._next = nodeToInsertAfter.next()
      nodeToInsertAfter._next = newNode
      this._size++
    }
  }

  remove() {
    let lastNode = this.getTailNode()
    if ( this.size() < 2 ) {
      this.clear()
    }
    else {
      let lastToNextNode = this.findNodeWithNext( lastNode.data() )
      lastToNextNode._next = null
      this._tail = lastToNextNode
      this._size--
    }
  }

  removeFirst() {
    if ( this.size() < 2 ) {
      this.clear()
    }
    else {
      let newHeadNode = this._head.next()
      this._head._next = null
      this._head = newHeadNode
      this._size--
    }
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
