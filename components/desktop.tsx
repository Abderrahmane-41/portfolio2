"use client"

import { useState, useEffect } from "react"
import { Window } from "@/components/window"
import { Taskbar } from "@/components/taskbar"
import { Terminal } from "@/components/terminal"
import { ProfileCard } from "@/components/profile-card"
import { SkillsPanel } from "@/components/skills-panel"
import { ExperiencePanel } from "@/components/experience-panel"
import { ProjectsPanel } from "@/components/projects-panel"
import { ContactPanel } from "@/components/contact-panel"
import { Icons } from "@/components/desktop-icons"
import { NotificationPopup } from "@/components/notification"
import { Matrix } from "@/components/matrix-effect"

interface DesktopProps {
  audioEnabled: boolean
  onAudioToggle: () => void
}

export function Desktop({ audioEnabled, onAudioToggle }: DesktopProps) {
  const [windows, setWindows] = useState<Array<{ id: string; title: string; isOpen: boolean; zIndex: number }>>([
    { id: "profile", title: "profile.exe", isOpen: true, zIndex: 10 },
    { id: "skills", title: "skills.sys", isOpen: false, zIndex: 9 },
    { id: "experience", title: "experience.dat", isOpen: false, zIndex: 8 },
    { id: "projects", title: "projects.cfg", isOpen: false, zIndex: 7 },
    { id: "contact", title: "contact.dll", isOpen: false, zIndex: 6 },
    { id: "terminal", title: "command.exe", isOpen: false, zIndex: 5 },
  ])

  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    // Show tutorial notification after a delay
    const timer = setTimeout(() => {
      setNotificationMessage("Click on the desktop icons to open different sections of the CV.")
      setShowNotification(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.id === id) {
          // If opening a closed window, give it the highest z-index
          const newZIndex = window.isOpen ? window.zIndex : Math.max(...prev.map((w) => w.zIndex)) + 1
          return { ...window, isOpen: !window.isOpen, zIndex: newZIndex }
        }
        return window
      }),
    )
  }

  const bringToFront = (id: string) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex))
      return prev.map((window) => {
        if (window.id === id && window.zIndex < maxZ) {
          return { ...window, zIndex: maxZ + 1 }
        }
        return window
      })
    })
  }

  const handleNotificationDismiss = () => {
    setShowNotification(false)
  }

  const displayNotification = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 relative overflow-hidden">
      <Matrix />

      <div className="absolute inset-0 z-10 p-4">
        <Icons onOpenWindow={toggleWindow} />

        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            isOpen={window.isOpen}
            zIndex={window.zIndex}
            onClose={() => toggleWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
          >
            {window.id === "profile" && <ProfileCard />}
            {window.id === "skills" && <SkillsPanel />}
            {window.id === "experience" && <ExperiencePanel />}
            {window.id === "projects" && <ProjectsPanel />}
            {window.id === "contact" && <ContactPanel onNotify={displayNotification} />}
            {window.id === "terminal" && <Terminal />}
          </Window>
        ))}

        {showNotification && <NotificationPopup message={notificationMessage} onDismiss={handleNotificationDismiss} />}
      </div>

      <Taskbar
        windows={windows}
        toggleWindow={toggleWindow}
        bringToFront={bringToFront}
        audioEnabled={audioEnabled}
        onAudioToggle={onAudioToggle}
      />
    </div>
  )
}
