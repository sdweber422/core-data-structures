'use strict'

export default class Set {

  constructor( data = [] ) {
    this._data = data
  }

  add( element ) {
    if ( !element ) {
      throw new Error( 'No element available to add' )
    }
    this._data.push( element )
  }

  isEmpty() {
    return this.size() === 0
  }

  contains( element ) {
    return this._data.includes( element )
  }

  remove( element ) {
    if ( !this._data.includes( element ) ) {
      throw new Error( 'Element does not exist in set' )
    }
    this._data = this._data.filter( data => data !== element )
  }

  forEach( givenFunction ) {
    if ( typeof givenFunction === 'function' ) {
      return this._data.forEach( givenFunction )
    }
    else {
      throw new Error( 'No function provided' )
    }
  }

  size() {
    return this._data.length
  }

  union( otherSet ) {
    if( !otherSet || !Array.isArray( otherSet ) ) {
      return this._data
    }
    return otherSet.reduce( ( memo, element ) => {
      if ( !memo.includes( element ) ) {
        memo.push( element )
      }
      return memo
    }, this._data ).sort( ( element, nextElement ) => {
      return element > nextElement
    })
  }

  intersect( otherSet ) {
    if( !otherSet || !Array.isArray( otherSet ) ) {
      return this._data
    }
    return otherSet.reduce( ( memo, element ) => {
      if ( this._data.includes( element ) ) {
        memo.push( element )
      }
      return memo
    }, [] ).sort( ( element, nextElement )  => {
      return element > nextElement
    })
  }

  difference( otherSet ) {
    if( !otherSet || !Array.isArray( otherSet ) ) {
      return this._data
    }
    return this._data.reduce( ( memo, element ) => {
      if ( !otherSet.includes( element ) ) {
        memo.push( element )
      }
      return memo
    }, [] )
  }

  isSubset( otherSet ) {
    if( !otherSet || !Array.isArray( otherSet ) ) {
      return false
    }
    return otherSet.filter( element => this._data.includes( element ) ).length === otherSet.length
  }

  clone() {
    return new Set( this._data )
  }

}
