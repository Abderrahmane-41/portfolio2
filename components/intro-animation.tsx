"use client"

import { useEffect, useRef } from "react"

export function IntroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", resizeCanvas)

    // Noise effect
    const createNoise = () => {
      const idata = ctx.createImageData(canvas.width, canvas.height)
      const buffer32 = new Uint32Array(idata.data.buffer)
      const len = buffer32.length

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.05) {
          buffer32[i] = 0xffffffff // white
        }
      }

      ctx.putImageData(idata, 0, 0)
    }

    // Matrix effect
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0" // green text
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = "JULIETA HABIF PRODUCT MANAGER"[Math.floor(Math.random() * 28)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    // Glitch effect
    let glitchInterval: NodeJS.Timeout | null = null

    const startGlitching = () => {
      if (glitchInterval) clearInterval(glitchInterval)

      glitchInterval = setInterval(() => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const width = Math.random() * 300 + 100
        const height = Math.random() * 20 + 10

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(Math.random() > 0.5 ? 1 : -1, 1)

        // Get image data from a random part of the canvas
        const imageData = ctx.getImageData(Math.random() * canvas.width, Math.random() * canvas.height, width, height)

        // Draw it somewhere else
        ctx.putImageData(imageData, 0, 0)
        ctx.restore()
      }, 50)

      setTimeout(() => {
        if (glitchInterval) clearInterval(glitchInterval)
      }, 300)
    }

    // Animation sequence
    let phase = 0
    let lastTime = 0
    let matrixStartTime = 0
    let noiseStartTime = 0

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time

      if (phase === 0) {
        // Initial noise phase
        createNoise()
        if (time > 1000) {
          phase = 1
          matrixStartTime = time
        }
      } else if (phase === 1) {
        // Matrix phase
        matrix()
        if (time - matrixStartTime > 2000) {
          phase = 2
          noiseStartTime = time
        }
      } else if (phase === 2) {
        // Noise with occasional glitches
        createNoise()
        if (Math.random() < 0.05) startGlitching()

        // Fade to black
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, (time - noiseStartTime) / 1000)})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (time - noiseStartTime > 1000) {
          phase = 3
        }
      } else if (phase === 3) {
        // Final black screen with minimal noise
        ctx.fillStyle = "rgba(0, 0, 0, 0.98)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (Math.random() < 0.01) startGlitching()
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
      if (glitchInterval) clearInterval(glitchInterval)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30" />
    </>
  )
}
