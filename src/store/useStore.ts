import { create } from 'zustand'
import { WishlistItem } from '@/types'

interface AppState {
  wishlist: WishlistItem[]
  isWishlistOpen: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  loaderComplete: boolean

  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleWishlist: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  toggleSearch: () => void
  closeSearch: () => void
  setLoaderComplete: (complete: boolean) => void
}

export const useStore = create<AppState>((set, get) => ({
  wishlist: [],
  isWishlistOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  loaderComplete: false,

  addToWishlist: (item) => {
    const { wishlist } = get()
    if (!wishlist.find((w) => w.id === item.id)) {
      set({ wishlist: [...wishlist, item] })
    }
  },

  removeFromWishlist: (id) => {
    set({ wishlist: get().wishlist.filter((w) => w.id !== id) })
  },

  isInWishlist: (id) => get().wishlist.some((w) => w.id === id),

  toggleWishlist: () => set({ isWishlistOpen: !get().isWishlistOpen }),

  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),

  closeSearch: () => set({ isSearchOpen: false }),

  setLoaderComplete: (complete) => set({ loaderComplete: complete }),
}))
