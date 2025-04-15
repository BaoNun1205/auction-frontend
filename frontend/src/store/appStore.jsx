import { isValid } from 'date-fns'
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

  // Trạng thái mở chat
  isChatOpen: false,
  setChatOpen: (isChatOpen) => set(() => ({ isChatOpen })),

  // Lưu vendorId đang chat
  chatVendorId: null,
  setChatVendorId: (chatVendorId) => set(() => ({ chatVendorId })),

  conversationCount: 0, // Khởi tạo conversationCount
  setConversationCount: (conversationCount) => set(() => ({ conversationCount })),

  // Lưu thông báo của người dùng
  notifications: [], // danh sách notification
  setNotifications: (notifications) => set(() => ({ notifications })),

  addOrUpdateNotification: (notification) =>
    set((state) => {
      const existingIndex = state.notifications.findIndex((n) => n.id === notification.id);
      if (existingIndex !== -1) {
        const updated = [...state.notifications];
        updated[existingIndex] = notification;
        return { notifications: updated };
      }
      return { notifications: [notification, ...state.notifications] };
    }),

  auth: {
    token: '',
    role: '',
    isAuth: false,
    isValid: false,
    user: {
      id: '',
      username: '',
    }
  },
  setAuth: (auth) => set((state) => ({ auth })),
})

appStore = persist(appStore, { name: 'appStore' })
export const useAppStore = create(appStore)