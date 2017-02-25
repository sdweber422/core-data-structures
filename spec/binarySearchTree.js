import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import BinarySearchTree from '../src/binarySearchTree'

chai.use( chaiChange )

describe( 'BinarySearchTree', function() {

  let bst

  beforeEach( function() {
    bst = new BinarySearchTree()
  })

  it( 'should be a function', function() {
    expect( BinarySearchTree ).to.be.a( 'function' )
  })


  describe( '#insert', function() {

    context( 'when given the parameter "Steve"', function() {

      it( 'should insert a node with the given value into the Binary Search Tree', function() {
        expect( () => bst.insert( "Steve" ) ).to.alter(() => bst.size(), { by: 1 } )
        expect( bst.search( "Steve" ) ).to.have.property( "key" ).and.to.eql( "Steve" )
      })

      it( 'should return a value of undefined', function() {
        expect( bst.insert( "Steve" ) ).to.be.undefined
      })

    })

    context( 'when given a parameter that already exists in the Binary Search Tree', function() {

      it( 'should return a "Duplicate key not allowed" error', function() {
        bst.insert( "Steve" )
        bst.insert( "Susan" )
        expect( () => bst.insert( "Susan" ) ).to.throw( Error, "Duplicate key not allowed" )
      })
    })

    context( 'when given more than one parameter', function() {

      it( 'should throw a "Too many arguments" error', function() {
        expect( () => bst.insert( "Monica", 555-6677 ) ).to.throw( Error, "Too many arguments" )
        expect( () => bst.insert( "Monica", 555-6677, 555-4444 ) ).to.throw( Error, "Too many arguments" )
      })

    })

    context( 'when the parameter is not a string', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.insert( [ 5, 6, 7] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when the parameter is not a number', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.insert( [ 5, 6, 7] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when not given a parameter', function() {

      it( 'should throw a "No parameter(s) given" error', function() {
        expect( () => bst.insert() ).to.throw( Error, "No parameter(s) given" )
      })

    })


  })

  describe( '#search', function() {

    context( 'when given parameter "Steve"', function() {

      it( 'should return Node { key: "Steve", data: "Steve" }', function() {
        bst.insert( "Steve" )
        bst.insert( "John" )
        bst.insert( "Susan" )
        expect( bst.search( "Steve" ) ).to.have.property( "key" ).and.to.eql( "Steve" )
      })

    })

    context( 'when given a key that does not exist in the Binary Search Tree', function() {

      it( 'should return null', function() {
        bst.insert( "Steve" )
        bst.insert( "John" )
        bst.insert( "Susan" )
        expect( bst.search( "Alice" ) ).to.be.null
      })

    })

    context( 'when given more than one argument', function() {

      it( 'should throw a "Too many arguments" error', function() {
        expect( () => bst.search( "Steve", 555-9999 ) ).to.throw( Error, "Too many arguments" )
      })

    })

    context( 'when parameter is not a string', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.search( [ 9, 8, 7 ] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when parameter is not a number', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.search( [ 9, 8, 7 ] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when not given a parameter', function() {

      it( 'should throw a "No parameter(s) given" error', function() {
        expect( () => bst.search() ).to.throw( Error, "No parameter(s) given" )
      })

    })

  })

  describe( '#remove', function() {

    context( 'when removing any key that exists in the Binary Search Tree', function() {

      it( 'should return undefined', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 111 )
        expect( bst.remove( 88 ) ).to.be.undefined
      })

    })

    context( 'when given the key of 88 (which has no children)', function() {

      it( 'should remove the Node with the key of 88', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 111 )
        bst.remove( 88 )
        expect( bst.search( 88 ) ).to.be.null
        expect( bst.size() ).to.eql( 2 )
      })

    })

    context( 'when given the key of 88 (which has one child)', function() {

      it( 'should remove the Node with the key of 88', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 77 )
        bst.insert( 111 )
        bst.remove( 88 )
        expect( bst.search( 88 ) ).to.be.null
        expect( bst.size() ).to.eql( 3 )
      })

      it( 'should replace it with its child Node', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 77 )
        bst.insert( 111 )
        expect( () => bst.remove( 88 ) ).to.alter( () => bst.search( 99 ).left.key, {  from: 88, to: 77 } )

      })

    })

    context( 'when given the key of 99 (the root with two children)', function() {

      it( 'should remove the Node with the key of 99', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 77 )
        bst.insert( 111 )
        bst.insert( 112 )
        bst.insert( 109 )
        bst.insert( 107 )
        bst.remove( 99 )
        expect( bst.search( 99 ) ).to.be.null
        expect( bst.size() ).to.eql( 6 )
      })

      it( 'should replace it with the Node with the lowest key in the right subtree', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 77 )
        bst.insert( 111 )
        bst.insert( 112 )
        bst.insert( 109 )
        bst.insert( 107 )
        expect( bst.search( 99 ).left.key ).to.eql( 88 )
        expect( bst.search( 99 ).right.key ).to.eql( 111 )
        bst.remove( 99 )
        expect( bst.search( 107 ).left.key ).to.eql( 88 )
        expect( bst.search( 107 ).right.key ).to.eql( 111 )

      })

    })

    context( 'when given a key that does not exist in the Binary Search Tree', function() {

      it( 'should return null', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 111 )
        expect( bst.remove( 777 ) ).to.be.null
      })

    })

    context( 'when given more than one argument', function() {

      it( 'should throw a "Too many arguments" error', function() {
        bst.insert( 99 )
        expect( () => bst.remove( 99, 101 ) ).to.throw( Error, "Too many arguments" )
      })

    })

    context( 'when parameter is not a string', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.remove( [ 9, 8, 7 ] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when parameter is not a number', function() {

      it( 'should throw a "Key must be a string or number" error', function() {
        expect( () => bst.remove( [ 9, 8, 7 ] ) ).to.throw( Error, "Key must be a string or number" )
      })

    })

    context( 'when not given a parameter', function() {

      it( 'should throw a "No parameter(s) given" error', function() {
        expect( () => bst.remove() ).to.throw( Error, "No parameter(s) given" )
      })

    })

  })
  // Still working on traversal method
  // describe( '#traverse', function() {
  //
  // })

  describe( '#size', function() {

    context( 'when the Binary Search Tree contains 3 items', function() {

      it( 'should return 3', function() {
        bst.insert( 99 )
        bst.insert( 88 )
        bst.insert( 111 )
        expect( bst.size() ).to.eql( 3 )
      })

    })

    context( 'when the Binary Search Tree is empty', function() {

      it( 'should return 0', function() {
        bst.insert( 99 )
        bst.remove( 99 )
        expect( bst.size() ).to.eql( 0 )
      })
    })
  })


})
