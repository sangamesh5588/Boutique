import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'

export function Loader() {
  const { loaderComplete, setLoaderComplete } = useStore()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <AnimatePresence>
      {!loaderComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-aura-ivory flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.6 }}
          onAnimationComplete={() => setLoaderComplete(true)}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-light text-aura-black tracking-wide">
              AURA
            </h1>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-aura-gray mt-2">
              BRIDAL
            </p>
          </motion.div>

          <motion.div
            className="w-32 h-px bg-aura-gold mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduced ? 0.2 : 1.5,
              ease: 'easeOut',
              delay: 0.3,
            }}
            style={{ originX: 0.5 }}
            onAnimationComplete={() => {
              setTimeout(() => setLoaderComplete(true), reduced ? 100 : 800)
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
