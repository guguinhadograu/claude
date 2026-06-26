"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7 },
  }),
};

export default function Hero() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]"
    >
      {/* Background — Liquid Glass iridescent orbs (400-600ms fluid transitions) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/12 rounded-full blur-[120px]" style={{ transition: "all 500ms cubic-bezier(0.25,0.46,0.45,0.94)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(184,150,12,0.05) 60%, transparent 100%)" }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(232,208,128,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E293B]/50 rounded-full blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 glass border border-[#D4AF37]/30 text-[#D4AF37] text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8"
        >
          <Star size={10} fill="#D4AF37" />
          Eyewear Premium desde 2005
          <Star size={10} fill="#D4AF37" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6"
        >
          Enxergue o mundo{" "}
          <span className="animate-shimmer">com estilo</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Óculos de grau, solar e lentes de contato com atendimento
          personalizado. Exames gratuitos, entrega rápida e as marcas que você
          ama.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/5511999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E8D080] text-[#0F172A] font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5"
          >
            Agendar Consulta
            <ArrowRight size={16} />
          </a>
          <button
            onClick={() => handleClick("#produtos")}
            className="flex items-center gap-2 border border-white/20 hover:border-[#D4AF37]/60 text-white/80 hover:text-[#D4AF37] px-8 py-4 rounded-full text-base transition-all duration-200"
          >
            Ver Coleção
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: "20+", label: "Anos de experiência" },
            { value: "10k+", label: "Clientes satisfeitos" },
            { value: "50+", label: "Marcas premium" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[#D4AF37]">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Role
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
      </motion.div>
    </section>
  );
}
