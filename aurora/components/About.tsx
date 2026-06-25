"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const milestones = [
  "Fundada em 2005 com uma única loja em São Paulo",
  "Expansão para 5 unidades na Grande São Paulo em 2012",
  "Parceria com mais de 50 marcas internacionais premium",
  "Mais de 10.000 clientes atendidos anualmente",
  "Equipe de 8 optometristas e 20 consultores especializados",
];

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-2xl bg-[#0F172A] aspect-[4/5] max-w-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A]" />
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#D4AF37]/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#D4AF37]/15" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <span className="font-display text-7xl font-bold text-[#D4AF37]">
                  20
                </span>
                <span className="text-white/80 text-lg mt-1">anos de</span>
                <span className="font-display text-3xl text-white font-semibold">
                  Excelência
                </span>
                <div className="mt-6 w-12 h-0.5 bg-[#D4AF37]/40" />
                <p className="text-white/40 text-sm mt-4 leading-relaxed">
                  Transformando vidas através de uma visão clara e
                  um estilo inconfundível
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 glass-dark rounded-xl px-6 py-4 shadow-xl"
            >
              <div className="font-display text-3xl font-bold text-[#D4AF37]">98%</div>
              <div className="text-white/60 text-xs mt-0.5">satisfação dos clientes</div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Nossa história
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">
              Paixão pela visão,{" "}
              <span className="text-[#D4AF37]">arte</span> pelo estilo
            </h2>
            <p className="text-[#475569] leading-relaxed mb-6">
              A Óticas Aurora nasceu do sonho de dois optometristas apaixonados
              por unir saúde ocular e moda. Em 2005, abrimos nossa primeira loja
              com a missão de oferecer o melhor em eyewear com um atendimento
              que vai além do esperado.
            </p>
            <p className="text-[#475569] leading-relaxed mb-8">
              Hoje, somos referência em São Paulo, com uma equipe altamente
              qualificada e um portfólio com as marcas mais desejadas do mundo.
              Nossa filosofia: cada cliente merece ver o mundo com clareza e
              expressar sua personalidade com autenticidade.
            </p>

            {/* Milestones */}
            <ul className="space-y-3">
              {milestones.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[#D4AF37] mt-0.5 shrink-0"
                  />
                  <span className="text-[#334155] text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
