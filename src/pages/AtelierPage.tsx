import { Link } from 'react-router-dom'
import { ScrollReveal } from '@/components/ScrollReveal'

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with an intimate conversation about your vision, your venue, and the story you want your gown to tell.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our creative director sketches your gown by hand, selecting fabrics from our archive of over 500 heritage textiles.',
  },
  {
    number: '03',
    title: 'Creation',
    description: 'A team of four artisans dedicates 12–16 weeks to hand-cutting, sewing, and embellishing your gown in our atelier.',
  },
  {
    number: '04',
    title: 'Fitting',
    description: 'Two private fittings ensure every seam, every bead, every drape is exactly as you dreamed.',
  },
]

export function AtelierPage() {
  return (
    <div className="min-h-screen bg-aura-ivory pt-24 md:pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 md:mb-24">
        <ScrollReveal>
          <h1 className="font-display text-4xl md:text-5xl font-light text-aura-black">
            Our Atelier
          </h1>
        </ScrollReveal>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center mb-24">
        <ScrollReveal delay={0.1}>
          <p className="font-body text-lg md:text-xl text-aura-gray leading-relaxed">
            In a quiet courtyard in Paris' 8th arrondissement, a small team of master artisans continues a tradition of couture bridal craftsmanship that spans three generations. This is where your gown begins.
          </p>
        </ScrollReveal>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-24">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-aura-gold/30 md:-translate-x-px" />

          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className={`relative flex items-start gap-8 md:gap-16 mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                }`}>
                  <span className="font-display text-5xl md:text-6xl font-light text-aura-gold/40">
                    {step.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-normal text-aura-black mt-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-aura-gray leading-relaxed mt-4 max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-aura-gold border-4 border-aura-ivory md:-translate-x-1.5" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Atelier Image */}
      <ScrollReveal>
        <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
            alt="Atelier workshop"
            className="w-full h-full object-cover"
          />
        </div>
      </ScrollReveal>

      {/* CTA */}
      <div className="py-24 md:py-32 text-center">
        <ScrollReveal>
          <Link
            to="/book-fitting"
            className="inline-block bg-aura-gold text-white font-body text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-aura-black transition-colors duration-300"
          >
            Begin Your Journey
          </Link>
        </ScrollReveal>
      </div>
    </div>
  )
}
