import { NodeBuiltinModules } from '../utils'
import type { Preset } from '../types'

// https://deno.land/std/node
const denoNodeStd = [
  'assert',
  'buffer',
  'cli',
  'crypto',
  'events',
  'fs',
  'module',
  'os',
  'path',
  'process',
  'querystring',
  'stream',
  'timers',
  'tty',
  'url',
  'util'
]

// See ./deno/
const denoExtras = [
  'child_process',
  'readline',
  'global',
  'node-fetch',
  'chalk'
]

export const deno = {
  alias: {
    ...Object.fromEntries(denoNodeStd.map(id => id => [id, `https://deno.land/std/node/${id}.ts`])),
    ...Object.fromEntries(denoExtras.map(id => id => [id, resolve(pluginDir, `extras/${id}.ts`)]))
  },
  inject: {
    process: 'process',
    global: 'global',
    Buffer: ['buffer', 'Buffer'],
    setTimeout: ['timers', 'setTimeout'],
    clearTimeout: ['timers', 'clearTimeout'],
    setInterval: ['timers', 'setInterval'],
    clearInterval: ['timers', 'clearInterval'],
    setImmediate: ['timers', 'setImmediate'],
    clearImmediate: ['timers', 'clearImmediate']
  }
} as Preset
