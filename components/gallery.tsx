"use client"

import { useState } from "react"

const galleryImages = [
  {
    id: 1,
    src: "/beautiful-eyelash-extension-before-and-after-resul.png",
    alt: "Resultado Fio a Fio - Antes e Depois",
    category: "Fio a Fio",
  },
  {
    id: 2,
    src: "/volume-brasileiro-eyelash-extension-result-2.png",
    alt: "Volume Brasileiro - Resultado",
    category: "Volume Brasileiro",
  },
  {
    id: 3,
    src: "/classic-eyelash-extension-natural-look-result-3.png",
    alt: "Look Natural - Extensão Clássica",
    category: "Fio a Fio",
  },
  {
    id: 4,
    src: "/dramatic-volume-eyelash-extension-result-4.png",
    alt: "Volume Dramático - Resultado",
    category: "Volume Brasileiro",
  },
  {
    id: 5,
    src: "/eyelash-extension-maintenance-result-5.png",
    alt: "Manutenção - Resultado",
    category: "Manutenção",
  },
  {
    id: 6,
    src: "/elegant-eyelash-extension-result-6.png",
    alt: "Look Elegante - Extensão",
    category: "Fio a Fio",
  },
  {
    id: 7,
    src: "/full-volume-eyelash-extension-result-7.png",
    alt: "Volume Completo - Resultado",
    category: "Volume Brasileiro",
  },
  {
    id: 8,
    src: "/natural-eyelash-extension-result-8.png",
    alt: "Look Natural - Resultado",
    category: "Fio a Fio",
  },
]

const categories = ["Todos", "Fio a Fio", "Volume Brasileiro", "Manutenção"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const filteredImages =
    selectedCategory === "Todos" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openModal = (image: any) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="trabalhos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Trabalhos</span>
          </h2>
          <div className="w-20 h-1 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Confira alguns dos nossos trabalhos realizados e inspire-se com os resultados incríveis que podemos alcançar
            juntas.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-card-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-image relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👁️</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">{image.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4" onClick={closeModal}>
            <div
              className="modal-content bg-background rounded-lg max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedImage.src || "/placeholder.svg"} alt={selectedImage.alt} className="w-full h-auto" />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{selectedImage.alt}</h3>
                <p className="text-muted-foreground">Categoria: {selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">O que nossas clientes dizem</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                text: "Simplesmente perfeito! Os cílios ficaram naturais e duradouros. Super recomendo!",
                rating: 5,
              },
              {
                name: "Ana Costa",
                text: "Profissional incrível! Cuidado e atenção em cada detalhe. Voltarei sempre!",
                rating: 5,
              },
              {
                name: "Julia Santos",
                text: "Resultado superou minhas expectativas. Acordar já maquiada é maravilhoso!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-card-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="text-primary font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
