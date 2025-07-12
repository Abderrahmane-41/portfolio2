"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Power } from "lucide-react"

interface TaskbarProps {
  windows: Array<{ id: string; title: string; isOpen: boolean; zIndex: number }>
  toggleWindow: (id: string) => void
  bringToFront: (id: string) => void
  audioEnabled: boolean
  onAudioToggle: () => void
}

export function Taskbar({ windows, toggleWindow, bringToFront, audioEnabled, onAudioToggle }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "numeric" })
  }

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 flex items-center justify-between px-2 z-50">
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded flex items-center gap-1 text-sm font-bold ${
            isStartMenuOpen ? "bg-blue-700 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
          onClick={toggleStartMenu}
        >
          <span className="text-xs font-mono">START</span>
        </motion.button>

        {isStartMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-2 bottom-10 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg p-2 z-50"
          >
            <div className="border-b border-gray-700 pb-2 mb-2">
              <div className="px-2 py-1 text-sm text-gray-400">Julieta Habif</div>
            </div>

            {windows.map((window) => (
              <button
                key={window.id}
                className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white rounded flex items-center gap-2"
                onClick={() => {
                  toggleWindow(window.id)
                  setIsStartMenuOpen(false)
                }}
              >
                <span className="w-4 h-4 bg-gray-600 rounded-sm flex-shrink-0"></span>
                {window.title}
              </button>
            ))}

            <div className="border-t border-gray-700 pt-2 mt-2">
              <button
                className="w-full text-left px-3 py-1.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white rounded flex items-center gap-2"
                onClick={() => window.location.reload()}
              >
                <Power className="w-4 h-4" />
                Restart
              </button>
            </div>
          </motion.div>
        )}

        <div className="h-full flex items-center space-x-1">
          {windows
            .filter((window) => window.isOpen)
            .map((window) => (
              <motion.button
                key={window.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-8 px-2 bg-gray-700 hover:bg-gray-600 text-xs font-mono text-gray-200 rounded-sm flex items-center"
                onClick={() => bringToFront(window.id)}
              >
                {window.title}
              </motion.button>
            ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          className="text-gray-300 hover:text-white p-1 rounded hover:bg-gray-700"
          onClick={onAudioToggle}
          title={audioEnabled ? "Mute" : "Unmute"}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <motion.div
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}
          className="px-2 py-1 text-xs font-mono text-gray-200 rounded flex flex-col items-center"
        >
          <div>{formatTime(currentTime)}</div>
          <div className="text-[10px] text-gray-400">{formatDate(currentTime)}</div>
        </motion.div>
      </div>
    </div>
  )
}
