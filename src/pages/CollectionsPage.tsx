import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import { useStore } from '@/store/useStore'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { FilterCategory } from '@/types'

export function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore()

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-aura-ivory pt-24 md:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-light text-aura-black">
            The Collection
          </h1>
          <div className="w-16 h-px bg-aura-gold mx-auto mt-4" />
        </ScrollReveal>

        {/* Desktop Filter */}
        <div className="hidden md:flex justify-center gap-8 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat as FilterCategory)}
              className={`font-body text-sm pb-2 transition-all duration-300 ${
                activeFilter === cat
                  ? 'text-aura-black border-b-2 border-aura-gold'
                  : 'text-aura-gray hover:text-aura-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filter Trigger */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-2 font-body text-sm text-aura-gray border border-aura-border rounded-full px-4 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilter}
          </button>
        </div>

        {/* Mobile Filter Bottom Sheet */}
        <AnimatePresence>
          {showMobileFilter && (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-aura-overlay backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilter(false)}
              />
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-50 bg-aura-ivory rounded-t-2xl p-6 md:hidden"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-xl font-light">Filter by Style</h3>
                  <button onClick={() => setShowMobileFilter(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveFilter(cat as FilterCategory)
                        setShowMobileFilter(false)
                      }}
                      className={`font-body text-left py-3 px-4 rounded-lg transition-colors ${
                        activeFilter === cat
                          ? 'bg-aura-gold/10 text-aura-gold'
                          : 'text-aura-gray hover:bg-aura-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => {
              const inWishlist = isInWishlist(product.id)
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-sm">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-aura-ivory/0 group-hover:bg-aura-ivory/50 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm hidden md:flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                      <p className="font-display text-lg text-aura-black">{product.name}</p>
                      <p className="font-body text-sm text-aura-gold mt-1">
                        {product.currency}{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (inWishlist) {
                          removeFromWishlist(product.id)
                        } else {
                          addToWishlist({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            category: product.category,
                          })
                        }
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          inWishlist ? 'fill-aura-gold text-aura-gold' : 'text-aura-gray'
                        }`}
                      />
                    </button>
                  </Link>

                  <div className="md:hidden mt-3">
                    <p className="font-display text-base text-aura-black">{product.name}</p>
                    <p className="font-body text-sm text-aura-gold mt-0.5">
                      {product.currency}{product.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
