export default class Bettercap {
  constructor (address = 'http://localhost:8081') {
    this.address = address
  }

  // Get state of the current session
  session () {
    return fetch(`${this.address}/api/session`).then(r => r.json())
  }

  // Get a the lan devices in the current session
  lan () {
    return fetch(`${this.address}/api/session/lan`).then(r => r.json())
  }

  // Get the wifi devices (clients and access points) in the current session
  wifi () {
    return fetch(`${this.address}/api/session/wifi`).then(r => r.json())
  }

  // Get the BLE devices in the current session
  ble () {
    return fetch(`${this.address}/api/session/ble`).then(r => r.json())
  }

  // Get the HID devices in the current session
  hid () {
    return fetch(`${this.address}/api/session/hid`).then(r => r.json())
  }

  // Get the environment variables in the current session
  env () {
    return fetch(`${this.address}/api/session/env`).then(r => r.json())
  }

  // Return a list of events (the optional n GET parameter will limit the number)
  events (n) {
    if (n) {
      return fetch(`${this.address}/api/events`).then(r => r.json())
    } else {
      return fetch(`${this.address}/api/events?n=${n}`).then(r => r.json())
    }
  }

  // Get the interface gateway of the current session
  gateway () {
    return fetch(`${this.address}/api/session/gateway`).then(r => r.json())
  }

  // Get the main interface (wifi/lan) of the current session
  interface () {
    return fetch(`${this.address}/api/session/interface`).then(r => r.json())
  }

  // Get the options set for the current session
  options () {
    return fetch(`${this.address}/api/session/options`).then(r => r.json())
  }

  // Get a the packet traffic for the current session
  packets () {
    return fetch(`${this.address}/api/session/packets`).then(r => r.json())
  }

  // Get the time the current session was started
  async startedAt () {
    return new Date(await fetch(`${this.address}/api/session/started-at`).then(r => r.text()))
  }

  // Post a command to the interactive session
  command (cmd) {
    return fetch(`${this.address}/api/session`, { method: 'POST', body: JSON.stringify({ cmd }) }).then(r => r.json())
  }

  // Clear the events buffer
  clearEvents () {
    return fetch(`${this.address}/api/events`, { method: 'DELETE' }).then(r => r.json())
  }
}
