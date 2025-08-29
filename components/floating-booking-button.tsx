"use client"

export default function FloatingBookingButton() {
  const scrollToBooking = () => {
    const element = document.getElementById("agendamento")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={scrollToBooking}
      className="floating-booking-btn bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg"
      aria-label="Agendar horário"
    >
      📅 Agendar
    </button>
  )
}
