import { resolve } from 'path'
import { builtinModules } from 'module'
import type { Plugin } from 'rollup'
import inject from '@rollup/plugin-inject'
import alias from '@rollup/plugin-alias'
import type { Environment } from './types'

const pluginDir = __dirname

export default function rollupPluginUnenv (env: Environment) {
  const injectPlugin = inject({
    modules: env.inject
  })

  const aliasPlugin = alias({
    entries: env.alias
  })

  // process.env
  // TODO: handle env.polyfill

  // TODO: handle env.external

  const resolvePlugin: Plugin = {
    name: 'unjs-resolve',
    resolveId (id) {
      if (builtinModules.includes(id) || denoExtras.includes(id)) {
        const denoId = resolveDeno(id)
        if (denoId) {
          return {
            id: denoId,
            moduleSideEffects: false,
            external: denoId.startsWith('http')
          }
        }
        return {
          id: resolve(pluginDir, 'deno/empty.js')
        }
      }
    }
  }

  return [
    injectPlugin /* adds transform hook */,
    aliasPlugin,
    resolvePlugin
  ] as Plugin[]
}

