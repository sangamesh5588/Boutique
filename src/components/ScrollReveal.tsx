import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal()
  const reduced = useReducedMotion()

  const getInitial = () => {
    if (reduced) return { opacity: 0 }
    switch (direction) {
      case 'up': return { opacity: 0, y: distance }
      case 'down': return { opacity: 0, y: -distance }
      case 'left': return { opacity: 0, x: distance }
      case 'right': return { opacity: 0, x: -distance }
    }
  }

  const getAnimate = () => {
    if (reduced) return { opacity: 1 }
    return { opacity: 1, x: 0, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={isVisible ? getAnimate() : getInitial()}
      transition={{
        duration: reduced ? 0.2 : 0.9,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
