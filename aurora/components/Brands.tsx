"use client";

import { motion } from "framer-motion";

const brands = [
  "Ray-Ban",
  "Oakley",
  "Vogue",
  "Prada",
  "Giorgio Armani",
  "Carrera",
  "Versace",
  "Dolce & Gabbana",
  "Tom Ford",
  "Gucci",
  "Persol",
  "Silhouette",
];

export default function Brands() {
  const doubled = [...brands, ...brands];

  return (
    <section id="marcas" className="py-20 bg-[#F1F5F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Parceiros oficiais
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Marcas que Amamos
          </h2>
          <p className="text-[#475569] max-w-lg mx-auto">
            Revendedores autorizados das principais marcas de eyewear do mundo.
            Autenticidade garantida em cada produto.
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative flex overflow-hidden mb-4">
        <div className="animate-marquee flex shrink-0 gap-8 whitespace-nowrap">
          {doubled.map((brand, i) => (
            <div
              key={`a-${i}`}
              className="flex items-center gap-8 shrink-0"
            >
              <span className="font-display text-2xl font-semibold text-[#0F172A]/30 hover:text-[#D4AF37] transition-colors duration-300 cursor-default select-none">
                {brand}
              </span>
              <span className="text-[#D4AF37]/40 text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reversed */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex shrink-0 gap-8 whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite reverse" }}
        >
          {[...doubled].reverse().map((brand, i) => (
            <div
              key={`b-${i}`}
              className="flex items-center gap-8 shrink-0"
            >
              <span className="font-display text-xl font-medium text-[#0F172A]/20 hover:text-[#D4AF37]/60 transition-colors duration-300 cursor-default select-none">
                {brand}
              </span>
              <span className="text-[#D4AF37]/30 text-lg">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#F1F5F9] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#F1F5F9] to-transparent" />
    </section>
  );
}
