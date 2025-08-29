"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById("agendamento")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById("servicos")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            Realce sua <span className="text-accent font-extrabold">beleza natural</span>
          </h1>

          <p
            className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed animate-fade-in-up font-medium"
            style={{ animationDelay: "0.2s" }}
          >
            Extensão de cílios profissional com técnicas modernas e produtos de alta qualidade. Desperte seu olhar com
            elegância e sofisticação.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              onClick={scrollToBooking}
            >
              Agendar Agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent"
              onClick={scrollToServices}
            >
              Ver Serviços
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">500+</div>
              <div className="text-sm text-foreground/80 font-medium">Clientes Satisfeitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">3+</div>
              <div className="text-sm text-foreground/80 font-medium">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">100%</div>
              <div className="text-sm text-foreground/80 font-medium">Produtos Premium</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
