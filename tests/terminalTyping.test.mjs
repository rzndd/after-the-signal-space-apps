import test from 'node:test'
import assert from 'node:assert/strict'
import { createTypingSession, typingDelay } from '../src/lib/terminalTyping.ts'

test('terminal cadence gives punctuation a short pause rather than scrambling words', () => {
  assert.equal(typingDelay('a'),14)
  assert.ok(typingDelay(',')>typingDelay('a'))
  assert.ok(typingDelay('.')>typingDelay(','))
  assert.ok(typingDelay('a',5)<typingDelay('a'))
})
test('typing completes once and respects Unicode code points', t => {
  t.mock.timers.enable({apis:['setTimeout']})
  const frames=[];let completed=0
  createTypingSession({text:'A🚀B',onUpdate:length=>frames.push(length),onComplete:()=>completed++})
  t.mock.timers.tick(0)
  assert.deepEqual(frames,[1])
  t.mock.timers.tick(14);t.mock.timers.tick(14)
  assert.deepEqual(frames,[1,2,3])
  assert.equal(completed,1)
  t.mock.timers.tick(1000)
  assert.equal(completed,1)
})
test('reveal finishes the current line once without scheduling another letter', t => {
  t.mock.timers.enable({apis:['setTimeout']})
  const frames=[];let completed=0
  const session=createTypingSession({text:'A long transmission.',onUpdate:length=>frames.push(length),onComplete:()=>completed++})
  t.mock.timers.tick(0)
  session.reveal();session.reveal()
  t.mock.timers.tick(10000)
  assert.deepEqual(frames,[1,20])
  assert.equal(completed,1)
})
test('unmount cancellation cannot update a later scene or advance its story', t => {
  t.mock.timers.enable({apis:['setTimeout']})
  let updates=0,completed=0
  const session=createTypingSession({text:'An interrupted record.',onUpdate:()=>updates++,onComplete:()=>completed++})
  session.stop()
  t.mock.timers.tick(10000)
  session.reveal()
  assert.equal(updates,0)
  assert.equal(completed,0)
})
test('a suspended transmission can resume from its last completed character', t => {
  t.mock.timers.enable({apis:['setTimeout']})
  const frames=[];let completed=0
  const first=createTypingSession({text:'ABCD',onUpdate:length=>frames.push(length),onComplete:()=>completed++})
  t.mock.timers.tick(0);first.stop()
  const resumed=createTypingSession({text:'ABCD',from:frames.at(-1),onUpdate:length=>frames.push(length),onComplete:()=>completed++})
  t.mock.timers.tick(0)
  assert.deepEqual(frames,[1,2])
  resumed.reveal()
  assert.equal(completed,1)
  assert.equal(frames.at(-1),4)
})
test('an empty transmission settles without an extra character', t => {
  t.mock.timers.enable({apis:['setTimeout']})
  let updates=0,completed=0
  createTypingSession({text:'',onUpdate:()=>updates++,onComplete:()=>completed++})
  t.mock.timers.tick(0)
  assert.equal(completed,1)
  assert.equal(updates,0)
})
