import chai, { expect, assert } from 'chai'
import chaiChange from 'chai-change'
import Set from '../src/set'

chai.use(chaiChange)

describe( 'Set', () => {

  let mySet, myOtherSet, forEachTestArray

  beforeEach( () => {
    mySet = new Set()
    myOtherSet = [ 5, 6, 7, 8 ]
  })

  it( 'exists', () => {
    expect( Set ).to.be.a( 'function' )
  })

  context( '#add( element )', () => {

    it( 'should add an element to the Set', () => {
      expect( () => mySet.add( 5 ) ).to.alter( () => mySet.contains( 5 ), { from: false, to: true } )
      expect( () => mySet.add( 6 ) ).to.alter( () => mySet.size(), { from: 1, to: 2 } )
    })

    it( 'should throw an error if add is called with no parameter', () => {
      expect( () => mySet.add() ).to.throw( Error, 'No element available to add' )
    })

  })

  context( '#remove( element )', () => {

    it( 'should remove the given element from the set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      expect( () => mySet.remove( 5 ) ).to.alter( () => mySet.contains( 5 ), { from: true, to: false } )
    })

    it( 'should throw an error if given element is not in set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      expect( () => mySet.remove( 99 ) ).to.throw( Error, 'Element does not exist in set' )
    })

  })

  context( '#isEmpty()', () => {

    it( 'should return true if Set is empty', () => {
      expect( mySet.isEmpty() ).to.be.true
    })

    it( 'should return false if Set is empty', () => {
      mySet.add( 5 )
      expect( mySet.isEmpty() ).to.be.false
    })

  })

  context( '#size()', () => {

    it( 'should return the size of the Set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      expect( mySet.size() ).to.eql( 3 )
    })

    it( 'should return 0 if Set is empty', () => {
      expect( mySet.size() ).to.eql( 0 )
    })
  })

  context( '#contains( element )', () => {

    it( 'should return true if the element exists in Set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      expect( mySet.contains( 6 ) ).to.be.true
    })

    it( 'should return false if element does not exist in the Set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      expect( mySet.contains( 99 ) ).to.be.false
    })
  })

  context( '#forEach( function )', () => {

    it( 'should apply function upon each element in the Set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      forEachTestArray = []
      expect( () => mySet.forEach( element => forEachTestArray.push( element * 2 ) ).to.alter( () => forEachTestArray, { from: [], to: [ 10, 12, 14 ] } ) )
    })

    it( 'should throw an error if no function is provided', () => {
      expect( () => mySet.forEach() ).to.throw( Error, 'No function provided')
      expect( () => mySet.forEach( 33 ) ).to.throw( Error, 'No function provided')
    })

  })

  context( '#union( otherSet )', () => {

    it( 'should return values of both sets without duplicates in ascending order', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.union( myOtherSet ) ).to.eql( [ 5, 6, 7, 8, 99 ] )
    })

    it( 'should return the values in original set if not given an array of value(s)', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.union() ).to.eql( [ 5, 6, 99 ] )
      expect( mySet.union( 'abc' ) ).to.eql( [ 5, 6, 99 ] )
    })

  })

  context( '#intersect( otherSet )', () => {

    it( 'should only return values that exist in both sets in ascending order', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.intersect( myOtherSet ) ).to.eql( [ 5, 6 ] )
    })

    it( 'should return the values in original set if not given an array of value(s)', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.intersect() ).to.eql( [ 5, 6, 99 ] )
      expect( mySet.intersect( 'abc' ) ).to.eql( [ 5, 6, 99 ] )
    })

  })

  context( '#difference( otherSet )', () => {

    it( 'should only return values that do not exist in both sets in ascending order', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.difference( myOtherSet ) ).to.eql( [ 7, 8, 99 ] )
    })

    it( 'should return the values in original set if not given an array of value(s)', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.difference() ).to.eql( [ 5, 6, 99 ] )
      expect( mySet.difference( 'abc' ) ).to.eql( [ 5, 6, 99 ] )
    })

  })

  context( '#isSubset( otherSet )', () => {

    it( 'should return true if all of a given set is found in the original set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      mySet.add( 8 )
      expect( mySet.isSubset( myOtherSet ) ).to.eql( true )
    })

    it( 'should return false if all of a given set is not found in the original set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.isSubset( myOtherSet ) ).to.eql( false )
    })

    it( 'should return the values in original set if not given an array of value(s)', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 99 )
      expect( mySet.isSubset() ).to.eql( false )
      expect( mySet.isSubset( 'abc' ) ).to.eql( false )
    })

  })

  context( '#clone()', () => {

    it( 'should return a Set object', () => {
      expect( mySet.clone() ).to.be.instanceof( Set )
      expect( mySet.clone() ).to.have.keys( '_data' )
    })

    it( 'should contain all of the elements of the cloned Set', () => {
      mySet.add( 5 )
      mySet.add( 6 )
      mySet.add( 7 )
      expect( mySet.clone() ).to.eql( { '_data': [ 5, 6, 7 ] } )
    })

  })

})
