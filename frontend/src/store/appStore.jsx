import create from 'zustand'
import { persist } from 'zustand/middleware'

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen })),
  productOpen: false,
  setProductOpen: (productOpen) => set((state) => ({ productOpen })),
  sessionOpen: false,
  setSessionOpen: (sessionOpen) => set((state) => ({ sessionOpen }))
})

appStore = persist(appStore, { name: 'appStore' })
export const useAppStore = create(appStore)