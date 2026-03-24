import Runtime from 'pear-electron'
import Bridge from 'pear-bridge'
import startUpdater from './src/updater'

const bridge = new Bridge({ waypoint: '/index.html' })
await bridge.ready()

const runtime = new Runtime()
const pipe = await runtime.start({ bridge })
pipe.on('close', () => Pear.exit())
await startUpdater()

Pear.teardown(() => pipe.destroy())
