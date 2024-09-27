import create from 'zustand'
import { persist } from 'zustand/middleware'

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen })),
  categoryOpen: false,
  setCategoryOpen: (categoryOpen) => set((state) => ({ categoryOpen })),
  assetOpen: false,
  setAssetOpen: (assetOpen) => set((state) => ({ assetOpen })),
  sessionOpen: false,
  setSessionOpen: (sessionOpen) => set((state) => ({ sessionOpen })),
  token: '',
  setToken: (token) => set((state) => ({ token }))
})

appStore = persist(appStore, { name: 'appStore' })
export const useAppStore = create(appStore)