import { expect } from '@open-wc/testing'
import { spy, stub } from 'sinon'

describe('start', () => {
  it('should setup p5', async () => {
    await import('./start')
  })
})
