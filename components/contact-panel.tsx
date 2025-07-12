"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

interface ContactPanelProps {
  onNotify: (message: string) => void
}

export function ContactPanel({ onNotify }: ContactPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      onNotify("Message sent successfully! I'll get back to you soon.")
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col text-gray-300">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700"
      >
        <h2 className="text-sm font-mono text-cyan-400">// CONTACT INFORMATION</h2>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="bg-black/30 border border-gray-700 rounded p-4">
            <h3 className="text-sm font-mono mb-3 text-cyan-400">// CONNECT</h3>

            <div className="space-y-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">LinkedIn</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span className="text-sm">GitHub</span>
              </a>

              <a
                href="mailto:youremail@example.com"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-pink-400" />
                <span className="text-sm">youremail@example.com</span>
              </a>
            </div>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded p-4">
            <h3 className="text-sm font-mono mb-3 text-cyan-400">// LOCATION</h3>
            <div className="text-sm">
              <p className="mb-2">Buenos Aires, Argentina</p>
              <p className="text-gray-400">Open to remote opportunities worldwide</p>
            </div>
          </div>

          <div className="bg-black/30 border border-gray-700 rounded p-4">
            <h3 className="text-sm font-mono mb-3 text-cyan-400">// AVAILABILITY</h3>
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Currently available for new projects</span>
              </div>
              <p className="text-gray-400">Interested in product management roles focusing on AI innovation</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/30 border border-gray-700 rounded p-4"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-400 mb-4">Thanks for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-mono mb-3 text-cyan-400">// SEND MESSAGE</h3>

              <div>
                <label htmlFor="name" className="block text-xs text-gray-400 mb-1">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-gray-400 mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-gray-400 mb-1">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 rounded text-sm flex justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">This is a simulation. No real messages are sent.</p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
