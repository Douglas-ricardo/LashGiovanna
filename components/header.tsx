"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  user: any
  onLogin: () => void
  onLogout: () => void
}

export default function Header({ user, onLogin, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Studio Rosa</h1>
              <p className="text-sm text-muted-foreground">Cílios</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("trabalhos")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Trabalhos
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Olá, {user.name}</span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Sair
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={onLogin}>
                Entrar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground mt-1 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground mt-1 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("trabalhos")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Trabalhos
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Contato
              </button>

              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-muted-foreground">Olá, {user.name}</span>
                    <Button variant="outline" size="sm" onClick={onLogout} className="w-fit bg-transparent">
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={onLogin} className="w-fit bg-transparent">
                    Entrar
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
