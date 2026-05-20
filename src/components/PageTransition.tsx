import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduced ? 0.2 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
