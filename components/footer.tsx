"use client"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Studio Rosa Cílios</h3>
                <p className="text-sm text-background/70">Beleza & Elegância</p>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed mb-4">
              Especialistas em extensão de cílios com mais de 3 anos de experiência. Realçamos sua beleza natural com
              técnicas modernas e produtos premium.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/studiorosacilios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors"
              >
                📷
              </a>
              <a
                href="https://wa.me/5511912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors"
              >
                📱
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("inicio")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("sobre")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("servicos")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("agendamento")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Agendamento
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span className="text-background/80">(11) 91234-5678</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span className="text-background/80">contato@studiorosacilios.com</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span className="text-background/80">
                  Rua Exemplo, 123
                  <br />
                  São Paulo - SP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm mb-4 md:mb-0">
            © 2024 Studio Rosa Cílios. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-background/80 hover:text-background transition-colors"
          >
            <span className="text-sm">Voltar ao topo</span>
            <span className="text-lg">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
