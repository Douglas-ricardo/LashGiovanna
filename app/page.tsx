"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import Booking from "@/components/booking"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AuthModal from "@/components/auth-modal"
import FloatingBookingButton from "@/components/floating-booking-button"
import UserAppointments from "@/components/user-appointments"
import ClientDashboard from "@/components/client-dashboard"

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("studioUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("studioUser", JSON.stringify(userData))
    setIsAuthModalOpen(false)
    setShowDashboard(true)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("studioUser")
    setShowDashboard(false)
  }

  if (user && showDashboard) {
    return <ClientDashboard user={user} onLogout={handleLogout} onBackToHome={() => setShowDashboard(false)} />
  }

  return (
    <main className="min-h-screen">
      <Header user={user} onLogin={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Booking user={user} onLoginRequired={() => setIsAuthModalOpen(true)} />
      <UserAppointments user={user} />
      <Contact />
      <Footer />
      <FloatingBookingButton />

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />}
    </main>
  )
}
