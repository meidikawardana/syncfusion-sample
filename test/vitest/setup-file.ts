// This file will be run before each test file
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../mocks/server'
import { http } from 'src/boot/axios'
import { createHttp } from '@konnec/vue-eloquent'

beforeAll(() => {
  // console.log('Establishing API mock')
  createHttp({ httpClient: http, apiPrefix: 'api/v1' })
  server.listen({ onUnhandledRequest: 'error' })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
