import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import fetch from 'cross-fetch'

import Bettercap from '../index.js'

import mockSession from './mock/session.json'
import mockLan from './mock/lan.json'
import mockWifi from './mock/wifi.json'
import mockBle from './mock/ble.json'
import mockHid from './mock/hid.json'
import mockEnv from './mock/env.json'
import mockEvents from './mock/events.json'
import mockGateway from './mock/gateway.json'
import mockInterface from './mock/interface.json'
import mockOptions from './mock/options.json'
import mockPackets from './mock/packets.json'
import mockCommand from './mock/command.json'

globalThis.fetch = fetch
const { NODE_ENV = 'test' } = process.env

const bettercap = new Bettercap()

const server = setupServer(
  rest.get('http://localhost:8081/api/session', (req, res, ctx) => {
    return res(
      ctx.json(mockSession)
    )
  }),

  rest.get('http://localhost:8081/api/session/lan', (req, res, ctx) => {
    return res(
      ctx.json(mockLan)
    )
  }),

  rest.get('http://localhost:8081/api/session/wifi', (req, res, ctx) => {
    return res(
      ctx.json(mockWifi)
    )
  }),

  rest.get('http://localhost:8081/api/session/ble', (req, res, ctx) => {
    return res(
      ctx.json(mockBle)
    )
  }),

  rest.get('http://localhost:8081/api/session/hid', (req, res, ctx) => {
    return res(
      ctx.json(mockHid)
    )
  }),

  rest.get('http://localhost:8081/api/session/env', (req, res, ctx) => {
    return res(
      ctx.json(mockEnv)
    )
  }),

  rest.get('http://localhost:8081/api/events', (req, res, ctx) => {
    return res(
      ctx.json(mockEvents)
    )
  }),

  rest.get('http://localhost:8081/api/session/gateway', (req, res, ctx) => {
    return res(
      ctx.json(mockGateway)
    )
  }),

  rest.get('http://localhost:8081/api/session/interface', (req, res, ctx) => {
    return res(
      ctx.json(mockInterface)
    )
  }),

  rest.get('http://localhost:8081/api/session/options', (req, res, ctx) => {
    return res(
      ctx.json(mockOptions)
    )
  }),

  rest.get('http://localhost:8081/api/session/packets', (req, res, ctx) => {
    return res(
      ctx.json(mockPackets)
    )
  }),

  rest.get('http://localhost:8081/api/session/started-at', (req, res, ctx) => {
    return res(
      ctx.text('2018-02-23T06:28:43.650628576+01:00')
    )
  }),

  rest.post('http://localhost:8081/api/session', (req, res, ctx) => {
    return res(
      ctx.json(mockCommand)
    )
  }),

  rest.delete('http://localhost:8081/api/events', (req, res, ctx) => {
    return res(
      ctx.text('OK')
    )
  })
)

if (NODE_ENV === 'test') {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
}

test('session()', async () => {
  const r = await bettercap.session()
  expect(r.interface.ipv4).toBe('192.168.1.17')
})

test('lan()', async () => {
  const r = await bettercap.lan()
  expect(r.hosts.length).toBe(3)
})

test('wifi()', async () => {
  const r = await bettercap.wifi()
  expect(r.aps.length).toBe(4)
})

test('ble()', async () => {
  const r = await bettercap.ble()
  expect(r.devices.length).toBe(2)
})

test('hid()', async () => {
  const r = await bettercap.hid()
  expect(r.devices.length).toBe(1)
})

test('env()', async () => {
  const r = await bettercap.env()
  expect(r.data['api.rest.password']).toBe('bcap')
})

test('events()', async () => {
  const r = await bettercap.events()
  expect(r.length).toBe(2)
})

test('gateway()', async () => {
  const r = await bettercap.gateway()
  expect(r.ipv4).toBe('192.168.1.1')
})

test('interface()', async () => {
  const r = await bettercap.interface()
  expect(r.ipv4).toBe('192.168.1.17')
})

test('options()', async () => {
  const r = await bettercap.options()
  expect(r.Caplet).toBe('../caplets/netmon.cap')
})

test('packets()', async () => {
  const r = await bettercap.packets()
  expect(Object.keys(r.Traffic).length).toBe(5)
})

test('startedAt()', async () => {
  const r = await bettercap.startedAt()
  expect(r.getTime()).toBe(1519363723650)
})
