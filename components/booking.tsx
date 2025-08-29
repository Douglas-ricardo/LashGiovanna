"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const services = [
  { id: "fio-a-fio", name: "Fio a Fio", price: 120, duration: 90 },
  { id: "volume-brasileiro", name: "Volume Brasileiro", price: 160, duration: 120 },
  { id: "manutencao", name: "Manutenção", price: 80, duration: 60 },
  { id: "remocao", name: "Remoção", price: 40, duration: 30 },
]

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"]

interface BookingProps {
  user: any
  onLoginRequired: () => void
}

export default function Booking({ user, onLoginRequired }: BookingProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save booking to localStorage (simulate database)
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const newBooking = {
        id: Date.now(),
        userId: user.id,
        ...formData,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      bookings.push(newBooking)
      localStorage.setItem("bookings", JSON.stringify(bookings))

      setSubmitMessage("Agendamento realizado com sucesso! Entraremos em contato para confirmar.")
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      })
    } catch (error) {
      setSubmitMessage("Erro ao realizar agendamento. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedService = services.find((s) => s.id === formData.service)

  if (!user) {
    return (
      <section id="agendamento" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="text-primary">Agende</span> seu Horário
              </h2>
              <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Para agendar seu horário, você precisa ter uma conta em nosso sistema.
              </p>
            </div>

            {/* Login Required Message */}
            <div className="max-w-md mx-auto">
              <div className="bg-card p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">Cadastro Necessário</h3>
                <p className="text-muted-foreground mb-6">
                  Para garantir a melhor experiência e acompanhar seus agendamentos, é necessário criar uma conta.
                </p>
                <Button
                  onClick={onLoginRequired}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                >
                  Fazer Login / Cadastro
                </Button>
              </div>

              {/* Benefits of Registration */}
              <div className="mt-8 bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold text-foreground mb-4">Vantagens do Cadastro:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Acompanhe seus agendamentos
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Remarque ou cancele facilmente
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Histórico de serviços realizados
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Agendamentos mais rápidos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary">Agende</span> seu Horário
            </h2>
            <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Preencha o formulário abaixo para agendar seu horário. Entraremos em contato para confirmar a
              disponibilidade e finalizar o agendamento.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Dados do Agendamento</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 91234-5678"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="service">Serviço Desejado *</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-input bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - R$ {service.price} ({service.duration}min)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data Preferida *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário Preferido *</Label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full px-3 py-2 border border-input bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecione um horário</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-input bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Alguma observação especial ou dúvida?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
                >
                  {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
                </Button>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes("sucesso")
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Booking Summary & Info */}
            <div className="space-y-8">
              {/* Service Summary */}
              {selectedService && (
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-foreground mb-4">Resumo do Serviço</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="font-semibold">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="font-semibold">{selectedService.duration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-bold text-primary text-lg">R$ {selectedService.price}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Info */}
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-bold text-card-foreground mb-4">Informações Importantes</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Chegue 10 minutos antes do horário agendado
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Evite usar máscara de cílios 24h antes do procedimento
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Remova lentes de contato antes do atendimento
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Cancelamentos devem ser feitos com 24h de antecedência
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-primary/10 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-foreground mb-4">Dúvidas? Entre em Contato</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary mr-3">📱</span>
                    <span className="text-foreground">(11) 91234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-3">📧</span>
                    <span className="text-foreground">contato@studiorosacilios.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-3">📍</span>
                    <span className="text-foreground">Rua Exemplo, 123 - São Paulo - SP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
