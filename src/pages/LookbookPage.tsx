import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/ScrollReveal'

const EDITORIAL_IMAGES = [
  { src: '/images/dress2.jpg', alt: 'Editorial hero' },
  { src: '/images/dress1.jpg', alt: 'Portrait detail' },
  { src: '/images/dress6.jpg', alt: 'Back view' },
  { src: '/images/dress3.jpg', alt: 'Fabric close-up' },
  { src: '/images/dress4.jpg', alt: 'Full length' },
  { src: '/images/dress5.jpg', alt: 'Boho editorial' },
]

export function LookbookPage() {
  const stripRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div className="min-h-screen bg-aura-ivory pt-24 md:pt-32">
      {/* Section 1: Full-width Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={EDITORIAL_IMAGES[0].src}
          alt={EDITORIAL_IMAGES[0].alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-aura-overlay/30 flex items-center justify-center">
          <motion.h1
            className="font-display text-white font-light text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            The Art of the Gown
          </motion.h1>
        </div>
      </section>

      {/* Section 2: Asymmetric 2-column */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <ScrollReveal className="w-full md:w-[60%]">
            <div className="aspect-[3/4] rounded-sm overflow-hidden">
              <img
                src={EDITORIAL_IMAGES[1].src}
                alt={EDITORIAL_IMAGES[1].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="w-full md:w-[40%]">
            <ScrollReveal delay={0.2}>
              <div className="aspect-video rounded-sm overflow-hidden mb-8">
                <img
                  src={EDITORIAL_IMAGES[2].src}
                  alt={EDITORIAL_IMAGES[2].alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-body text-lg text-aura-gray leading-relaxed">
                Every stitch tells a story. Our artisans spend an average of 300 hours on each gown, from the first sketch to the final fitting.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Parallax Image Strip */}
      <section ref={stripRef} className="py-16 overflow-hidden">
        <div className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
          {[EDITORIAL_IMAGES[3], EDITORIAL_IMAGES[4], EDITORIAL_IMAGES[5]].map((img, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[80vw] md:w-1/3 aspect-[3/4] rounded-sm overflow-hidden snap-center"
              style={{ scale }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Quote Block */}
      <section className="py-24 md:py-32 max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p
            className="font-display italic text-aura-black leading-relaxed"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            "A dress should not just be worn. It should be remembered."
          </p>
          <p className="font-body text-sm text-aura-gray mt-6 uppercase tracking-[0.15em]">
            — Elena Voss, Creative Director
          </p>
        </ScrollReveal>
      </section>
    </div>
  )
}
