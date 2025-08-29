"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: "agendado" | "confirmado" | "cancelado"
  price: string
}

interface UserAppointmentsProps {
  user: any
}

export default function UserAppointments({ user }: UserAppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")

  useEffect(() => {
    if (user) {
      const savedAppointments = localStorage.getItem(`appointments_${user.email}`)
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments))
      }
    }
  }, [user])

  const saveAppointments = (updatedAppointments: Appointment[]) => {
    setAppointments(updatedAppointments)
    localStorage.setItem(`appointments_${user.email}`, JSON.stringify(updatedAppointments))
  }

  const handleReschedule = (appointmentId: string) => {
    if (!newDate || !newTime) {
      alert("Por favor, selecione uma nova data e horário.")
      return
    }

    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, date: newDate, time: newTime, status: "agendado" as const } : apt,
    )

    saveAppointments(updatedAppointments)
    setEditingAppointment(null)
    setNewDate("")
    setNewTime("")
    alert("Agendamento remarcado com sucesso!")
  }

  const handleCancel = (appointmentId: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      const updatedAppointments = appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelado" as const } : apt,
      )

      saveAppointments(updatedAppointments)
      alert("Agendamento cancelado com sucesso!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800"
      case "agendado":
        return "bg-blue-100 text-blue-800"
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

  if (!user) {
    return (
      <section id="meus-agendamentos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Meus Agendamentos</h2>
          <p className="text-muted-foreground">Faça login para ver seus agendamentos.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="meus-agendamentos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Meus Agendamentos</h2>
          <p className="text-muted-foreground">Gerencie seus agendamentos de forma fácil e rápida</p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground mb-6">Você ainda não possui agendamentos.</p>
            <Button
              onClick={() => document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary hover:bg-primary/90"
            >
              Fazer Primeiro Agendamento
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{appointment.service}</CardTitle>
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>Valor: {appointment.price}</span>
                  </div>

                  {editingAppointment === appointment.id ? (
                    <div className="space-y-3 pt-4 border-t">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nova Data:</label>
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full p-2 border rounded-md"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Novo Horário:</label>
                        <select
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Selecione um horário</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleReschedule(appointment.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingAppointment(null)
                            setNewDate("")
                            setNewTime("")
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    appointment.status !== "cancelado" && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingAppointment(appointment.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Remarcar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(appointment.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                          Cancelar
                        </Button>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
