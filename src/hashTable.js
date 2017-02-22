'use strict'

const ARBITRARY_ZIP_CODE_HASH = 94607
const LENGTH_OF_ALPHABET = 26
const node = ( key, value ) => {
  let obj = {}
  obj[ key ] = value
  return obj
}

export default class HashTable {

	constructor() {
    this.length = 0
    this.collection = {}
	}

	put( key, value ) {
    if ( !value ) {
      throw new Error( 'Missing necessary parameter(s)' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Key must be a string' )
    }

    let index = HashTable.hash( key ) % LENGTH_OF_ALPHABET
    let newNode = node( key, value )

    if ( this.collection[index] ) {
      this.collection[index].push( newNode )
    }
    else {
      this.collection[index] = [ newNode ]
    }

    this.length++
	}

	get( key ) {
    if ( !key ) {
      throw new Error( 'No key given' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Key given must be a string' )
    }

    let index = HashTable.hash( key ) % LENGTH_OF_ALPHABET

    if( this.collection[ index ] ) {
      let keyFilter = this.collection[ index ].filter( node =>
        Object.keys( node )[0] === key )
      if( keyFilter.length > 0 ) {
        return Object.values(keyFilter[0])[0]
      }
      else {
        return null
      }
    }
    else {
      return null
    }
	}

	contains( key ) {
    if ( !key ) {
      throw new Error( 'No key given' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Key given must be a string' )
    }
    return this.get( key ) !== null
	}

	iterate( callback ) {
    if ( typeof callback !== 'function' ) {
      throw new Error( 'No function given' )
    }
    Object.keys(this.collection).forEach( key => this.collection[ key ].forEach( node => callback( Object.keys( node )[0], Object.values( node )[0] ) ) )
	}

	remove( key ) {
    if ( !key ) {
      throw new Error( 'No key given' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Key given must be a string' )
    }
    if ( !this.contains( key ) ) {
      return null
    }

    let index = HashTable.hash( key ) % LENGTH_OF_ALPHABET
    let bucket = this.collection[ index ]

    bucket.forEach( ( node, index ) => {
      if (Object.keys( node )[0] === key ) {
        bucket.splice( index, 1 )
      }
    })
    this.length--
	}

	size() {
    return this.length
	}

	static hash( key ) {
    if ( !key ) {
      throw new Error( 'No key given' )
    }
    if ( typeof key !== 'string' ) {
      throw new Error( 'Hashed value must be a string' )
    }
    return key.toLowerCase().charCodeAt(0) * ARBITRARY_ZIP_CODE_HASH
	}

}
