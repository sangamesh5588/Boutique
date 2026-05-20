import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, ChevronDown } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { PRODUCTS } from '@/data/products'
import { useStore } from '@/store/useStore'
import { ScrollReveal } from '@/components/ScrollReveal'
import 'swiper/css'
import 'swiper/css/pagination'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = PRODUCTS.find((p) => p.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '')
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const infoRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect()
        setShowStickyBar(rect.bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-aura-ivory flex items-center justify-center">
        <p className="font-body text-aura-gray">Product not found</p>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const isMobile = window.innerWidth < 768

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const rect = mainImageRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const accordions = [
    { key: 'fabric', title: 'The Fabric', content: product.fabric },
    { key: 'fit', title: 'The Fit', content: product.fit },
    { key: 'details', title: 'The Details', content: product.details },
  ]

  return (
    <div className="min-h-screen bg-aura-ivory">
      {/* Back Button */}
      <div className="pt-24 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.1em] text-aura-gray hover:text-aura-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="w-full md:w-[55%] md:sticky md:top-24 md:self-start">
            {isMobile ? (
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="w-full aspect-[3/4]"
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover rounded-sm" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex gap-3">
                {/* Thumbnails */}
                <div className="flex flex-col gap-2 w-20 flex-shrink-0">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-[3/4] rounded-sm overflow-hidden transition-all ${
                        selectedImage === i ? 'ring-2 ring-aura-gold' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image with Zoom */}
                <div
                  ref={mainImageRef}
                  className="flex-1 aspect-[3/4] rounded-sm overflow-hidden cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      transformOrigin: `${mousePos.x * 100}% ${mousePos.y * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div ref={infoRef} className="w-full md:w-[45%]">
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-aura-gold mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-aura-black">
              {product.name}
            </h1>
            <p className="font-body text-xl font-light text-aura-black mt-2">
              {product.currency}{product.price.toLocaleString()}
            </p>

            <p className="font-body text-[15px] text-aura-gray leading-relaxed max-w-md mt-6">
              {product.description}
            </p>

            <div className="w-full h-px bg-aura-border my-8" />

            {/* Size Selector */}
            <div className="mb-6">
              <p className="font-body text-xs uppercase tracking-[0.15em] text-aura-gray mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border text-sm font-body transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-aura-black text-white border-aura-black'
                        : 'border-aura-border text-aura-black hover:border-aura-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mb-6">
              <p className="font-body text-xs uppercase tracking-[0.15em] text-aura-gray mb-3">
                Select Color
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color.name ? 'border-aura-gold scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
              <p className="font-body text-sm text-aura-gray mt-2">{selectedColor}</p>
            </div>

            {/* Made to Order Badge */}
            <div className="inline-flex items-center gap-2 bg-aura-gold/10 text-aura-gold text-xs px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-aura-gold" />
              Made to Order — Ships in {product.shipTime}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                to="/book-fitting"
                className="w-full bg-aura-black text-white text-center font-body text-sm uppercase tracking-widest py-4 rounded-full hover:bg-aura-black/90 transition-colors duration-300"
              >
                Book Private Fitting
              </Link>
              <button
                onClick={() => {
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
                className={`w-full border text-center font-body text-sm py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                  inWishlist
                    ? 'border-aura-gold text-aura-gold'
                    : 'border-aura-border text-aura-black hover:border-aura-black'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-aura-gold' : ''}`} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Craftsmanship Accordion */}
            <div className="mt-10">
              {accordions.map((item) => (
                <div key={item.key} className="border-b border-aura-border">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)}
                    className="w-full flex items-center justify-between py-4 font-body text-sm text-aura-black"
                  >
                    {item.title}
                    <motion.div
                      animate={{ rotate: openAccordion === item.key ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openAccordion === item.key ? 'auto' : 0,
                      opacity: openAccordion === item.key ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm text-aura-gray leading-relaxed pb-4">
                      {item.content}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-aura-border">
        <ScrollReveal>
          <h2 className="font-display text-2xl md:text-3xl font-light text-aura-black mb-8">
            You May Also Love
          </h2>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible snap-x snap-mandatory">
          {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="flex-shrink-0 w-64 md:w-auto snap-start"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden mb-3">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-display text-base text-aura-black">{p.name}</p>
              <p className="font-body text-sm text-aura-gold">{p.currency}{p.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      {isMobile && showStickyBar && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-aura-ivory border-t border-aura-border px-6 py-4 z-40 flex items-center justify-between"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-display text-lg text-aura-black">{product.currency}{product.price.toLocaleString()}</p>
          </div>
          <Link
            to="/book-fitting"
            className="bg-aura-black text-white font-body text-sm uppercase tracking-widest px-6 py-3 rounded-full"
          >
            Book Fitting
          </Link>
        </motion.div>
      )}
    </div>
  )
}
