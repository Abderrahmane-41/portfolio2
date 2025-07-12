"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeExperience, setActiveExperience] = useState(0)

  const experiences = [
    {
      title: "Ssr Product Owner",
      company: "Insside",
      period: "Noviembre 2024 – Actualidad",
      description: [
        "Gestión del ciclo completo de vida de productos digitales (de discovery a MVP).",
        "Trabajo con equipos internos y proveedores externos en el desarrollo de soluciones.",
        "Análisis, documentación y refinamiento de requerimientos para asegurar entregas alineadas al negocio.",
        "Participación en la definición estratégica y ejecución de roadmaps para maximizar valor.",
      ],
      color: "from-fuchsia-500 to-purple-600",
    },
    {
      title: "Analista de Producto y Célula de Innovación",
      company: "Orbith",
      period: "Mayo 2023 – Octubre 2024",
      description: [
        "Lideré el desarrollo de nuevos productos digitales para segmentos residenciales e ISPs.",
        "Coordiné con equipos legales, comerciales y técnicos para asegurar implementaciones integrales.",
        "Analicé rentabilidad de servicios, definí MVPs y optimicé propuestas de valor.",
        "Lideré un equipo de 2 desarrolladores en proyectos de innovación y business intelligence, incorporando IA en etapas exploratorias.",
      ],
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Business Processes Associate Consultant",
      company: "SAP",
      period: "Mayo 2022 – Mayo 2023",
      description: [
        "Analicé sistemas de clientes y recomendé mejoras alineadas a buenas prácticas SAP.",
        "Desarrollé roadmaps para actualizaciones y migraciones.",
        "Asesoré sobre rendimiento y adopción de procesos.",
      ],
      color: "from-violet-500 to-indigo-600",
    },
    {
      title: "Product Owner",
      company: "SAP",
      period: "Noviembre 2020 – Mayo 2022",
      description: [
        "Definí la visión del producto y prioricé el backlog alineado con objetivos estratégicos.",
        "Diseñé user personas y escenarios de uso, y realicé pruebas de usuario.",
        "Conduje talleres de capacitación y trabajé con UI Designers para construir interfaces funcionales y atractivas.",
      ],
      color: "from-indigo-500 to-blue-600",
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
    <section id="experience" className="min-h-screen flex items-center py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />

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
            Experiencia <span className="text-purple-500">Profesional</span>
          </motion.h2>

          <div className="grid md:grid-cols-12 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-4">
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveExperience(index)}
                    whileHover={{ x: 5 }}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                      activeExperience === index
                        ? `bg-gradient-to-r ${exp.color} text-white`
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <ChevronRight
                      className={`mr-2 transition-opacity ${activeExperience === index ? "opacity-100" : "opacity-0"}`}
                    />
                    <div>
                      <h3 className="font-bold">{exp.title}</h3>
                      <p className={`text-sm ${activeExperience === index ? "text-white/80" : "text-white/50"}`}>
                        {exp.company}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-8">
              <div className="relative h-[400px]">
                <AnimatePresence mode="wait">
                  {experiences.map(
                    (exp, index) =>
                      activeExperience === index && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <div
                            className={`h-full rounded-xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative`}
                          >
                            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${exp.color}`}></div>
                            <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                            <div className="flex items-center text-white/70 mb-6">
                              <span>{exp.company}</span>
                              <span className="mx-2">•</span>
                              <span>{exp.period}</span>
                            </div>

                            <div className="space-y-4">
                              {exp.description.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                  className="flex items-start"
                                >
                                  <div
                                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${exp.color} mt-2 mr-3 flex-shrink-0`}
                                  ></div>
                                  <p className="text-white/80">{item}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
