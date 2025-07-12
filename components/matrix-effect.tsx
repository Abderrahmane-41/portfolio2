"use client"

import { useEffect, useRef } from "react"

export function Matrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Characters to display (can include letters, numbers, symbols)
    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const columns = Math.floor(canvas.width / 15) // Column width is 15px
    const drops: number[] = []

    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    function draw() {
      // Set semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text style
      ctx.fillStyle = "#0f0" // Green text
      ctx.font = "15px monospace"

      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        // Select a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // Draw the character if drop is within canvas bounds
        if (drops[i] >= 0) {
          ctx.fillStyle = i % 3 === 0 ? "#0ff" : i % 5 === 0 ? "#f0f" : "#0f0"
          ctx.globalAlpha = Math.random() * 0.5 + 0.3 // Vary opacity
          ctx.fillText(text, i * 15, drops[i] * 15)
          ctx.globalAlpha = 1
        }

        // Move drop down
        drops[i]++

        // Reset drop after it reaches bottom or randomly
        if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -10)
        }
      }
    }

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Recalculate columns and reset drops
      const newColumns = Math.floor(canvas.width / 15)

      // If we need more columns, add them
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.floor(Math.random() * -canvas.height)
        }
      }

      // Update the drops array length to match the new columns
      drops.length = newColumns
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" />
}
