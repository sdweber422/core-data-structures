import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import HashTable from '../src/hashTable'

chai.use( chaiChange )

describe( 'HashTable', function() {

  let myHashTable, testArray

    beforeEach( function() {
      myHashTable = new HashTable()
    })

  it( 'should be a function', function() {
    expect( HashTable ).to.be.a( 'function' )
  })

  describe( '#put', function() {

    context( 'when given the parameters ( "name", "Steve" )', function() {

      it( 'should add the key value pair to the Hash Table', function() {
        expect( () => myHashTable.put( "name", "Steve" ) ).to.alter( () => myHashTable.size(), { by: 1 } )
        expect( myHashTable.contains( "name" ) ).to.be.true
        expect( myHashTable.get( "name" ) ).to.eql( "Steve" )
      })

      it( 'should return a value of undefined', function() {
        expect( myHashTable.put( "name", "Steve") ).to.be.undefined
      })

    })

    context( 'when not given two parameters', function() {

      it( 'should throw a "Missing necessary parameter(s)" error', function() {
        expect( () => myHashTable.put( "name" ) ).to.throw( Error, "Missing necessary parameter(s)" )
      })

    })

    context( 'when the first parameter is not a string', function() {

      it( 'should throw a "Key given must be a string" error', function() {
        expect( () => myHashTable.put( 9, "train" ) ).to.throw( Error, "Key given must be a string" )
      })

    })

  })

  describe( '#get', function() {

    context( 'when the Hash Table contains { firstName: "Steve", lastName: "Weber" }', function() {

      it( 'should return the value associated with the key', function() {
        myHashTable.put( "firstName", "Steve" )
        myHashTable.put( "lastName", "Weber" )
        expect( myHashTable.get( "lastName" ) ).to.eql( "Weber" )
        expect( myHashTable.get( "firstName" ) ).to.eql( "Steve" )
      })

    })

    context( 'when the key does not exist in the Hash Table', function() {

      it( 'should return null', function() {
        expect( myHashTable.get( "occupation" ) ).to.be.null
      })

    })

    context( 'when not given a value', function() {

      it( 'should throw a "No key given" error', function() {
        expect( () => myHashTable.get() ).to.throw( Error, "No key given" )
      })

    })

    context( 'when argument is not a string', function() {

      it( 'should throw an error if argument is not a string', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( () => myHashTable.get( 5 ) ).to.throw( Error, "Key given must be a string")
      })

    })

  })

  describe( '#contains', function() {

    context( 'when Hash Table contains { make: "Ford", model: "Crown Victoria" }', function() {

      it( 'should return true for "make" key', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( myHashTable.contains( "make" ) ).to.be.true
      })

      it( 'should return false for "year" key', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( myHashTable.contains( "year" ) ).to.be.false
      })

    })

    context( 'when not given an argument', function() {

      it( 'should throw a "No key given" error', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( () => myHashTable.contains() ).to.throw( Error, "No key given" )
      })

    })

    context( 'when give an argument which is not a string', function() {

      it( 'should throw an error if argument is not a string', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( () => myHashTable.contains( 5 ) ).to.throw( Error, "Key given must be a string")
      })

    })

  })

  describe( '#iterate', function() {

    context( 'when the Hash Table contains { make: "Ford", model: "Crown Victoria" }', function() {

      it( 'should apply the given function to each key - value pair in Hash Table', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        testArray = []
        myHashTable.iterate( (key, value) => {
          testArray.push(key)
          testArray.push(value)
        })
        expect( testArray ).to.eql( [ "make", "Ford", "model", "Crown Victoria" ] )
      })

    })

    context( 'when parameter is not a function', function() {

      it( 'should throw a "No function given" error', function() {
        expect( () => myHashTable.iterate( "make" ) ).to.throw( Error, "No function given" )
      })

    })

  })

  describe( '#remove', function() {

    context( 'when the Hash Table contains { make: "Ford", model: "Crown Victoria" }', function() {

      it( 'should remove { make: "Ford" }', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( () => myHashTable.remove( "make" ) ).to.alter( () => myHashTable.contains( "make" ), { from: true, to: false } )
        expect( () => myHashTable.remove( "model" ) ).to.alter( () => myHashTable.size(), { from: 1, to: 0 } )
      })

    })

    context( 'when the key does not exist in the Hash Table', function() {

      it( 'should return null', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        expect( myHashTable.remove( "year" ) ).to.be.null
      })

    })

    context( 'when no argument is given', function() {

      it( 'should throw a "No key given" error', function() {
        expect( () => myHashTable.remove() ).to.throw( Error, "No key given" )
      })

    })

    context( 'when argument is not a string', function() {

      it( 'should throw a "Key given must be a string" error', function() {
        expect( () => myHashTable.remove( 5 ) ).to.throw( Error, "Key given must be a string" )
      })

    })

  })

  context( '#size', function() {

    context( 'when the Hash Table contains { make: "Ford", model: "Crown Victoria", year: 1984 }', function() {

      it( 'should return a size of 3', function() {
        myHashTable.put( "make", "Ford" )
        myHashTable.put( "model", "Crown Victoria" )
        myHashTable.put( "year", 1984 )
        expect( myHashTable.size() ).to.eql( 3 )
        expect( () => myHashTable.remove( "model" ) ).to.alter( () => myHashTable.size(), { by: -1 } )
      })

    })

    context( 'when the Hash Table is empty', function() {

      it( 'should return 0', function() {
        myHashTable.put( "make", "Ford" )
        expect( () => myHashTable.remove( "make" ) ).to.alter( () => myHashTable.size(), { from: 1, to: 0 } )
      })

    })


  })

  context( '.hash', function() {

    context( 'when provided with a string argument', function() {

      it( 'should return a hash based on the first letter of given key', function() {
        expect( HashTable.hash( "name" ) ).to.eql( '10npl' )
        expect( HashTable.hash( "title" ) ).to.eql( '20tvr' )
      })

    })

    context( 'when given an argument that is not a string', function() {

      it( 'should throw a "Key given must be a string" error', function() {
        expect( () => HashTable.hash( 5 ) ).to.throw( Error, "Key given must be a string" )
        expect( () => HashTable.hash( [ "title" ] ) ).to.throw( Error, "Key given must be a string" )
      })

    })

    context( 'when not given a value', function() {

      it( 'should throw a "No key given" error', function() {
        expect( () => HashTable.hash() ).to.throw( Error, "No key given" )
      })

    })

  })

})
