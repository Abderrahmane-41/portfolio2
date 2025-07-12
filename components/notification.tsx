"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface NotificationPopupProps {
  message: string
  onDismiss: () => void
}

export function NotificationPopup({ message, onDismiss }: NotificationPopupProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDismiss()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="absolute top-4 right-4 w-80 bg-gray-800/90 backdrop-blur border border-gray-700 rounded shadow-lg p-4 z-50"
    >
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-cyan-400 mb-1">System Notification</h3>
          <p className="text-xs text-gray-300">{message}</p>
        </div>
        <button onClick={onDismiss} className="text-gray-400 hover:text-white ml-2" aria-label="Close notification">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
