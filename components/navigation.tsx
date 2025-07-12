"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import Link from "next/link"

interface NavigationProps {
  currentSection: string
}

export function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { id: "intro", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "experience", label: "Experiencia" },
    { id: "skills", label: "Habilidades" },
    { id: "education", label: "Educación" },
    { id: "contact", label: "Contacto" },
  ]

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:vijulibe@gmail.com", label: "Email" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 4.5, duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 mix-blend-difference transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold tracking-tighter"
          >
            <Link href="#intro" className="hover:opacity-70 transition-opacity">
              JH
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm uppercase tracking-widest hover:opacity-70 transition-all ${
                  currentSection === item.id ? "font-bold" : "font-light"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="hover:opacity-70 transition-opacity"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`} />
            <X className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center space-y-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl uppercase tracking-widest hover:opacity-70 transition-all ${
                    currentSection === item.id ? "font-bold" : "font-light"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-6 mt-12">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
