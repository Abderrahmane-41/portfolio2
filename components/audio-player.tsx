"use client"

import { useEffect, useRef } from "react"

interface AudioPlayerProps {
  isPlaying: boolean
}

export function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      // Using a placeholder URL since we don't have actual audio
      // In a real implementation, you would use a real audio file path
      const audioUrl = "/placeholder.mp3"
      audioRef.current = new Audio(audioUrl)
      audioRef.current.loop = true
      audioRef.current.volume = 0.2
    }

    // Play or pause based on isPlaying prop
    if (isPlaying) {
      const playPromise = audioRef.current.play()

      // Handle play promise to avoid uncaught promise error
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio playback was prevented: ", error)
        })
      }
    } else if (audioRef.current) {
      audioRef.current.pause()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isPlaying])

  return null // This component doesn't render anything
}
