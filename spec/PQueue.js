'use strict'
import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import PQueue from '../src/PQueue'

chai.use(chaiChange)

// Element priority starts with 1 being the highest priority

describe( 'PQueue', () => {
  let myPQueue
  beforeEach( () => {
    myPQueue = new PQueue()
  })

  it( 'exists', () => {
    expect( PQueue ).to.be.a( 'function' )
  })

  context( '#enqueue( element, priority )', () => {
    it( 'should add an object with element and priority to the queue', () => {
      myPQueue.enqueue( "foo", 100 )
      expect( myPQueue.front() ).to.eql( { element: "foo", priority: 100 } )
    })
    it( 'should add an element and position it by priority', () => {
      myPQueue.enqueue( "foo", 100 )
      myPQueue.enqueue( "bar", 150 )
      myPQueue.enqueue( "foobar", 125 )
      expect( myPQueue.back() ).to.eql( { element: "bar", priority: 150 } )
    })
    it( 'should add an element equal to the priority of an existing element behind that element', () => {
      myPQueue.enqueue( "foo", 100 )
      myPQueue.enqueue( "bar", 100 )
      expect( myPQueue.back() ).to.eql( { element: "bar", priority: 100 } )
    })
    it( 'should throw an error if priority is less than 1', () => {
      expect( () => myPQueue.enqueue( "foo", -1 ) ).to.throw( Error, 'This priority is invalid' )
    })
  })

  context( '#dequeue()', () => {
    it( 'should return the highest priority element in the Priority Queue', () => {
      myPQueue.enqueue( "foo", 100 )
      myPQueue.enqueue( "bar", 100 )
      myPQueue.enqueue( "foobar", 150 )
      expect( myPQueue.dequeue() ).to.eql( { element: "foo", priority: 100 } )
    })
    it( 'should remove the highest priority element from the Priority Queue', () => {
      myPQueue.enqueue( "foo", 100 )
      myPQueue.enqueue( "bar", 100 )
      myPQueue.enqueue( "foobar", 150 )
      expect( () => myPQueue.dequeue() ).to.alter( () => myPQueue.length(), { from: 3, to: 2 } )
      expect( myPQueue.dequeue() ).to.eql( { element: "bar", priority: 100 } )
    })
    it( 'should return null if Priority Queue is empty', () => {
      expect( myPQueue.dequeue() ).to.be.null
    })
  })

  context( '#back()', () => {
    it( 'should return the lowest priority element in the Priority Queue', () => {
      myPQueue.enqueue( "foo", 100 )
      myPQueue.enqueue( "bar", 100 )
      myPQueue.enqueue( "foobar", 150 )
      expect( myPQueue.back() ).to.eql( { element: "foobar", priority: 150 })
    })
    it( 'should return null if the Priority Queue is empty', () => {
      expect( myPQueue.back() ).to.be.null
    })
  })

  context( '#isEmpty()', () => {
    it( 'should return true if Priority Queue is empty', () => {
      expect( myPQueue.isEmpty() ).to.be.true
    })
    it( 'should return false if Priority Queue is not empty', () => {
      myPQueue.enqueue( "foo", 100 )
      expect( myPQueue.isEmpty() ).to.be.false
    })
  })
  context( '#length()', () => {
    it( 'should return the number of elements in the Priority Queue', () => {
      expect( () => myPQueue.enqueue( "foo", 100 ) ).to.alter( () => myPQueue.length(), { from: 0, to: 1 } )
    })
    it( 'should return 0 if the Priority Queue is empty', () => {
      expect( myPQueue.length() ).to.eql( 0 )
    })
  })
})
