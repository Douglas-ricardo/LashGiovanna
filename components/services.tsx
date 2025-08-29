"use client"

import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    name: "Fio a Fio",
    description:
      "Técnica clássica que adiciona um fio sintético para cada fio natural, proporcionando um look natural e elegante.",
    price: "R$ 120",
    duration: "1h30",
    image: "/classic-eyelash-extension-fio-a-fio-technique-resu.png",
  },
  {
    id: 2,
    name: "Volume Brasileiro",
    description:
      "Técnica que cria leques de 2 a 4 fios por fio natural, oferecendo mais volume e densidade aos cílios.",
    price: "R$ 160",
    duration: "2h",
    image: "/brazilian-volume-eyelash-extension-technique-resul.png",
  },
  {
    id: 3,
    name: "Manutenção",
    description: "Reposição dos fios que caíram naturalmente, mantendo o efeito e prolongando a durabilidade.",
    price: "R$ 80",
    duration: "1h",
    image: "/eyelash-extension-maintenance-touch-up-service.png",
  },
  {
    id: 4,
    name: "Remoção",
    description: "Remoção segura e profissional dos cílios postiços sem danificar os fios naturais.",
    price: "R$ 40",
    duration: "30min",
    image: "/safe-eyelash-extension-removal-process.png",
  },
]

export default function Services() {
  const scrollToBooking = () => {
    const element = document.getElementById("agendamento")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços especializados em extensão de cílios, utilizando as melhores
            técnicas e produtos do mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card bg-card rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">{service.name}</h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">⏱️ {service.duration}</span>
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={scrollToBooking}
                >
                  Agendar Serviço
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Não sabe qual serviço escolher?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Entre em contato conosco e faremos uma avaliação personalizada para recomendar o melhor tratamento para
            você.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            onClick={() => {
              const element = document.getElementById("contato")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  )
}
