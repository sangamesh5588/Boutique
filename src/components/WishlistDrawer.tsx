import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '@/store/useStore'

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, toggleWishlist, removeFromWishlist } = useStore()
  const isMobile = window.innerWidth < 768

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-aura-overlay backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
          />

          <motion.div
            className={`fixed z-50 bg-aura-ivory shadow-2xl ${
              isMobile
                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl'
                : 'top-0 right-0 h-full w-full max-w-md'
            }`}
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-aura-border">
                <h2 className="font-display text-2xl font-light">Your Wishlist</h2>
                <button onClick={toggleWishlist} className="p-2" aria-label="Close wishlist">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="font-body text-aura-gray mb-4">Your wishlist is empty</p>
                    <Link
                      to="/collections"
                      onClick={toggleWishlist}
                      className="font-body text-sm text-aura-gold hover:text-aura-black transition-colors"
                    >
                      Explore Collection →
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {wishlist.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 items-center"
                      >
                        <div className="w-20 aspect-[3/4] rounded-sm overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium truncate">{item.name}</p>
                          <p className="font-body text-xs text-aura-gray">{item.category}</p>
                          <p className="font-body text-sm text-aura-gold mt-1">${item.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 text-aura-gray hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="px-6 py-5 border-t border-aura-border">
                  <Link
                    to="/book-fitting"
                    onClick={toggleWishlist}
                    className="block w-full bg-aura-gold text-white text-center font-body text-sm uppercase tracking-widest py-4 rounded-full hover:bg-aura-black transition-colors duration-300"
                  >
                    Book Fitting for Selected
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
