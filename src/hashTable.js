'use strict'

const ARBITRARY_LG_ZIP_CODE = 94607
const LENGTH_OF_ALPHABET = 26

class Node {

  constructor( key, value ) {
    this.key = key
    this.value = value
  }

}

export default class HashTable {

  constructor() {
    this.length = 0
    this.collection = {}
  }

  put( key, value ) {

    HashTable.validateKey( key )

    if ( !value ) {
      throw new Error( 'Missing necessary parameter(s)' )
    }

    let newNode = new Node( key, value )

    if ( this.collection[ HashTable.hash( key ) ] ) {
      this.collection[ HashTable.hash( key ) ].push( newNode )
    }
    else {
      this.collection[ HashTable.hash( key ) ] = [ newNode ]
    }

    this.length++

  }

  get( key ) {

    HashTable.validateKey( key )

    if( !this.collection[ HashTable.hash( key ) ] ) {
      return null
    }

    let keyFilter = this.collection[ HashTable.hash( key ) ].filter( node =>
      node.key === key )

    if( keyFilter.length < 1 ) {
      return null
    }

    return keyFilter[ 0 ].value

  }

  contains( key ) {

    HashTable.validateKey( key )

    return this.get( key ) !== null

  }

  iterate( callback ) {

    if ( typeof callback !== 'function' ) {
      throw new Error( 'No function given' )
    }

    Object.keys(this.collection)
      .forEach( key =>
        this.collection[ key ].forEach( node =>
          callback( node.key, node.value )
        )
      )

  }

  remove( key ) {

    HashTable.validateKey( key )

    if ( !this.contains( key ) ) {
      return null
    }

    let bucket = this.collection[ HashTable.hash( key ) ]

    bucket.forEach( ( node, index ) => {
      if ( node.key === key ) {
        bucket.splice( index, 1 )
      }
    })

    this.length--

  }

  size() {

    return this.length

  }

  static hash( key ) {

    HashTable.validateKey( key )

    let keyCharCode = key.toLowerCase().charCodeAt( 0 )
    let hashKeyEnding =
      String.fromCharCode( keyCharCode, keyCharCode + 2, keyCharCode - 2 )

    return keyCharCode
             * ARBITRARY_LG_ZIP_CODE
               % LENGTH_OF_ALPHABET
                 + hashKeyEnding

  }

  static validateKey( key ) {

    if ( !key ) {
      throw new Error( 'No key given' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Key given must be a string' )
    }

  }

}
