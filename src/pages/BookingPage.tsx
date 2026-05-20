import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = "w-full bg-transparent border-b border-aura-border py-3 font-body text-sm text-aura-black placeholder:text-aura-gray/50 focus:border-aura-gold focus:outline-none transition-colors duration-300"
  const labelClass = "font-body text-[11px] uppercase tracking-[0.15em] text-aura-gray mb-2 block"

  return (
    <div className="min-h-screen bg-aura-ivory pt-24 md:pt-32 pb-16">
      <div className="max-w-xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScrollReveal className="text-center mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-light text-aura-black">
                  Book Your Private Fitting
                </h1>
                <p className="font-body text-base text-aura-gray leading-relaxed mt-4 max-w-lg mx-auto">
                  Experience Aura Bridal in person. Our private fittings include a curated selection of gowns, champagne, and dedicated stylist consultation.
                </p>
              </ScrollReveal>

              <form onSubmit={handleSubmit} className="mt-16">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className={inputClass}
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className={inputClass}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6">
                  <div>
                    <label className={labelClass}>Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Time</label>
                    <select
                      required
                      value={form.preferredTime}
                      onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Location</label>
                  <select
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select location</option>
                    <option value="paris">Paris Atelier</option>
                    <option value="newyork">New York Showroom</option>
                    <option value="london">London Salon</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className={labelClass}>Notes (Optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Tell us about your dream gown..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-aura-black text-white font-body text-sm uppercase tracking-widest py-4 rounded-full hover:bg-aura-black/90 transition-colors duration-300"
                >
                  Request Appointment
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center py-24"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-aura-gold/10 flex items-center justify-center mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              >
                <Check className="w-10 h-10 text-aura-gold" />
              </motion.div>

              <h2 className="font-display text-3xl font-light text-aura-black mb-4">
                Request Received
              </h2>
              <p className="font-body text-base text-aura-gray leading-relaxed max-w-md mx-auto mb-8">
                Your appointment request has been received. Our team will contact you within 24 hours to confirm your fitting.
              </p>
              <Link
                to="/collections"
                className="inline-block font-body text-sm text-aura-gold hover:text-aura-black transition-colors"
              >
                Return to Collection →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
