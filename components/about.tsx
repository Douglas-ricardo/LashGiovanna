export default function About() {
  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src="/professional-eyelash-artist-working-on-client-in-e.png"
              alt="Sobre o Studio Rosa Cílios"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Sobre o <span className="text-primary">Studio Rosa</span>
              </h2>
              <div className="w-20 h-1 bg-secondary rounded-full mb-6" />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Com mais de 3 anos de experiência no mercado de beleza, o Studio Rosa Cílios nasceu da paixão por realçar
              a beleza natural de cada mulher através do olhar.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Especializada em técnicas modernas de extensão de cílios, utilizo apenas produtos premium e certificados,
              garantindo segurança, durabilidade e resultados excepcionais para cada cliente.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Proporcionar uma experiência única de beleza e bem-estar, destacando a individualidade de cada cliente
                com técnicas personalizadas e atendimento diferenciado.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">Qualidade</div>
                <p className="text-sm text-muted-foreground">Produtos premium certificados</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">Experiência</div>
                <p className="text-sm text-muted-foreground">Técnicas modernas e seguras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
