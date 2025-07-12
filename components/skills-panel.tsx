"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function SkillsPanel() {
  const [activeTab, setActiveTab] = useState("product")

  const tabs = [
    { id: "product", label: "Product", color: "from-pink-500 to-purple-500" },
    { id: "tech", label: "Tech", color: "from-cyan-500 to-blue-500" },
    { id: "leadership", label: "Leadership", color: "from-green-500 to-blue-500" },
    { id: "ai", label: "AI", color: "from-orange-500 to-pink-500" },
  ]

  // Proficiency levels with descriptions
  const proficiencyLevels = {
    expert: {
      label: "Expert",
      description: "Deep knowledge and extensive experience; can lead and innovate in this area",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    advanced: {
      label: "Advanced",
      description: "Strong competency with broad application; can mentor others",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    proficient: {
      label: "Proficient",
      description: "Solid working knowledge; can work independently",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    familiar: {
      label: "Familiar",
      description: "Basic understanding; can apply with guidance",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
  }

  // Skills organized by category with proficiency levels and context
  const skills = {
    product: [
      {
        name: "Product Strategy",
        level: "expert",
        context: "Developed comprehensive product roadmaps and go-to-market strategies for digital products",
      },
      {
        name: "User Research",
        level: "advanced",
        context: "Conducted user interviews, usability testing, and data analysis to inform product decisions",
      },
      {
        name: "UX/UI Design",
        level: "proficient",
        context: "Collaborated with designers to create intuitive user experiences and interfaces",
      },
      {
        name: "Agile/Scrum",
        level: "expert",
        context: "Led cross-functional teams using Agile methodologies, sprint planning, and backlog management",
      },
      {
        name: "Roadmapping",
        level: "advanced",
        context: "Created strategic product roadmaps aligned with business objectives and user needs",
      },
      {
        name: "MVP Development",
        level: "expert",
        context: "Defined and prioritized minimum viable product features to validate market fit quickly",
      },
    ],
    tech: [
      {
        name: "React/Next.js",
        level: "proficient",
        context: "Built and maintained product features using React components and Next.js framework",
      },
      {
        name: "JavaScript",
        level: "proficient",
        context: "Implemented interactive features and collaborated with developers on front-end functionality",
      },
      {
        name: "SQL/NoSQL",
        level: "familiar",
        context: "Designed data models and worked with development teams on database implementations",
      },
      {
        name: "Figma/Design Tools",
        level: "advanced",
        context: "Created wireframes, prototypes, and collaborated on design systems",
      },
      {
        name: "API Integration",
        level: "proficient",
        context: "Specified API requirements and coordinated integration between systems",
      },
      {
        name: "DevOps Basics",
        level: "familiar",
        context: "Understand CI/CD pipelines and deployment processes to coordinate with engineering teams",
      },
    ],
    leadership: [
      {
        name: "Team Leadership",
        level: "advanced",
        context: "Led cross-functional teams of 2-8 people, fostering collaboration and alignment",
      },
      {
        name: "Stakeholder Management",
        level: "advanced",
        context: "Built consensus among diverse stakeholders including executives, clients, and technical teams",
      },
      {
        name: "Communication",
        level: "expert",
        context: "Translated complex technical concepts for non-technical audiences and vice versa",
      },
      {
        name: "Problem Solving",
        level: "advanced",
        context: "Identified root causes and implemented effective solutions to complex product challenges",
      },
      {
        name: "Adaptability",
        level: "expert",
        context: "Quickly adjusted strategies in response to market changes and emerging technologies",
      },
      {
        name: "Mentoring",
        level: "advanced",
        context: "Guided junior product managers and team members in skill development and career growth",
      },
    ],
    ai: [
      {
        name: "Prompt Engineering",
        level: "advanced",
        context: "Designed effective prompts for LLMs to generate high-quality, relevant outputs",
      },
      {
        name: "AI Product Integration",
        level: "advanced",
        context: "Incorporated AI capabilities into products to enhance user experience and functionality",
      },
      {
        name: "LLM Applications",
        level: "proficient",
        context: "Developed use cases and applications leveraging large language models",
      },
      {
        name: "AI Ethics",
        level: "advanced",
        context: "Ensured responsible AI implementation with focus on fairness, transparency, and privacy",
      },
      {
        name: "ChatGPT/Claude",
        level: "expert",
        context: "Extensive experience using and optimizing AI assistants for various business applications",
      },
      {
        name: "AI UX Design",
        level: "advanced",
        context: "Designed intuitive interfaces for AI-powered features and products",
      },
    ],
  }

  return (
    <div className="h-full flex flex-col text-gray-300 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex mb-4 border-b border-gray-700 pb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-1 text-xs font-mono rounded-t-md ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white`
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Proficiency level legend */}
        <div className="mb-6 bg-gray-800/30 p-3 rounded border border-gray-700">
          <h3 className="text-xs font-mono mb-2 text-cyan-400">// PROFICIENCY LEVELS</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(proficiencyLevels).map(([key, level]) => (
              <div key={key} className="flex items-start gap-2">
                <div className={`w-2 h-2 mt-1 rounded-full ${level.color}`}></div>
                <div>
                  <span className="text-xs font-medium">{level.label}</span>
                  <p className="text-xs text-gray-400">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills cards */}
        <div className="grid gap-4">
          {skills[activeTab as keyof typeof skills].map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-white">{skill.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{skill.context}</p>
                </div>
                <Badge
                  className={`${
                    proficiencyLevels[skill.level as keyof typeof proficiencyLevels].color
                  } text-white border-none`}
                >
                  {proficiencyLevels[skill.level as keyof typeof proficiencyLevels].label}
                </Badge>
              </div>

              {/* Skill bar visualization */}
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      skill.level === "expert"
                        ? "100%"
                        : skill.level === "advanced"
                          ? "80%"
                          : skill.level === "proficient"
                            ? "60%"
                            : "40%",
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    proficiencyLevels[skill.level as keyof typeof proficiencyLevels].color
                  }`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gray-800/30 p-4 rounded border border-gray-700"
        >
          <h3 className="text-xs font-mono mb-3 text-cyan-400">// ADDITIONAL SKILLS & TOOLS</h3>
          <div className="flex flex-wrap gap-2">
            {activeTab === "product" && (
              <>
                <Badge variant="outline" className="bg-gray-800/50">
                  JIRA
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Confluence
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Product Analytics
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  A/B Testing
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  User Stories
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Competitive Analysis
                </Badge>
              </>
            )}
            {activeTab === "tech" && (
              <>
                <Badge variant="outline" className="bg-gray-800/50">
                  HTML/CSS
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Git
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  REST APIs
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Vercel
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Firebase
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Responsive Design
                </Badge>
              </>
            )}
            {activeTab === "leadership" && (
              <>
                <Badge variant="outline" className="bg-gray-800/50">
                  Conflict Resolution
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Strategic Planning
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Team Building
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Public Speaking
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Negotiation
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Change Management
                </Badge>
              </>
            )}
            {activeTab === "ai" && (
              <>
                <Badge variant="outline" className="bg-gray-800/50">
                  OpenAI API
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Anthropic API
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  AI SDK
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  Vector Databases
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  RAG Systems
                </Badge>
                <Badge variant="outline" className="bg-gray-800/50">
                  AI Agents
                </Badge>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
