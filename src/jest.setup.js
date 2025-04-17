import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import { server } from './__mocks__/server'
import { cleanup } from '@testing-library/react'
import { TextEncoder, TextDecoder } from 'text-encoding';
Object.assign(global, { TextDecoder, TextEncoder });

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    cleanup()
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})
