import { is } from 'date-fns/locale'
import create from 'zustand'
import { persist } from 'zustand/middleware'

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen })),

  categoryOpen: false,
  setCategoryOpen: (categoryOpen) => set((state) => ({ categoryOpen })),

  assetOpen: false,
  setAssetOpen: (assetOpen) => set((state) => ({ assetOpen })),

  requirementOpen: false,
  setRequirementOpen: (requirementOpen) => set((state) => ({ requirementOpen })),

  sessionOpen: false,
  setSessionOpen: (sessionOpen) => set((state) => ({ sessionOpen })),

  auth: {
    token: '',
    role: '',
    isAuth: false,
    user: {
      id: '',
      username: '',
    }
  },
  setAuth: (auth) => set((state) => ({ auth })),
})

appStore = persist(appStore, { name: 'appStore' })
export const useAppStore = create(appStore)