"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Designer Gráfica",
    text: "A Aurora mudou minha relação com óculos de grau. Antes eu tinha vergonha de usar, agora é meu acessório favorito. O atendimento é excepcional — me ajudaram a encontrar o modelo perfeito para o meu rosto.",
    rating: 5,
    initials: "MC",
    color: "#D4AF37",
  },
  {
    name: "Rafael Mendonça",
    role: "Arquiteto",
    text: "Fui indicado por um amigo e não me arrependo. Comprei um Ray-Ban e uma armação de grau Prada. Preço justo, produto autêntico e entregaram em menos de 24h. Com certeza voltarei.",
    rating: 5,
    initials: "RM",
    color: "#B8960C",
  },
  {
    name: "Juliana Ferreira",
    role: "Médica",
    text: "Uso lentes de contato há anos e a Óticas Aurora tem os melhores preços e variedade que já encontrei. A consulta com a optometrista foi muito completa e profissional.",
    rating: 5,
    initials: "JF",
    color: "#1E293B",
  },
  {
    name: "Carlos Eduardo",
    role: "Executivo",
    text: "Presenteei minha esposa com uma armação Giorgio Armani e ela amou. A equipe da Aurora me ajudou a escolher o modelo ideal sem nenhuma pressão. Experiência de compra nota 10.",
    rating: 5,
    initials: "CE",
    color: "#475569",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="depoimentos" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            O que nossos clientes dizem
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-10 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" className="text-[#D4AF37]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-white/40 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[#D4AF37]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-all duration-200"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
