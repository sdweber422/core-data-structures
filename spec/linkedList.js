import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import LinkedList from '../src/linkedList'

chai.use( chaiChange )

describe( 'LinkedList', () => {
  let myLinkedList

  beforeEach( () => {
    myLinkedList = new LinkedList()
  })

  it( 'exists', () => {
    expect( LinkedList ).to.be.a( 'function' )
  })

  context( '#getHeadNode()', () => {

    it( 'should return the first node in the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getHeadNode().next() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myLinkedList.getHeadNode().next() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should return null if Linked List is empty', () => {
      expect( myLinkedList.isEmpty() ).to.be.true
      expect( myLinkedList.getHeadNode() ).to.be.null
    })

  })

  context( '#getTailNode()', () => {

    it( 'should return the last node in the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should return null if the Linked List is empty', () => {
      expect( myLinkedList.isEmpty() ).to.be.true
      expect( myLinkedList.getTailNode() ).to.be.null
    })

  })

  context( '#find( data )', () => {

    it( 'should return the first node containing the provided data', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.find( "banana" ) ).to.have.property('_data').and.to.equal( "banana" )
    })

    it( 'should return -1 if provided data does not exist in the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.find( "orange" ) ).to.eql( -1 )
    })

  })

  context( '#contains( data )', () => {

    it( 'should return true if data exists in Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.contains( "banana" ) ).to.be.true
    })

    it( 'should return false if data does not exist in Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( myLinkedList.contains( "orange" ) ).to.be.false
    })

  })

  context( '#insert( data )', () => {

    it( 'should insert a node containing given data at the end of the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      myLinkedList.insert( "orange" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "orange" )
      expect( myLinkedList.find( "orange" ) ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should set the node equal to the head and tail of Linked List if inserted into empty list', () => {
      myLinkedList.insert( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should increase size of Linked List by 1', () => {
      expect( () => myLinkedList.insert( "apple" ) ).to.alter( () => myLinkedList.size(), { by: 1 } )
    })

  })

  context( '#insertFirst( data )', () => {

    it( 'should insert node with provided data at the beginning of the Linked List', () => {
      myLinkedList.insert( "apple" )
      expect( () => myLinkedList.insertFirst( "banana" ) ).to.alter( () => myLinkedList.getHeadNode().data(), { from: "apple", to: "banana" } )
    })

    it( 'should increase size of Linked List by 1', () => {
      expect( () => myLinkedList.insertFirst( "banana" ) ).to.alter( () => myLinkedList.size(), { by: 1 } )
    })

    it( 'should set the node equal to the head and tail of Linked List if inserted into empty list', () => {
      myLinkedList.insert( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#insertBefore( nodeData, data )', () => {

    it( 'should insert a node with given data before a node with given node data', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      myLinkedList.insertBefore( "banana", "watermelon" )
      expect( myLinkedList.find( "watermelon" ).next() ).to.have.property( "_data" ).and.to.equal( "banana" )
      expect( myLinkedList.find( "apple" ).next() ).to.have.property( "_data" ).and.to.equal( "watermelon" )
    })

    it( 'should increase size of Linked List by 1', () => {
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.insertBefore( "banana", "watermelon" ) ).to.alter( () => myLinkedList.size(), { by: 1 } )
    })

    it( 'should insert data at the end of Linked List if given node data does not exist', () => {
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.insertBefore( "hamburger", "apple" ) ).to.alter( () => myLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the node equal to the head and tail of Linked List if inserted into empty list', () => {
      myLinkedList.insertBefore( "banana", "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#insertAfter( nodeData, data )', () => {

    it( 'should insert a node with given data after a node with given node data', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      myLinkedList.insertAfter( "apple", "watermelon" )
      expect( myLinkedList.find( "apple" ).next() ).to.have.property( "_data" ).and.to.equal( "watermelon" )
      expect( myLinkedList.find( "watermelon" ).next() ).to.have.property( "_data" ).and.to.equal( "banana" )
    })

    it( 'should increase size of Linked List by 1', () => {
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.insertAfter( "banana", "watermelon" ) ).to.alter( () => myLinkedList.size(), { by: 1 } )
    })

    it( 'should insert data at the end of Linked List if given node data does not exist', () => {
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.insertAfter( "hamburger", "apple" ) ).to.alter( () => myLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the node equal to the head and tail of Linked List if inserted into empty list', () => {
      myLinkedList.insertAfter( "banana", "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getTailNode() ).to.have.property( "_next" ).and.to.be.null
      expect( myLinkedList.getHeadNode() ).to.have.property( "_data" ).and.to.equal( "apple" )
      expect( myLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

  })

  context( '#remove()', () => {

    it( 'should remove the tail node from the list', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.remove() ).to.alter( () => myLinkedList.getTailNode().data(), { from: "banana", to: "apple" } )
    })

    it( 'should set the previous node as the last node in the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      myLinkedList.remove()
      expect( myLinkedList.find( "apple") ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should reduce the size of the Linked List by 1', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.remove() ).to.alter( () => myLinkedList.size(), { by: -1 })
    })

    it( 'should clear Linked List data if it removes last element in list', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.remove()
      expect( myLinkedList.getHeadNode() ).to.be.null
      expect( myLinkedList.getTailNode() ).to.be.null
      expect( myLinkedList.size() ).to.eql( 0 )
    })

    it( 'should do nothing to an empty Linked List', () => {
      myLinkedList.remove()
      expect( myLinkedList.getHeadNode() ).to.be.null
      expect( myLinkedList.getTailNode() ).to.be.null
      expect( myLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#removeFirst()', () => {

    it( 'should remove the head node from the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.removeFirst() ).to.alter( () => myLinkedList.getHeadNode().data(), { from: "apple", to: "banana" } )
    })

    it( 'should set the next node as the first node in the Linked List', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      myLinkedList.removeFirst()
      expect( myLinkedList.getHeadNode() ).to.have.property( "_next" ).and.to.be.null
    })

    it( 'should reduce the size of the Linked List by 1', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.insert( "banana" )
      expect( () => myLinkedList.removeFirst() ).to.alter( () => myLinkedList.size(), { by: -1 })
    })

    it( 'should clear Linked List data if it removes last element in list', () => {
      myLinkedList.insert( "apple" )
      myLinkedList.removeFirst()
      expect( myLinkedList.getHeadNode() ).to.be.null
      expect( myLinkedList.getTailNode() ).to.be.null
      expect( myLinkedList.size() ).to.eql( 0 )
    })

    it( 'should do nothing to an empty Linked List', () => {
      myLinkedList.removeFirst()
      expect( myLinkedList.getHeadNode() ).to.be.null
      expect( myLinkedList.getTailNode() ).to.be.null
      expect( myLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#isEmpty()', () => {

    it( 'should return true if Linked List is empty', () => {
      expect( myLinkedList.isEmpty() ).to.be.true
    })

    it( 'should return false if Linked List is not empty', () => {
      myLinkedList.insert( "banana" )
      expect( myLinkedList.isEmpty() ).to.be.false
    })

  })

  context( '#size()', () => {

    it( 'should return the size of the Linked List', () => {
      myLinkedList.insert( "banana" )
      myLinkedList.insert( "apple" )
      expect( myLinkedList.size() ).to.eql( 2 )
    })

    it( 'should return 0 if Linked List is empty', () => {
      expect( myLinkedList.size() ).to.eql( 0 )
    })

  })

  context( '#clear()', () => {
    
    it( 'should set the Linked List head and tail to null and size to 0 when invoked', () => {
      myLinkedList.insert( "banana" )
      myLinkedList.insert( "apple" )
      myLinkedList.clear()
      expect( myLinkedList.getHeadNode() ).to.be.null
      expect( myLinkedList.getTailNode() ).to.be.null
      expect( myLinkedList.size() ).to.eql( 0 )
    })

  })

})
