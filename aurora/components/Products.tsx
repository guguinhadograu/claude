"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Óculos de Grau",
    description: "Armações modernas para todas as prescrições",
    gradient: "from-[#0F172A] to-[#1E293B]",
    accent: "Masculino · Feminino · Infantil",
    count: "200+ modelos",
  },
  {
    title: "Óculos Solar",
    description: "Proteção UV400 com design sofisticado",
    gradient: "from-[#1E293B] to-[#334155]",
    accent: "Polarizado · Esportivo · Fashion",
    count: "150+ modelos",
  },
  {
    title: "Lentes de Contato",
    description: "Conforto e nitidez para o dia a dia",
    gradient: "from-[#0F172A] via-[#1a2744] to-[#1E293B]",
    accent: "Diária · Mensal · Colorida",
    count: "50+ tipos",
  },
  {
    title: "Lentes Oftálmicas",
    description: "Tecnologia de ponta para sua visão",
    gradient: "from-[#1E293B] to-[#0F172A]",
    accent: "Antirreflexo · Fotossensível · Blue-cut",
    count: "30+ opções",
  },
];

export default function Products() {
  return (
    <section id="produtos" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Nossa coleção
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Produtos & Serviços
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Do casual ao sofisticado — encontre o eyewear perfeito para cada
            momento da sua vida.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 min-h-[220px] flex flex-col justify-between border border-white/5 hover:border-[#D4AF37]/30 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-black/40`}
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/25 transition-colors duration-500" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-colors duration-500" />

              <div>
                <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase">
                  {cat.accent}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 mb-2">
                  {cat.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-[#D4AF37] text-sm font-medium">
                  {cat.count}
                </span>
                <div className="w-9 h-9 rounded-full border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300">
                  <ArrowRight
                    size={15}
                    className="text-[#D4AF37] group-hover:text-[#0F172A] transition-colors duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/5511999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 text-[#D4AF37] px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
          >
            Ver catálogo completo
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
