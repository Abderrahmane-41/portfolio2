"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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

  const skills = [
    "Product Strategy",
    "UX/UI",
    "Agile",
    "AI Innovation",
    "Team Leadership",
    "MVP Development",
    "User Research",
    "Roadmapping",
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-fuchsia-900/20 to-transparent opacity-30" />

      <div ref={ref} className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter">
            Sobre <span className="text-fuchsia-500">mí</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="space-y-4 text-gray-300 text-lg">
            <p>
              Product Manager con experiencia en desarrollo de productos digitales, estrategia, UX/UI y tecnología.
              Lidero equipos multidisciplinarios a lo largo del ciclo completo de vida del producto, desde la
              investigación hasta el lanzamiento.
            </p>
            <p>
              Actualmente enfocada en cómo la inteligencia artificial puede acelerar y potenciar el desarrollo de
              productos más accesibles, escalables y con impacto. Defensora del trabajo abierto y la cultura de build in
              public.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} className="bg-white/10 hover:bg-white/20 text-white border-none py-1.5 px-3 text-sm">
                {skill}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative h-[500px] hidden md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[400px] h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full opacity-20 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full rounded-full border border-white/20 flex items-center justify-center"
                >
                  <div className="w-4/5 h-4/5 rounded-full border border-white/30 flex items-center justify-center">
                    <div className="w-3/5 h-3/5 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-2/5 h-2/5 rounded-full border border-white/50"></div>
                    </div>
                  </div>
                </motion.div>

                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      x: Math.cos((index * Math.PI * 2) / skills.length) * 150,
                      y: Math.sin((index * Math.PI * 2) / skills.length) * 150,
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      x: { duration: 0 },
                      y: { duration: 0 },
                      opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
