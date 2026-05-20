import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BlurIn } from '@/components/BlurIn'
import { SplitText } from '@/components/SplitText'

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{ y }}
        >
          <img
            src="/images/dress1.jpg"
            alt="Bridal editorial"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-aura-overlay/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end z-10">
          <div className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl w-full mx-auto">
            <BlurIn delay={0.2} duration={0.6}>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6">
                Spring / Summer 2026 Collection
              </p>
            </BlurIn>

            <h1 className="font-display text-white font-light leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
              <span className="block">
                <SplitText text="Where Elegance" delay={0.3} stagger={0.06} duration={0.6} />
              </span>
              <span className="block">
                <SplitText text="Becomes Eternal" delay={0.5} stagger={0.06} duration={0.6} />
              </span>
            </h1>

            <BlurIn delay={0.8} duration={0.6}>
              <p className="font-body text-base font-light text-white/80 max-w-md mt-6 leading-relaxed">
                Handcrafted couture for the most important day of your life.
              </p>
            </BlurIn>

            <BlurIn delay={1.0} duration={0.6}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/collections"
                  className="inline-flex items-center px-8 py-3.5 rounded-full border border-white text-white font-body text-sm transition-all duration-400 hover:bg-white hover:text-aura-black"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/book-fitting"
                  className="inline-flex items-center px-8 py-3.5 rounded-full bg-aura-gold text-white font-body text-sm transition-all duration-400 hover:bg-aura-black"
                >
                  Book Private Fitting
                </Link>
              </div>
            </BlurIn>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            className="w-px h-8 bg-white/40 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Preview */}
      <section className="py-24 md:py-32 bg-aura-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-aura-gold mb-4">The Collection</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-aura-black">
              Six Gowns. Infinite Dreams.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'The Isabella', img: '/images/dress1.jpg' },
              { name: 'The Celeste', img: '/images/dress2.jpg' },
              { name: 'The Aurelia', img: '/images/dress3.jpg' },
              { name: 'The Seraphine', img: '/images/dress4.jpg' },
              { name: 'The Evangeline', img: '/images/dress5.jpg' },
              { name: 'The Vivienne', img: '/images/dress6.jpg' },
            ].map((gown, i) => (
              <motion.div
                key={gown.name}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={gown.img}
                  alt={gown.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-aura-ivory/0 group-hover:bg-aura-ivory/40 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm flex items-end justify-center pb-6">
                  <p className="font-display text-lg text-aura-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {gown.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center font-body text-sm uppercase tracking-widest text-aura-black hover:text-aura-gold transition-colors duration-300"
            >
              View All Gowns →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
