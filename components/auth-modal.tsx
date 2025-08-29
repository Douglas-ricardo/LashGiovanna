"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthModalProps {
  onClose: () => void
  onLogin: (user: any) => void
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isLogin) {
        // Login logic
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

        if (user) {
          onLogin(user)
        } else {
          setError("E-mail ou senha incorretos.")
        }
      } else {
        // Register logic
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const existingUser = users.find((u: any) => u.email === formData.email)

        if (existingUser) {
          setError("E-mail já cadastrado.")
        } else {
          const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            createdAt: new Date().toISOString(),
          }
          users.push(newUser)
          localStorage.setItem("users", JSON.stringify(users))
          onLogin(newUser)
        }
      }
    } catch (error) {
      setError("Erro no servidor. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
      <div className="modal-content bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">{isLogin ? "Entrar" : "Criar Conta"}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="auth-name">Nome Completo *</Label>
                  <Input
                    id="auth-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="auth-phone">WhatsApp</Label>
                  <Input
                    id="auth-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 91234-5678"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="auth-email">E-mail *</Label>
              <Input
                id="auth-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="auth-password">Senha *</Label>
              <Input
                id="auth-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="mt-1"
              />
              {!isLogin && <p className="text-xs text-muted-foreground mt-1">Mínimo 6 caracteres</p>}
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
            >
              {isSubmitting ? (isLogin ? "Entrando..." : "Criando conta...") : isLogin ? "Entrar" : "Criar Conta"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">{isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}</p>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setFormData({ name: "", email: "", password: "", phone: "" })
              }}
              className="text-primary hover:text-primary/80 font-semibold text-sm mt-1"
            >
              {isLogin ? "Criar conta" : "Fazer login"}
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Vantagens de ter uma conta:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Agendamentos mais rápidos</li>
              <li>• Histórico de serviços</li>
              <li>• Lembretes de manutenção</li>
              <li>• Ofertas exclusivas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
