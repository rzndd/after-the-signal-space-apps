import test from 'node:test'
import assert from 'node:assert/strict'
import { restoreAccessOnEntry, restoreTerminalAccess, persistEnding, readRevoked, ENDING_KEY } from '../src/lib/ending.ts'
import { PROLOGUE_KEY } from '../src/lib/prologue.ts'

function storageFixture(run) {
  const previous = ['localStorage','sessionStorage'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)])
  const local = new Map(), session = new Map()
  for (const [key,map] of [['localStorage',local],['sessionStorage',session]]) Object.defineProperty(globalThis,key,{configurable:true,value:{
    getItem:key=>map.get(key)??null, setItem:(key,value)=>map.set(key,value), removeItem:key=>map.delete(key),
  }})
  try { run(local,session) } finally {
    for (const [key,descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis,key,descriptor)
      else delete globalThis[key]
    }
  }
}
test('a reload recovers legacy dead endings without deleting recovered records', () => storageFixture((local,session)=>{
  local.set(ENDING_KEY,'dead')
  local.set('sol404-completion-v1','preserved completion')
  local.set('sol404-journey-v1','preserved journey')
  session.set(PROLOGUE_KEY,'1000')
  restoreAccessOnEntry()
  assert.equal(readRevoked(),false)
  assert.equal(session.has(PROLOGUE_KEY),false)
  assert.equal(local.get('sol404-completion-v1'),'preserved completion')
  assert.equal(local.get('sol404-journey-v1'),'preserved journey')
  restoreAccessOnEntry()
  assert.equal(readRevoked(),false)
}))
test('choosing N remains remembered on reload and does not reset an active prologue', () => storageFixture((local,session)=>{
  persistEnding('dead')
  persistEnding('remembered')
  session.set(PROLOGUE_KEY,'2000')
  restoreAccessOnEntry()
  assert.equal(readRevoked(),false)
  assert.equal(local.get(ENDING_KEY),'remembered')
  assert.equal(session.get(PROLOGUE_KEY),'2000')
}))
test('the visible return action releases a fictional ending while retaining progress', () => storageFixture((local,session)=>{
  local.set(ENDING_KEY,'dead')
  local.set('sol404-journey-v1','saved')
  session.set(PROLOGUE_KEY,'1000')
  restoreTerminalAccess()
  assert.equal(readRevoked(),false)
  assert.equal(session.has(PROLOGUE_KEY),false)
  assert.equal(local.get('sol404-journey-v1'),'saved')
}))
