"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function ProjectsPanel() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "AI-Enhanced Customer Portal",
      description:
        "Led the development of a customer portal that uses AI to provide personalized recommendations and improve user engagement. The platform resulted in a 35% increase in customer retention.",
      technologies: ["Product Management", "AI Integration", "UX/UI Design", "Agile"],
      image: "/placeholder.svg?key=tg2kr",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Real-time Network Monitor",
      description:
        "Developed a real-time network monitoring tool that uses machine learning to predict potential service disruptions before they occur. The system reduced downtime by 40% and improved customer satisfaction scores.",
      technologies: ["Product Strategy", "Data Visualization", "ML Implementation", "DevOps"],
      image: "/placeholder.svg?key=m1686",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Enterprise Knowledge Base",
      description:
        "Created a comprehensive knowledge management system with AI-powered search capabilities, enabling teams to find information 70% faster than before. The system includes automated content categorization and personalized learning paths.",
      technologies: ["Information Architecture", "Search Optimization", "Content Strategy", "Team Management"],
      image: "/placeholder.svg?key=nf9zq",
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <div className="h-full flex flex-col text-gray-300 overflow-hidden">
      <div className="flex items-center space-x-1 mb-4 overflow-x-auto hide-scrollbar">
        {projects.map((project, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`px-3 py-1 text-xs font-mono whitespace-nowrap rounded-md flex-shrink-0 ${
              activeProject === index
                ? `bg-gradient-to-r ${project.color} text-white`
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveProject(index)}
          >
            {project.title}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col"
        >
          <div className="relative w-full h-48 mb-4 overflow-hidden border border-gray-700 rounded">
            <Image
              src={projects[activeProject].image || "/placeholder.svg"}
              alt={projects[activeProject].title}
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent`}></div>
            <div className="absolute bottom-0 left-0 w-full p-3">
              <h3 className="text-white font-bold">{projects[activeProject].title}</h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar bg-black/20 border border-gray-700 rounded p-4">
            <div className="mb-4 font-mono">
              <div className="flex items-center mb-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${projects[activeProject].color} mr-2`}></div>
                <span className="text-sm font-bold">PROJECT DESCRIPTION</span>
              </div>
              <p className="text-sm text-gray-300 ml-4">{projects[activeProject].description}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2 font-mono">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${projects[activeProject].color} mr-2`}></div>
                <span className="text-sm font-bold">TECHNOLOGIES & SKILLS</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-4">
                {projects[activeProject].technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`inline-block px-2 py-1 text-xs bg-gradient-to-r ${projects[activeProject].color} bg-opacity-20 rounded`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center mb-2 font-mono">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${projects[activeProject].color} mr-2`}></div>
                <span className="text-sm font-bold">PROJECT DATA</span>
              </div>

              <div className="grid grid-cols-2 gap-2 ml-4 text-xs">
                <div className="bg-black/30 border border-gray-700 rounded p-2">
                  <span className="text-gray-400 block mb-1">Role:</span>
                  <span>Lead Product Manager</span>
                </div>
                <div className="bg-black/30 border border-gray-700 rounded p-2">
                  <span className="text-gray-400 block mb-1">Team Size:</span>
                  <span>6 members</span>
                </div>
                <div className="bg-black/30 border border-gray-700 rounded p-2">
                  <span className="text-gray-400 block mb-1">Duration:</span>
                  <span>8 months</span>
                </div>
                <div className="bg-black/30 border border-gray-700 rounded p-2">
                  <span className="text-gray-400 block mb-1">Status:</span>
                  <span className="text-green-400">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
