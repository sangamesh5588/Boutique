import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, Menu, X } from 'lucide-react'
import { useStore } from '@/store/useStore'

const NAV_LINKS = [
  { label: 'Collections', path: '/collections' },
  { label: 'Atelier', path: '/atelier' },
  { label: 'Lookbook', path: '/lookbook' },
  { label: 'Journal', path: '/lookbook' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { wishlist, toggleWishlist, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, toggleSearch } = useStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  const isHome = location.pathname === '/'
  const textColor = isHome && !scrolled ? 'text-white' : 'text-aura-black'
  const bgClass = scrolled ? 'bg-aura-ivory/90 backdrop-blur-md shadow-sm' : 'bg-transparent'

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${bgClass}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className={`font-display text-xl md:text-2xl font-light tracking-wide ${textColor} transition-colors duration-500`}>
            AURA
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`font-body text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:text-aura-gold ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`p-2 transition-colors duration-300 hover:text-aura-gold ${textColor}`}
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={`p-2 transition-colors duration-300 hover:text-aura-gold relative ${textColor}`}
              onClick={toggleWishlist}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-aura-gold text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className={`p-2 md:hidden transition-colors duration-300 ${textColor}`}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu />
        )}
      </AnimatePresence>
    </>
  )
}

function MobileMenu() {
  const { closeMobileMenu } = useStore()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const links = [
    { label: 'Collections', path: '/collections' },
    { label: 'Atelier', path: '/atelier' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'Journal', path: '/lookbook' },
    { label: 'Book Fitting', path: '/book-fitting' },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-aura-ivory flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.4 }}
    >
      <div className="flex justify-between items-center px-6 h-16">
        <span className="font-display text-xl font-light">AURA</span>
        <button onClick={closeMobileMenu} className="p-2" aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0.2 : 0.6,
              delay: reduced ? 0 : i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              to={link.path}
              onClick={closeMobileMenu}
              className="block font-display text-4xl font-light py-3 hover:text-aura-gold transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="px-6 pb-8">
        <div className="flex gap-6 text-sm text-aura-gray">
          <span>Instagram</span>
          <span>Pinterest</span>
        </div>
        <p className="text-sm text-aura-gray mt-2">hello@aurabridal.com</p>
      </div>
    </motion.div>
  )
}
