import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface BlurInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function BlurIn({ children, delay = 0, duration = 0.6, className = '' }: BlurInProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: reduced ? 'blur(0px)' : 'blur(10px)', y: reduced ? 0 : 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: reduced ? 0.2 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
