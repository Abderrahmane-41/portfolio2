"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Ssr Product Owner",
    company: "Insside",
    period: "Noviembre 2024 – Actualidad",
    description: [
      "Gestión del ciclo completo de vida de productos digitales (de discovery a MVP).",
      "Trabajo con equipos internos y proveedores externos en el desarrollo de soluciones.",
      "Análisis, documentación y refinamiento de requerimientos para asegurar entregas alineadas al negocio.",
      "Participación en la definición estratégica y ejecución de roadmaps para maximizar valor.",
    ],
    skills: ["Product Management", "MVP", "Roadmapping", "Stakeholder Management"],
    color: "from-pink-500 to-purple-500",
  },
  {
    id: 2,
    title: "Analista de Producto y Célula de Innovación",
    company: "Orbith",
    period: "Mayo 2023 – Octubre 2024",
    description: [
      "Lideré el desarrollo de nuevos productos digitales para segmentos residenciales e ISPs.",
      "Coordiné con equipos legales, comerciales y técnicos para asegurar implementaciones integrales.",
      "Analicé rentabilidad de servicios, definí MVPs y optimicé propuestas de valor.",
      "Lideré un equipo de 2 desarrolladores en proyectos de innovación y business intelligence, incorporando IA en etapas exploratorias.",
    ],
    skills: ["Product Development", "Team Leadership", "Business Analysis", "AI Innovation"],
    color: "from-purple-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Business Processes Associate Consultant",
    company: "SAP",
    period: "Mayo 2022 – Mayo 2023",
    description: [
      "Analicé sistemas de clientes y recomendé mejoras alineadas a buenas prácticas SAP.",
      "Desarrollé roadmaps para actualizaciones y migraciones.",
      "Asesoré sobre rendimiento y adopción de procesos.",
    ],
    skills: ["Business Analysis", "Process Optimization", "Consulting", "SAP"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    title: "Product Owner",
    company: "SAP",
    period: "Noviembre 2020 – Mayo 2022",
    description: [
      "Definí la visión del producto y prioricé el backlog alineado con objetivos estratégicos.",
      "Diseñé user personas y escenarios de uso, y realicé pruebas de usuario.",
      "Conduje talleres de capacitación y trabajé con UI Designers para construir interfaces funcionales y atractivas.",
    ],
    skills: ["Product Ownership", "UX Research", "Backlog Management", "UI Design"],
    color: "from-blue-500 to-green-500",
  },
]

export default function ExperienceTimeline() {
  const [activeExperience, setActiveExperience] = useState(1)

  return (
    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="sticky top-20 space-y-4">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveExperience(exp.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                activeExperience === exp.id
                  ? `bg-gradient-to-r ${exp.color} text-white`
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
              }`}
            >
              <h3 className="font-bold">{exp.title}</h3>
              <p className={activeExperience === exp.id ? "text-white/80" : "text-gray-500"}>{exp.company}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-8">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeExperience === exp.id ? 1 : 0,
              y: activeExperience === exp.id ? 0 : 20,
              display: activeExperience === exp.id ? "block" : "none",
            }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800/30 border-gray-700 p-6 overflow-hidden relative">
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${exp.color}`}></div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold">{exp.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-gray-400">{exp.company}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{exp.period}</span>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {exp.description.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${exp.color} mt-2`}></div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill, index) => (
                  <Badge key={index} className={`bg-gradient-to-r ${exp.color} bg-opacity-20 text-white`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
