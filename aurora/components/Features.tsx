"use client";

import { motion } from "framer-motion";
import { Eye, Stethoscope, Truck, Shield, Sparkles, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Exame Visual Gratuito",
    description:
      "Contamos com optometristas experientes para exames de vista gratuitos, garantindo a prescrição ideal para você.",
  },
  {
    icon: Stethoscope,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente recebe atenção exclusiva de nossos consultores especializados em moda e saúde ocular.",
  },
  {
    icon: Truck,
    title: "Entrega Expressa",
    description:
      "Seus óculos prontos em até 24h para lentes simples. Entregamos em toda a Grande São Paulo sem custo adicional.",
  },
  {
    icon: Shield,
    title: "Garantia Total",
    description:
      "12 meses de garantia em todos os produtos. Manutenção preventiva gratuita e suporte pós-venda completo.",
  },
  {
    icon: Sparkles,
    title: "Marcas Exclusivas",
    description:
      "Parceiros oficiais das principais marcas de eyewear do mundo: Ray-Ban, Oakley, Prada, Vogue e muito mais.",
  },
  {
    icon: HeartHandshake,
    title: "Convênios e Planos",
    description:
      "Aceitamos os principais convênios médicos e planos de saúde. Parcelamos em até 12x sem juros.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Features() {
  return (
    <section id="diferenciais" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Por que nos escolher
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto text-lg leading-relaxed">
            Mais de duas décadas de experiência nos ensinaram que cada detalhe
            importa quando se trata da sua visão e estilo.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group bg-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-[400ms] ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                  <Icon size={22} className="text-[#D4AF37] group-hover:text-[#0F172A] transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#475569] leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
