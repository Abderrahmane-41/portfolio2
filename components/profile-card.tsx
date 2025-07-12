"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ProfileCard() {
  return (
    <div className="h-full flex flex-col text-gray-300">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 md:w-48 h-48 relative border-4 border-cyan-500/50 rounded-lg overflow-hidden"
        >
          {/* Using a placeholder image - replace with actual profile photo */}
          <Image src="/professional-headshot.png" alt="Julieta Habif" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1"
        >
          <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Julieta Habif
          </h1>
          <h2 className="text-xl font-mono border-b border-gray-700 pb-2 mb-3">
            <span className="text-cyan-400">Product</span>
            <span className="text-purple-400"> Manager</span>
            <span className="text-xs ml-2 text-green-400 animate-pulse">v2.0</span>
          </h2>

          <div className="space-y-2 text-sm font-mono">
            <div className="flex items-start">
              <span className="text-cyan-400 mr-2">{">"}</span>
              <p>
                Product manager with expertise in digital product development, UX/UI design, and AI innovation. I lead
                multidisciplinary teams through the complete product lifecycle, from research to launch.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-purple-400 mr-2">{">"}</span>
              <p>
                Currently focused on how artificial intelligence can accelerate and enhance the development of more
                accessible, scalable products with real impact. Advocate for open work culture and building in public.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Product Strategy", "UX/UI", "AI Innovation", "Team Leadership", "Agile/Scrum"].map((tag, i) => (
              <span
                key={i}
                className="inline-block px-2 py-1 text-xs font-mono bg-gray-800 border border-gray-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-auto"
      >
        <div className="border border-gray-700 rounded bg-gray-800/50 p-3">
          <div className="flex items-center text-xs font-mono mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
          <div className="text-xs font-mono">
            <div className="flex items-start mb-1">
              <span className="text-cyan-400 mr-2 inline-block w-20">Location:</span>
              <span>Buenos Aires, Argentina</span>
            </div>
            <div className="flex items-start mb-1">
              <span className="text-cyan-400 mr-2 inline-block w-20">Languages:</span>
              <span>English, Spanish</span>
            </div>
            <div className="flex items-start">
              <span className="text-cyan-400 mr-2 inline-block w-20">OS Version:</span>
              <span>
                ProductManager OS 2.0.24 <span className="text-green-400">[STABLE]</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
