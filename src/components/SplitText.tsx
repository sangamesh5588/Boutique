import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  duration = 0.6,
}: SplitTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: '0.3em' }}
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0.2 : duration,
            delay: reduced ? 0 : delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
