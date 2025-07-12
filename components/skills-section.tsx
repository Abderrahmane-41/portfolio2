"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("product")

  const skillCategories = [
    {
      id: "product",
      name: "Producto y UX",
      color: "from-fuchsia-500 to-purple-500",
      skills: [
        { name: "Desarrollo de producto", level: 95 },
        { name: "Definición de MVPs", level: 90 },
        { name: "Estrategia y roadmapping", level: 85 },
        { name: "Research y testing", level: 88 },
        { name: "Agile (Scrum/Kanban)", level: 92 },
      ],
    },
    {
      id: "leadership",
      name: "Comunicación y Liderazgo",
      color: "from-purple-500 to-violet-500",
      skills: [
        { name: "Gestión de stakeholders", level: 88 },
        { name: "Liderazgo de equipos", level: 85 },
        { name: "Facilitación de workshops", level: 90 },
        { name: "Comunicación efectiva", level: 92 },
      ],
    },
    {
      id: "ai",
      name: "IA e Innovación",
      color: "from-violet-500 to-indigo-500",
      skills: [
        { name: "Ingeniería de prompts", level: 85 },
        { name: "Ideación de features con IA", level: 90 },
        { name: "Automatización de diseño", level: 80 },
        { name: "ChatGPT y herramientas IA", level: 95 },
      ],
    },
    {
      id: "tech",
      name: "Tecnología",
      color: "from-indigo-500 to-blue-500",
      skills: [
        { name: "React / Next.js", level: 75 },
        { name: "JavaScript / TypeScript", level: 70 },
        { name: "SQL / MongoDB", level: 65 },
        { name: "Figma / Herramientas de diseño", level: 85 },
        { name: "AWS / Cloud", level: 60 },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_70%)]" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 text-center"
          >
            Mis <span className="text-indigo-500">Habilidades</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-16">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="relative h-[400px]">
            <AnimatePresence mode="wait">
              {skillCategories.map(
                (category) =>
                  activeCategory === category.id && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                          {category.skills.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <div className="flex justify-between mb-2">
                                <span className="text-white/90 font-medium">{skill.name}</span>
                                <span className="text-white/50">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                  className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="relative hidden md:block">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="relative w-[300px] h-[300px]"
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-full opacity-20 blur-3xl`}
                              />

                              <svg width="300" height="300" viewBox="0 0 300 300">
                                <g transform="translate(150,150)">
                                  <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    d={`M ${category.skills
                                      .map((skill, i) => {
                                        const angle = (i / category.skills.length) * Math.PI * 2 - Math.PI / 2
                                        const radius = (skill.level / 100) * 120
                                        return `${i === 0 ? "M" : "L"} ${Math.cos(angle) * radius},${Math.sin(angle) * radius}`
                                      })
                                      .join(" ")} Z`}
                                    fill="none"
                                    stroke={`url(#gradient-${category.id})`}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <defs>
                                    <linearGradient id={`gradient-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop
                                        offset="0%"
                                        stopColor={
                                          category.id === "product"
                                            ? "#ec4899"
                                            : category.id === "leadership"
                                              ? "#a855f7"
                                              : category.id === "ai"
                                                ? "#8b5cf6"
                                                : "#6366f1"
                                        }
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={
                                          category.id === "product"
                                            ? "#a855f7"
                                            : category.id === "leadership"
                                              ? "#8b5cf6"
                                              : category.id === "ai"
                                                ? "#6366f1"
                                                : "#3b82f6"
                                        }
                                      />
                                    </linearGradient>
                                  </defs>

                                  {category.skills.map((skill, i) => {
                                    const angle = (i / category.skills.length) * Math.PI * 2 - Math.PI / 2
                                    const radius = (skill.level / 100) * 120
                                    return (
                                      <motion.circle
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 * i }}
                                        cx={Math.cos(angle) * radius}
                                        cy={Math.sin(angle) * radius}
                                        r="4"
                                        fill="white"
                                      />
                                    )
                                  })}
                                </g>
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
