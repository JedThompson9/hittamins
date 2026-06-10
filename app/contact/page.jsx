'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-brand-light pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-brand-muted uppercase mb-4">Get In Touch</p>
        <h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-brand-navy mb-16">
          CONTACT
        </h1>

        {submitted ? (
          <div className="border border-brand-mint bg-brand-soft p-10 text-center">
            <p className="font-display text-5xl text-brand-blue mb-4">RECEIVED.</p>
            <p className="font-mono text-sm text-brand-muted">
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white border border-brand-border px-4 py-3 text-brand-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors placeholder:text-brand-muted/40"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-brand-border px-4 py-3 text-brand-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors placeholder:text-brand-muted/40"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-2">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white border border-brand-border px-4 py-3 text-brand-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors resize-none placeholder:text-brand-muted/40"
                placeholder="What's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 font-display text-3xl tracking-wide bg-brand-blue text-white hover:opacity-80 transition-opacity"
            >
              SEND MESSAGE
            </button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-16 pt-12 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-2">Email</p>
            <p className="font-mono text-sm text-brand-text">hello@hittamins.com</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-2">Social</p>
            <p className="font-mono text-sm text-brand-text">@hittamins on Instagram & TikTok</p>
          </div>
        </div>
      </div>
    </main>
  )
}
