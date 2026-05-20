import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'
import { useStore } from '@/store/useStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WishlistDrawer } from '@/components/WishlistDrawer'
import { Loader } from '@/components/Loader'
import { PageTransition } from '@/components/PageTransition'
import { SearchOverlay } from '@/components/SearchOverlay'
import { HomePage } from '@/pages/HomePage'
import { CollectionsPage } from '@/pages/CollectionsPage'
import { ProductPage } from '@/pages/ProductPage'
import { LookbookPage } from '@/pages/LookbookPage'
import { AtelierPage } from '@/pages/AtelierPage'
import { BookingPage } from '@/pages/BookingPage'

export default function App() {
  const location = useLocation()
  const { loaderComplete } = useStore()
  useLenis()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative">
      <Loader />

      {loaderComplete && (
        <>
          <Navbar />
          <WishlistDrawer />
          <SearchOverlay />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/collections" element={<PageTransition><CollectionsPage /></PageTransition>} />
              <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
              <Route path="/lookbook" element={<PageTransition><LookbookPage /></PageTransition>} />
              <Route path="/atelier" element={<PageTransition><AtelierPage /></PageTransition>} />
              <Route path="/book-fitting" element={<PageTransition><BookingPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </div>
  )
}
