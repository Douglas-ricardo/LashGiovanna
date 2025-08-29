"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react"

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: "agendado" | "confirmado" | "cancelado"
  price: number
}

interface ClientDashboardProps {
  user: any
  onLogout: () => void
  onBackToHome: () => void
}

export default function ClientDashboard({ user, onLogout, onBackToHome }: ClientDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null)

  // Form states
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const services = [
    { name: "Extensão de Cílios Clássica", price: 120, duration: "2h" },
    { name: "Extensão de Cílios Volume", price: 150, duration: "2h30" },
    { name: "Extensão de Cílios Mega Volume", price: 180, duration: "3h" },
    { name: "Manutenção de Cílios", price: 80, duration: "1h30" },
    { name: "Remoção de Cílios", price: 50, duration: "1h" },
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem(`appointments_${user.email}`)
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [user.email])

  const saveAppointments = (newAppointments: Appointment[]) => {
    localStorage.setItem(`appointments_${user.email}`, JSON.stringify(newAppointments))
    setAppointments(newAppointments)
  }

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Por favor, preencha todos os campos")
      return
    }

    const service = services.find((s) => s.name === selectedService)
    if (!service) return

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      status: "agendado",
      price: service.price,
    }

    const updatedAppointments = [...appointments, newAppointment]
    saveAppointments(updatedAppointments)

    // Reset form
    setSelectedService("")
    setSelectedDate("")
    setSelectedTime("")
    setShowBookingForm(false)

    alert("Agendamento realizado com sucesso! Entraremos em contato para confirmar.")
  }

  const handleReschedule = (appointmentId: string) => {
    const appointment = appointments.find((a) => a.id === appointmentId)
    if (!appointment) return

    setSelectedService(appointment.service)
    setSelectedDate(appointment.date)
    setSelectedTime(appointment.time)
    setEditingAppointment(appointmentId)
    setShowBookingForm(true)
  }

  const handleUpdateAppointment = () => {
    if (!selectedService || !selectedDate || !selectedTime || !editingAppointment) {
      alert("Por favor, preencha todos os campos")
      return
    }

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === editingAppointment
        ? { ...appointment, service: selectedService, date: selectedDate, time: selectedTime }
        : appointment,
    )

    saveAppointments(updatedAppointments)

    // Reset form
    setSelectedService("")
    setSelectedDate("")
    setSelectedTime("")
    setShowBookingForm(false)
    setEditingAppointment(null)

    alert("Agendamento atualizado com sucesso!")
  }

  const handleCancelAppointment = (appointmentId: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: "cancelado" as const } : appointment,
      )
      saveAppointments(updatedAppointments)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-yellow-100 text-yellow-800"
      case "confirmado":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBackToHome}>
                ← Voltar ao Site
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Minha Área</h1>
                <p className="text-gray-600">Gerencie seus agendamentos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Meus Dados</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowBookingForm(true)} className="w-full mb-3">
                  Novo Agendamento
                </Button>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Rua das Flores, 123 - Centro</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Seg-Sex: 9h-18h | Sáb: 9h-16h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Meus Agendamentos</CardTitle>
                <CardDescription>Visualize, reagende ou cancele seus procedimentos</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Você ainda não possui agendamentos</p>
                    <Button onClick={() => setShowBookingForm(true)}>Fazer Primeiro Agendamento</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-primary mt-2">R$ {appointment.price}</p>
                          </div>
                          {appointment.status !== "cancelado" && (
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                                Remarcar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Cancelar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>{editingAppointment ? "Remarcar Agendamento" : "Novo Agendamento"}</CardTitle>
                <CardDescription>
                  Preencha os dados para {editingAppointment ? "remarcar" : "agendar"} seu procedimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Serviço</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name} - R$ {service.price} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Horário</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowBookingForm(false)
                      setEditingAppointment(null)
                      setSelectedService("")
                      setSelectedDate("")
                      setSelectedTime("")
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={editingAppointment ? handleUpdateAppointment : handleBooking} className="flex-1">
                    {editingAppointment ? "Atualizar" : "Agendar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
