'use strict'

class Node {

  constructor( key ) {

    this.key = key
    this.left = null
    this.right = null

  }

}


export default class BinarySearchTree {

  constructor() {

    this.root = null
    this.count = 0

  }


  insert( key ) {

    this.validateArgs( [...arguments] )

    let node = new Node( key )

    if ( this.root === null ) {
      this.root = node
      this.count++
    }
    else {
      this.insertion( this.root, key )
    }

  }

  search( key ) {

    this.validateArgs( [...arguments] )

    return this.searcher( this.root, key )

  }

  remove( key ) {

    this.validateArgs( [ ...arguments ] )

    if ( this.search( key ) === null ) {
      return null
    }

    this.remover( this.root, key )

  }

  traverse( order, callback ) {

    if ( arguments.length === 0 ) {
      throw new Error( 'No parameter(s) given' )
    }
    if ( arguments.length > 2 ) {
      throw new Error( 'Too many arguments' )
    }
    if ( typeof order !== 'string' ) {
      throw new Error( 'First parameter must be a string' )
    }
    if ( typeof callback !== 'function' ) {
      throw new Error( 'Second parameter must be a function' )
    }

    let result = []

    if ( order === 'preOrder' ) {
      return this.preorder( this.root, callback, result )
    }
    else if ( order === 'inOrder' ) {
      return this.inorder( this.root, callback )
    }
    else if ( order === 'postOrder' ) {
      return this.postorder( this.root, callback )
    }
    else {
      throw new Error( 'Order given is not defined' )
    }

  }

  size() {

    return this.count

  }

  // Recursive helper functions

  insertion( node, key ) {

    if ( node.key === key ) {
      throw new Error( 'Duplicate key not allowed' )
    }
    if ( key < node.key ) {
      if ( node.left === null ) {
        this.count++
        node.left = new Node( key )
      }
      else {
        this.insertion( node.left, key )
      }
    }
    else {
      if ( node.right === null ) {
        this.count++
        node.right = new Node( key )
      }
      else {
        this.insertion( node.right, key )
      }
    }

  }

  searcher( node, key ) {

    if ( node === null ) {
      return null
    }
    if ( key < node.key ) {
      if ( key === node.key ) {
        return node
      }
      else {
        return this.searcher( node.left, key )
      }
    }
    else {
      if ( key === node.key ) {
        return node
      }
      else {
        return this.searcher( node.right, key )
      }
    }

  }

// WIP: preorder and other traversal functions are not complete
  preorder( baseNode, node, callback, result ) {

    if( node === null ) {
      return null
    }

    if ( node.left !== null ) {
      result.push( node )
      return this.preorder( node, node.left, callback, result )
    }
    else if ( node.right !== null ){
      result.push( node )
      return this.preorder( node, node.right, callback, result )
    }
    else if ( baseNode )

    return result


  }
// WIP: end

  remover( node, key ) {

    if ( node === null ) {
      return null
    }
    if ( key === node.key) {


      if ( node.left === null && node.right === null ) {
        this.count--
        return null
      }
      if( node.left === null ) {
        this.count--
        return node.right
      }
      if ( node.right === null ) {
        this.count--
        return node.left
      }

      let temporaryNode = this.smallestNodeInRightSubtree( node.right )
      node.key = temporaryNode.key
      node.right = this.remover( node.right, temporaryNode.key )
      return node

    }
    else if ( key < node.key ) {
      node.left = this.remover( node.left, key )
      return node
    }
    else {
      node.right = this.remover( node.right, key )
      return node
    }

  }

  smallestNodeInRightSubtree( node ) {

    while( node.left !== null ) {
      return this.smallestNodeInRightSubtree( node.left )
    }

    return node
  }

  // Error checking

  validateArgs( args ) {

    if ( args.length === 0 ) {
      throw new Error( 'No parameter(s) given')
    }
    if( args.length > 1 ) {
      throw new Error( 'Too many arguments' )
    }
    if( typeof args[0] === 'string' || typeof args[0] === 'number' ) {
      return
    }

    throw new Error( 'Key must be a string or number' )

  }

}
