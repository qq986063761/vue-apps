import type { Pinia, StoreDefinition } from 'pinia'
import type { StoreModuleConfig } from '@/types/remotes'

const registeredSubAppStores = new Set<string>()
const subAppStoreDefinitions = new Map<string, StoreDefinition>()

let activePinia: Pinia | undefined

export function setupStoreRegistry(pinia: Pinia): void {
  activePinia = pinia
}

export function registerSubAppStores(configs: StoreModuleConfig[]): void {
  configs.forEach(({ namespace, useStore }) => {
    if (registeredSubAppStores.has(namespace)) {
      console.log(`[main] sub app store already registered: ${namespace}`)
      return
    }

    subAppStoreDefinitions.set(namespace, useStore)
    if (activePinia) {
      useStore(activePinia)
    }
    registeredSubAppStores.add(namespace)
    console.log(`[main] sub app store registered: ${namespace}`)
  })
}

export function getSubAppStore(name: string): StoreDefinition | undefined {
  return subAppStoreDefinitions.get(name)
}
