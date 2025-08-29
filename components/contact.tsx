"use client"

export default function Contact() {
  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Entre em <span className="text-primary">Contato</span>
            </h2>
            <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estamos aqui para esclarecer suas dúvidas. Para agendamentos, utilize nosso sistema de reservas acima.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Informações de Contato</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground">(11) 91234-5678</p>
                    <p className="text-sm text-muted-foreground">Atendimento: Seg à Sáb, 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">E-mail</h4>
                    <p className="text-muted-foreground">contato@studiorosacilios.com</p>
                    <p className="text-sm text-muted-foreground">Resposta em até 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Endereço</h4>
                    <p className="text-muted-foreground">
                      Rua Exemplo, 123
                      <br />
                      São Paulo - SP
                      <br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary text-xl">📷</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Instagram</h4>
                    <p className="text-muted-foreground">@studiorosacilios</p>
                    <p className="text-sm text-muted-foreground">Acompanhe nossos trabalhos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours and Map */}
            <div className="space-y-8">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h4 className="text-lg font-bold text-foreground mb-4">Horário de Funcionamento</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segunda à Sexta:</span>
                    <span className="font-semibold">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábado:</span>
                    <span className="font-semibold">9h às 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingo:</span>
                    <span className="font-semibold">Fechado</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-muted-foreground">
                    Mapa do Google
                    <br />
                    <span className="text-sm">Rua Exemplo, 123 - São Paulo - SP</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
