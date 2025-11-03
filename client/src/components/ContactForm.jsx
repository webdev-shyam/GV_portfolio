import { useState } from 'react'
import { gsap } from 'gsap'
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all duration-300 text-white placeholder-neutral-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all duration-300 text-white placeholder-neutral-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="group">
            <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all duration-300 text-white placeholder-neutral-500 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/25 focus:ring-2 focus:ring-brand/20 focus:outline-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
          <p className="text-neutral-300">Thank you for reaching out. I'll get back to you soon!</p>
        </div>
      )}
    </div>
  )
}
