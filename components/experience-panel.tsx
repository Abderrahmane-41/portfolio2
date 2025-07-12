"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ExperiencePanel() {
  const [activeExperience, setActiveExperience] = useState(0)

  const experiences = [
    {
      title: "Ssr Product Owner",
      company: "Insside",
      period: "Noviembre 2024 – Actualidad",
      description: [
        "Management of the complete digital product lifecycle (from discovery to MVP).",
        "Work with internal teams and external providers in solution development.",
        "Analysis, documentation, and refinement of requirements to ensure business-aligned deliveries.",
        "Participation in strategic definition and roadmap execution to maximize value.",
      ],
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Product Analyst & Innovation Cell",
      company: "Orbith",
      period: "Mayo 2023 – Octubre 2024",
      description: [
        "Led the development of new digital products for residential segments and ISPs.",
        "Coordinated with legal, commercial, and technical teams to ensure comprehensive implementations.",
        "Analyzed service profitability, defined MVPs, and optimized value propositions.",
        "Led a team of 2 developers in innovation and business intelligence projects, incorporating AI in exploratory stages.",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Business Processes Associate Consultant",
      company: "SAP",
      period: "Mayo 2022 – Mayo 2023",
      description: [
        "Analyzed client systems and recommended improvements aligned with SAP best practices.",
        "Developed roadmaps for updates and migrations.",
        "Advised on performance and process adoption.",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Product Owner",
      company: "SAP",
      period: "Noviembre 2020 – Mayo 2022",
      description: [
        "Defined product vision and prioritized backlog aligned with strategic objectives.",
        "Designed user personas and use scenarios, and conducted user testing.",
        "Conducted training workshops and worked with UI Designers to build functional and attractive interfaces.",
      ],
      color: "from-orange-500 to-yellow-500",
    },
  ]

  return (
    <div className="h-full flex flex-col text-gray-300">
      <div className="flex space-x-1 mb-4 overflow-x-auto hide-scrollbar">
        {experiences.map((exp, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`px-3 py-1 text-xs font-mono whitespace-nowrap rounded-md ${
              activeExperience === index
                ? `bg-gradient-to-r ${exp.color} text-white`
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveExperience(index)}
          >
            {exp.company}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar terminal-container relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperience}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="terminal-text font-mono text-sm"
          >
            <div className={`flex items-center mb-4`}>
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${experiences[activeExperience].color} mr-2`}
              ></div>
              <span className="text-white">{experiences[activeExperience].title}</span>
            </div>

            <div className="bg-black/30 border border-gray-700 rounded p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-400">
                  <div className="text-white">{experiences[activeExperience].company}</div>
                  <div className="text-xs">{experiences[activeExperience].period}</div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded bg-gradient-to-r ${experiences[activeExperience].color} text-white`}
                >
                  {activeExperience === 0 ? "CURRENT" : "PAST"}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {experiences[activeExperience].description.map((desc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-green-400 mr-2">$</span>
                    <span>{desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-400 bg-gray-800/30 p-3 rounded border border-gray-700">
              <div className="mb-2">Additional Information:</div>

              {activeExperience === 0 && (
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Working with cross-functional teams on B2B and B2C digital products</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Leading AI integration initiatives for process optimization</span>
                  </div>
                </div>
              )}

              {activeExperience === 1 && (
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Led the development of a customer portal with real-time tracking features</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Implemented AI-powered analytics for network traffic optimization</span>
                  </div>
                </div>
              )}

              {activeExperience === 2 && (
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Specialized in ERP optimization and integration solutions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Conducted technical documentation and process mapping workshops</span>
                  </div>
                </div>
              )}

              {activeExperience === 3 && (
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Managed the release of a comprehensive dashboard solution for enterprise clients</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2">&gt;</span>
                    <span>Facilitated UX research sessions and created detailed user journey maps</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Terminal lines decoration */}
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-hidden opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap font-mono text-[10px] text-white opacity-50"
              style={{ marginTop: `${Math.random() * 24}px` }}
            >
              {Array.from({ length: 30 })
                .map(() => (Math.random() > 0.5 ? "1" : "0"))
                .join(" ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
