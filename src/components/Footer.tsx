import { Link } from 'react-router-dom'
import { Instagram, PinIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-aura-ivory border-t border-aura-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="font-display text-2xl font-light mb-4">AURA BRIDAL</h3>
            <p className="font-body text-sm text-aura-gray leading-relaxed max-w-xs">
              Handcrafted couture bridal gowns. Made to measure in our Paris atelier since 1987.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/collections" className="font-body text-sm text-aura-gray hover:text-aura-black transition-colors">Collections</Link>
            <Link to="/atelier" className="font-body text-sm text-aura-gray hover:text-aura-black transition-colors">Our Atelier</Link>
            <Link to="/lookbook" className="font-body text-sm text-aura-gray hover:text-aura-black transition-colors">Lookbook</Link>
            <Link to="/book-fitting" className="font-body text-sm text-aura-gray hover:text-aura-black transition-colors">Book a Fitting</Link>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-aura-gray mb-4">Newsletter</p>
            <div className="flex border-b border-aura-border pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent font-body text-sm text-aura-black placeholder:text-aura-gray/50 focus:outline-none"
              />
              <button className="font-body text-xs uppercase tracking-wider text-aura-gold hover:text-aura-black transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-aura-gray hover:text-aura-black transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-aura-gray hover:text-aura-black transition-colors" aria-label="Pinterest">
                <PinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-aura-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-aura-gray">© 2026 Aura Bridal. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="font-body text-xs text-aura-gray hover:text-aura-black cursor-pointer transition-colors">Privacy</span>
            <span className="font-body text-xs text-aura-gray hover:text-aura-black cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
