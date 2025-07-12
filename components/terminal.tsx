"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function Terminal() {
  const [lines, setLines] = useState<string[]>([
    "Welcome to Terminal v3.04.21 - AI Enhanced",
    "Type 'help' to see available commands",
    "",
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Command functions
  const commands: Record<string, () => void> = {
    help: () => {
      setLines((prev) => [
        ...prev,
        "Available commands:",
        "  about       - Display information about Julieta Habif",
        "  skills      - List key skills and competencies",
        "  experience  - Show professional experience",
        "  education   - Display educational background",
        "  contact     - Show contact information",
        "  clear       - Clear the terminal",
        "  help        - Show this help message",
        "",
      ])
    },

    about: () => {
      setLines((prev) => [
        ...prev,
        "// ABOUT JULIETA HABIF",
        "-------------------------",
        "Product Manager with experience in digital product development, UX/UI, and technology.",
        "Specialized in AI innovation and building products with high impact.",
        "Passionate about open work culture, continuous learning, and building in public.",
        "",
      ])
    },

    skills: () => {
      setLines((prev) => [
        ...prev,
        "// SKILLS",
        "-------------------------",
        "- Product Strategy & Management",
        "- User Experience (UX/UI) Design",
        "- AI & Technology Integration",
        "- Team Leadership & Communication",
        "- Agile/Scrum Methodologies",
        "- Build in Public & Open Work",
        "",
      ])
    },

    experience: () => {
      setLines((prev) => [
        ...prev,
        "// PROFESSIONAL EXPERIENCE",
        "-------------------------",
        "Senior Product Owner | Insside | 2024 - Present",
        "Product Analyst & Innovation Cell | Orbith | 2023 - 2024",
        "Business Processes Associate Consultant | SAP | 2022 - 2023",
        "Product Owner | SAP | 2020 - 2022",
        "",
        "Type 'experience [company]' for details (e.g., 'experience insside')",
        "",
      ])
    },

    education: () => {
      setLines((prev) => [
        ...prev,
        "// EDUCATION",
        "-------------------------",
        "Computer Science Engineering | UADE | 2016 - 2020",
        "UX/UI Design | Coderhouse | 2021",
        "Node.js & Next.js | Digital House | 2022",
        "UX/UI Foundations | Interaction Design Foundation | 2023",
        "",
      ])
    },

    contact: () => {
      setLines((prev) => [
        ...prev,
        "// CONTACT INFORMATION",
        "-------------------------",
        "Email: youremail@example.com",
        "LinkedIn: linkedin.com/in/yourusername",
        "GitHub: github.com/yourusername",
        "Location: Buenos Aires, Argentina",
        "",
      ])
    },

    clear: () => {
      setLines(["Terminal cleared", ""])
    },
  }

  // Handle specific experience queries
  const handleExperienceQuery = (company: string) => {
    const companies: { [key: string]: string[] } = {
      insside: [
        "// EXPERIENCE: INSSIDE (2024 - Present)",
        "-------------------------",
        "Role: Senior Product Owner",
        "",
        "• Management of the complete digital product lifecycle",
        "• Work with internal teams and external providers",
        "• Analysis and refinement of requirements",
        "• Strategic definition and roadmap execution",
        "",
      ],
      orbith: [
        "// EXPERIENCE: ORBITH (2023 - 2024)",
        "-------------------------",
        "Role: Product Analyst & Innovation Cell",
        "",
        "• Led development of new digital products",
        "• Coordinated with legal, commercial, and technical teams",
        "• Analyzed service profitability and defined MVPs",
        "• Led a team of developers in innovation projects",
        "",
      ],
      sap: [
        "// EXPERIENCE: SAP (2020 - 2023)",
        "-------------------------",
        "Roles: Product Owner (2020-2022), Business Processes Consultant (2022-2023)",
        "",
        "• Defined product vision and prioritized backlog",
        "• Designed user personas and conducted testing",
        "• Analyzed client systems for improvements",
        "• Developed roadmaps for updates and migrations",
        "",
      ],
    }

    const companyLower = company.toLowerCase()
    if (companies[companyLower]) {
      setLines((prev) => [...prev, ...companies[companyLower]])
    } else {
      setLines((prev) => [
        ...prev,
        `Company '${company}' not found in experience.`,
        "Try 'insside', 'orbith', or 'sap'",
        "",
      ])
    }
  }

  const processCommand = (input: string) => {
    const inputTrimmed = input.trim()
    if (inputTrimmed === "") return

    // Add command to history
    setCommandHistory((prev) => [inputTrimmed, ...prev])
    setHistoryIndex(-1)

    // Display command in terminal
    setLines((prev) => [...prev, `> ${inputTrimmed}`, ""])

    // Process command
    const args = inputTrimmed.split(" ")
    const command = args[0].toLowerCase()

    if (command === "experience" && args.length > 1) {
      handleExperienceQuery(args[1])
    } else if (command in commands) {
      commands[command]()
    } else {
      setLines((prev) => [...prev, `Command not found: ${command}`, "Type 'help' to see available commands", ""])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput("")
      }
    }
  }

  // Auto-scroll to the bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="h-full flex flex-col">
      <div
        ref={terminalRef}
        className="flex-1 font-mono text-xs text-green-400 bg-black overflow-y-auto p-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`${line.startsWith("//") ? "text-cyan-400 font-bold" : ""} ${
              line.startsWith(">") ? "text-white" : ""
            } ${line.startsWith("  ") ? "text-gray-400" : ""}`}
          >
            {line}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center bg-gray-900 border-t border-gray-700 p-2">
        <span className="text-green-400 mr-2 font-mono text-xs">{">"}</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none text-green-400 focus:outline-none font-mono text-xs"
          autoFocus
        />
      </div>
    </div>
  )
}
