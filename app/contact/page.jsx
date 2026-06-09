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
    <main className="min-h-screen bg-hittamins-black pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-hittamins-muted uppercase mb-4">Get In Touch</p>
        <h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-hittamins-text mb-16">
          CONTACT
        </h1>

        {submitted ? (
          <div className="border border-hittamins-green p-10 text-center">
            <p className="font-display text-5xl text-hittamins-green mb-4">RECEIVED.</p>
            <p className="font-mono text-sm text-hittamins-muted">
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] tracking-widest text-hittamins-muted uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-hittamins-dark border border-hittamins-border px-4 py-3 text-hittamins-text font-mono text-sm focus:outline-none focus:border-hittamins-green transition-colors placeholder:text-hittamins-muted/40"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest text-hittamins-muted uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-hittamins-dark border border-hittamins-border px-4 py-3 text-hittamins-text font-mono text-sm focus:outline-none focus:border-hittamins-green transition-colors placeholder:text-hittamins-muted/40"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest text-hittamins-muted uppercase mb-2">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-hittamins-dark border border-hittamins-border px-4 py-3 text-hittamins-text font-mono text-sm focus:outline-none focus:border-hittamins-green transition-colors resize-none placeholder:text-hittamins-muted/40"
                placeholder="What's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 font-display text-3xl tracking-wide bg-hittamins-green text-black hover:opacity-80 transition-opacity"
            >
              SEND MESSAGE
            </button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-16 pt-12 border-t border-hittamins-border grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-hittamins-muted uppercase mb-2">Email</p>
            <p className="font-mono text-sm text-hittamins-text">hello@hittamins.com</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest text-hittamins-muted uppercase mb-2">Social</p>
            <p className="font-mono text-sm text-hittamins-text">@hittamins on Instagram & TikTok</p>
          </div>
        </div>
      </div>
    </main>
  )
}
