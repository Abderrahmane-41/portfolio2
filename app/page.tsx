"use client"

import { useState, useEffect } from "react"
import { BootScreen } from "@/components/boot-screen"
import { Desktop } from "@/components/desktop"
import { RetroMouse } from "@/components/retro-mouse"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { AudioPlayer } from "@/components/audio-player"

export default function CV() {
  const [bootComplete, setBootComplete] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const mousePosition = useMousePosition()

  useEffect(() => {
    // This is just for development preview; in production we'll show the boot screen
    const timer = setTimeout(() => {
      setBootComplete(true)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled)
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-900 relative">
      {!bootComplete ? (
        <BootScreen onComplete={() => setBootComplete(true)} />
      ) : (
        <Desktop audioEnabled={audioEnabled} onAudioToggle={handleAudioToggle} />
      )}
      <RetroMouse position={mousePosition} />
      {bootComplete && <AudioPlayer isPlaying={audioEnabled} />}
    </main>
  )
}
