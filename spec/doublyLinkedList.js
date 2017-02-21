import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DoublyLinkedList from '../src/doublyLinkedList'

chai.use( chaiChange )

describe.only( 'DoublyLinkedList', () => {
  let myDoublyLinkedList

  beforeEach( () => {
    myDoublyLinkedList = new DoublyLinkedList()
  })

  it( 'exists', () => {
    expect( DoublyLinkedList ).to.be.a( 'function' )
  })

  context( '#getHeadNode()', () => {

    it( 'should return the first node in the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getHeadNode().next() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myDoublyLinkedList.getHeadNode().next() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should return null if Doubly Linked List is empty', () => {
      expect( myDoublyLinkedList.isEmpty() ).to.be.true
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
    })

  })

  context( '#getTailNode()', () => {

    it( 'should return the last node in the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should return null if the Doubly Linked List is empty', () => {
      expect( myDoublyLinkedList.isEmpty() ).to.be.true
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
    })

  })

  context( '#find( data )', () => {

    it( 'should return the first node containing the provided data', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.find( "banana" ) ).to.have.property('_data').and.to.equal( "banana" )
    })

    it( 'should return -1 if provided data does not exist in the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.find( "orange" ) ).to.eql( -1 )
    })

  })

  context( '#contains( data )', () => {

    it( 'should return true if data exists in Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.contains( "banana" ) ).to.be.true
    })

    it( 'should return false if data does not exist in Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.contains( "orange" ) ).to.be.false
    })

  })

  context( '#insert( data )', () => {

    it( 'should insert a node containing given data at the end of the Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.insert( "orange" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "orange" )
      expect( myDoublyLinkedList.find( "orange" ) ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should set the node equal to the head and tail of Doubly Linked List if inserted into empty list', () => {
      myDoublyLinkedList.insert( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should increase size of Doubly Linked List by 1', () => {
      expect( () => myDoublyLinkedList.insert( "apple" ) ).to.alter( () => myDoublyLinkedList.size(), { by: 1 } )
    })

  })

  context( '#insertFirst( data )', () => {

    it( 'should insert node with provided data at the beginning of the Doubly Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      expect( () => myDoublyLinkedList.insertFirst( "banana" ) ).to.alter( () => myDoublyLinkedList.getHeadNode().data(), { from: "apple", to: "banana" } )
    })

    it( 'should increase size of Doubly Linked List by 1', () => {
      expect( () => myDoublyLinkedList.insertFirst( "banana" ) ).to.alter( () => myDoublyLinkedList.size(), { by: 1 } )
    })

    it( 'should set the node equal to the head and tail of Doubly Linked List if inserted into empty list', () => {
      myDoublyLinkedList.insert( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#insertBefore( nodeData, data )', () => {

    it( 'should insert a node with given data before a node with given node data', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.insertBefore( "banana", "watermelon" )
      expect( myDoublyLinkedList.find( "watermelon" ).next() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myDoublyLinkedList.find( "apple" ).next() ).to.have.property( "_data" ).and.to.equal( "watermelon" )
    })

    it( 'should increase size of Doubly Doubly Doubly Linked List by 1', () => {
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.insertBefore( "banana", "watermelon" ) ).to.alter( () => myDoublyLinkedList.size(), { by: 1 } )
    })

    it( 'should insert data at the end of Doubly Doubly Linked List if given node data does not exist', () => {
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.insertBefore( "hamburger", "apple" ) ).to.alter( () => myDoublyLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the node equal to the head and tail of Doubly Doubly Linked List if inserted into empty list', () => {
      myDoublyLinkedList.insertBefore( "banana", "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#insertAfter( nodeData, data )', () => {

    it( 'should insert a node with given data after a node with given node data', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.insertAfter( "apple", "watermelon" )
      expect( myDoublyLinkedList.find( "apple" ).next() ).to.have.property( "_data" ).and.to.equal( "watermelon" )
      expect( myDoublyLinkedList.find( "watermelon" ).next() ).to.have.property( "_data" ).and.to.equal( "banana" )
    })

    it( 'should increase size of Doubly Linked List by 1', () => {
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.insertAfter( "banana", "watermelon" ) ).to.alter( () => myDoublyLinkedList.size(), { by: 1 } )
    })

    it( 'should insert data at the end of Doubly Linked List if given node data does not exist', () => {
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.insertAfter( "hamburger", "apple" ) ).to.alter( () => myDoublyLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the node equal to the head and tail of Doubly Linked List if inserted into empty list', () => {
      myDoublyLinkedList.insertAfter( "banana", "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#remove()', () => {

    it( 'should remove the tail node from the list', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.remove() ).to.alter( () => myDoublyLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the previous node as the last node in the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.remove()
      expect( myDoublyLinkedList.find( "apple") ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should reduce the size of the Doubly Linked List by 1', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.remove() ).to.alter( () => myDoublyLinkedList.size(), { by: -1 })
    })

    it( 'should clear Doubly Linked List data if it removes last element in list', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.remove()
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

    it( 'should do nothing to an empty Doubly Linked List', () => {
      myDoublyLinkedList.remove()
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#removeFirst()', () => {

    it( 'should remove the head node from the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.removeFirst() ).to.alter( () => myDoublyLinkedList.getHeadNode().data(), { from: "apple", to: "banana" } )
    })

    it( 'should set the next node as the first node in the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.removeFirst()
      expect( myDoublyLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should reduce the size of the Doubly Linked List by 1', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.insert( "banana" )
      expect( () => myDoublyLinkedList.removeFirst() ).to.alter( () => myDoublyLinkedList.size(), { by: -1 })
    })

    it( 'should clear Doubly Linked List data if it removes last element in list', () => {
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.removeFirst()
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

    it( 'should do nothing to an empty Doubly Linked List', () => {
      myDoublyLinkedList.removeFirst()
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#isEmpty()', () => {

    it( 'should return true if Doubly Linked List is empty', () => {
      expect( myDoublyLinkedList.isEmpty() ).to.be.true
    })

    it( 'should return false if Doubly Linked List is not empty', () => {
      myDoublyLinkedList.insert( "banana" )
      expect( myDoublyLinkedList.isEmpty() ).to.be.false
    })

  })

  context( '#size()', () => {

    it( 'should return the size of the Doubly Linked List', () => {
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.insert( "apple" )
      expect( myDoublyLinkedList.size() ).to.eql( 2 )
    })

    it( 'should return 0 if Doubly Linked List is empty', () => {
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#clear()', () => {

    it( 'should set the Doubly Linked List head and tail to null and size to 0 when invoked', () => {
      myDoublyLinkedList.insert( "banana" )
      myDoublyLinkedList.insert( "apple" )
      myDoublyLinkedList.clear()
      expect( myDoublyLinkedList.getHeadNode() ).to.be.null
      expect( myDoublyLinkedList.getTailNode() ).to.be.null
      expect( myDoublyLinkedList.size() ).to.eql( 0 )
    })

  })

})
