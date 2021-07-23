import { stub, spy } from 'sinon'

// TODO remove mock, use lib in tests

export const autorun = spy()
export const reaction = spy()
export const action = { name: 'action' }
export const computed = { name: 'computed' }
export const makeObservable = stub()
export const observable = { name: 'observable' }
