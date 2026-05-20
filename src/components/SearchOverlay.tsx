import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { PRODUCTS } from '@/data/products'

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim().length > 0
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      })
    : []

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isSearchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-aura-ivory/95 backdrop-blur-md flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20 border-b border-aura-border">
            <span className="font-display text-xl font-light text-aura-black">Search</span>
            <button
              onClick={closeSearch}
              className="p-2 text-aura-gray hover:text-aura-black transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Input */}
          <div className="px-6 md:px-12 py-8 md:py-12 max-w-3xl w-full mx-auto">
            <div className="relative flex items-center border-b-2 border-aura-black pb-3">
              <Search className="w-5 h-5 text-aura-gray flex-shrink-0 mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gowns, styles…"
                className="flex-1 bg-transparent font-display text-2xl md:text-3xl font-light text-aura-black placeholder:text-aura-gray/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="ml-3 text-aura-gray hover:text-aura-black transition-colors"
                  aria-label="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="mt-8">
              {query.trim().length > 0 && results.length === 0 && (
                <p className="font-body text-sm text-aura-gray">
                  No gowns found for &ldquo;{query}&rdquo;
                </p>
              )}

              {results.length > 0 && (
                <>
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-aura-gray mb-6">
                    {results.length} {results.length === 1 ? 'result' : 'results'}
                  </p>
                  <div className="flex flex-col gap-4">
                    {results.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                      >
                        <Link
                          to={`/product/${product.id}`}
                          onClick={closeSearch}
                          className="flex items-center gap-5 group"
                        >
                          <div className="w-16 h-20 rounded-sm overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-display text-xl font-light text-aura-black group-hover:text-aura-gold transition-colors duration-300">
                              {product.name}
                            </p>
                            <p className="font-body text-xs uppercase tracking-[0.1em] text-aura-gray mt-0.5">
                              {product.category}
                            </p>
                            <p className="font-body text-sm text-aura-gold mt-1">
                              {product.currency}{product.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {query.trim().length === 0 && (
                <div className="flex flex-wrap gap-3">
                  {['Ball Gown', 'Mermaid', 'A-Line', 'Boho', 'Sheath'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 rounded-full border border-aura-border font-body text-sm text-aura-gray hover:border-aura-gold hover:text-aura-gold transition-colors duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
