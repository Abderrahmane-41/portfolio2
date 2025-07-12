"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface RetroMouseProps {
  position: { x: number; y: number }
}

export function RetroMouse({ position }: RetroMouseProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (position.x === 0 && position.y === 0) return

    // Only start tracking after the mouse has moved
    if (!isActive && (position.x !== 0 || position.y !== 0)) {
      setIsActive(true)
    }

    if (isActive) {
      setTrail((prevTrail) => {
        const newTrail = [
          { x: position.x, y: position.y, id: Date.now() },
          ...prevTrail.slice(0, 5), // Keep only 6 trail positions
        ]
        return newTrail
      })
    }
  }, [position, isActive])

  // Hide real cursor
  useEffect(() => {
    document.body.style.cursor = "none"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  // Return if mouse hasn't moved yet
  if (!isActive) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail effects */}
      {trail.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="absolute w-1 h-1 rounded-full bg-cyan-500"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: 1 - index * 0.15,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 - index * 0.15 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="absolute w-6 h-6 pointer-events-none z-50"
        style={{
          left: position.x - 2,
          top: position.y - 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 1L7 17L11 13H17L7 1Z' fill='white' stroke='black' strokeWidth='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  )
}
