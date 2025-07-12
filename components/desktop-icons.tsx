"use client"

import { motion } from "framer-motion"

interface IconsProps {
  onOpenWindow: (id: string) => void
}

export function Icons({ onOpenWindow }: IconsProps) {
  const icons = [
    { id: "profile", title: "Profile", icon: "👤" },
    { id: "skills", title: "Skills", icon: "📊" },
    { id: "experience", title: "Experience", icon: "💼" },
    { id: "projects", title: "Projects", icon: "🚀" },
    { id: "contact", title: "Contact", icon: "📧" },
    { id: "terminal", title: "Terminal", icon: "💻" },
  ]

  return (
    <div className="absolute top-4 left-4 space-y-6">
      {icons.map((icon, index) => (
        <motion.button
          key={icon.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="flex flex-col items-center w-20 group"
          onClick={() => onOpenWindow(icon.id)}
          title={icon.title}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gray-800/80 backdrop-blur rounded-lg border border-gray-700 flex items-center justify-center text-2xl mb-1 group-hover:border-cyan-500 transition-colors"
          >
            {icon.icon}
          </motion.div>
          <span className="text-xs text-white/80 bg-black/50 px-2 py-0.5 rounded group-hover:bg-cyan-900/80 transition-colors">
            {icon.title}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
