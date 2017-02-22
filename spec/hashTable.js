import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import HashTable from '../src/hashTable'

chai.use( chaiChange )

describe( 'HashTable', () => {

	it( 'exists', () => {
		expect( HashTable ).to.be.a( 'function' )
	})

	let myHashTable, testArray

	beforeEach( () => {
		myHashTable = new HashTable()
	})

	context( '#put( key, value )', () => {

		it( 'should add the key value pair to the Hash Table', () => {
			expect( () => myHashTable.put( "name", "Steve" ) ).to.alter( () => myHashTable.size(), { by: 1 } )
			expect( myHashTable.contains( "name" ) ).to.be.true
			expect( myHashTable.get( "name" ) ).to.eql( "Steve" )
		})

		it( 'should throw an error if not given two parameters', () => {
			expect( () => myHashTable.put( "name" ) ).to.throw( Error, "Missing necessary parameter(s)" )
		})

		it( 'should throw an error if the first argument is not a string', () => {
			expect( () => myHashTable.put( 9, "train" ) ).to.throw( Error, "Key must be a string" )
		})

	})

	context( '#get( key )', () => {

		it( 'should return the value associated with the key', () => {
			myHashTable.put( "firstName", "Steve" )
			myHashTable.put( "lastName", "Weber" )
			expect( myHashTable.get( "lastName" ) ).to.eql( "Weber" )
			expect( myHashTable.get( "firstName" ) ).to.eql( "Steve" )
		})

		it( 'should return null if key does not exist', ()  => {
			expect( myHashTable.get( "occupation" ) ).to.be.null
		})

		it( 'should throw an error if not given a value', () => {
			expect( () => myHashTable.get() ).to.throw( Error, "No key given" )
		})

		it( 'should throw an error if argument is not a string', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( () => myHashTable.get( 5 ) ).to.throw( Error, "Key given must be a string")
		})

	})

	context( '#contains( key )', () => {

		it( 'should return true if the Hash Table contains the given key', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( myHashTable.contains( "make" ) ).to.be.true
			expect( myHashTable.contains( "model" ) ).to.be.true
		})

		it( 'should return false if the Hash Table does not contain the given key', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( myHashTable.contains( "year" ) ).to.be.false
			expect( myHashTable.contains( "Ford" ) ).to.be.false
		})

		it( 'should throw an error if not given an argument', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( () => myHashTable.contains() ).to.throw( Error, "No key given" )
		})

		it( 'should throw an error if argument is not a string', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( () => myHashTable.contains( 5 ) ).to.throw( Error, "Key given must be a string")
		})

	})

	context( '#iterate( callback )', () => {

		it( 'should take a function and apply it to each key, value pair in sequence', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			testArray = []
			myHashTable.iterate( (key, value) => {
				testArray.push(key)
				testArray.push(value)
			})
			expect( testArray ).to.eql( [ "make", "Ford", "model", "Crown Victoria" ] )
		})

		it( 'should throw an error if not given a function', () => {
			expect( () => myHashTable.iterate( "make" ) ).to.throw( Error, "No function given" )
		})

	})

	context( '#remove( key )', () => {

		it( 'should remove a key, value pair by given key', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( () => myHashTable.remove( "make" ) ).to.alter( () => myHashTable.contains( "make" ), { from: true, to: false } )
			expect( () => myHashTable.remove( "model" ) ).to.alter( () => myHashTable.size(), { from: 1, to: 0 } )
		})

		it( 'should return null if the key does not exist in the Hash Table', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			expect( myHashTable.remove( "year" ) ).to.be.null
		})

		it( 'should return null if no key is given', () => {
			expect( () => myHashTable.remove() ).to.throw( Error, "No key given" )
		})

		it( 'should throw an error if given a key that is not a string', () => {
			expect( () => myHashTable.remove( 5 ) ).to.throw( Error, "Key given must be a string" )
		})

	})

	context( '#size', () => {

		it( 'should return size of the Hash Table according to number of key, value pairs', () => {
			myHashTable.put( "make", "Ford" )
			myHashTable.put( "model", "Crown Victoria" )
			myHashTable.put( "year", 1984 )
			expect( myHashTable.size() ).to.eql( 3 )
			expect( () => myHashTable.remove( "model" ) ).to.alter( () => myHashTable.size(), { by: -1 } )
		})

		it( 'should return 0 if Hash Table is empty', () => {
			myHashTable.put( "make", "Ford" )
			expect( () => myHashTable.remove( "make" ) ).to.alter( () => myHashTable.size(), { from: 1, to: 0 } )
		})

	})

	context( '.hash( key )', () => {

		it( 'should return a hash based on the first letter of given key', () => {
			expect( HashTable.hash( "name" ) ).to.eql( 10406770 )
			expect( HashTable.hash( "title" ) ).to.eql( 10974412 )
		})

		it( 'should throw an error if not given a string', () => {
			expect( () => HashTable.hash( 5 ) ).to.throw( Error, "Hashed value must be a string" )
			expect( () => HashTable.hash( [ "title" ] ) ).to.throw( Error, "Hashed value must be a string" )
		})

		it( 'should throw an error if not given a value', () => {
			expect( () => HashTable.hash() ).to.throw( Error, "No key given" )
		})

	})

})
