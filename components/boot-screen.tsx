"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BootScreenProps {
  onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)

  const bootTexts = [
    "Initializing system...",
    "Loading neural networks...",
    "Calibrating AI interfaces...",
    "Accessing product manager database...",
    "Optimizing user experience parameters...",
    "Preparing innovation frameworks...",
    "Establishing team leadership protocols...",
    "Ready to disrupt...",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 60)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const completeTimeout = setTimeout(() => {
        onComplete()
      }, 1000)

      return () => clearTimeout(completeTimeout)
    }
  }, [progress, onComplete])

  useEffect(() => {
    // Map progress to bootTexts index
    const newIndex = Math.min(Math.floor((progress / 100) * bootTexts.length), bootTexts.length - 1)
    if (newIndex !== textIndex) {
      setTextIndex(newIndex)
    }
  }, [progress, bootTexts.length, textIndex])

  useEffect(() => {
    if (textIndex < bootTexts.length) {
      setCurrentText("")
      let i = 0
      const targetText = bootTexts[textIndex]

      const typingInterval = setInterval(() => {
        if (i < targetText.length) {
          setCurrentText((prev) => prev + targetText.charAt(i))
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [textIndex, bootTexts])

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center text-green-400 font-mono">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1], scale: [0.98, 1, 0.99, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="text-4xl md:text-6xl font-bold mb-4 glitch-text"
        >
          <span className="text-green-400">JULIETA HABIF</span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl md:text-2xl tracking-widest"
        >
          PRODUCT MANAGER 2.0
        </motion.h2>
      </div>

      <div className="w-full max-w-md px-4">
        <div className="h-6 mb-2 flex items-center">
          <span className="text-sm font-mono">{currentText}</span>
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, repeatType: "reverse" }}
            className="ml-1 h-4 w-2 bg-green-400"
          ></motion.span>
        </div>

        <div className="w-full h-3 border border-green-400 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-green-400"
          ></motion.div>
        </div>

        <div className="text-xs text-green-400/70">
          <span>BIOS Version 9.7.01</span>
          <span className="float-right">Progress: {progress}%</span>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() < 0.7 ? [0.2, 0.8] : [0.1, 0.3] }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
              className="w-4 h-4 bg-green-400/30"
            ></motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-xs text-green-400/70"
        >
          © INNOVATIVE OS v3.04.21 - AI ENHANCED
        </motion.p>
      </div>
    </div>
  )
}
