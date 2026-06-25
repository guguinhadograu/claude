"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-[#0F172A] px-8 py-16 md:px-16 text-center"
        >
          {/* Background decor */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#D4AF37]/10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-[#D4AF37]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Fale conosco
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Pronto para enxergar{" "}
              <span className="text-[#D4AF37]">melhor?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Agende sua consulta gratuita pelo WhatsApp ou ligue agora. Nossa
              equipe está pronta para ajudar você a encontrar o par ideal.
            </p>

            {/* Info row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/50 text-sm">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-[#D4AF37]" />
                Seg–Sáb · 9h–20h
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[#D4AF37]" />
                Av. Paulista, 1000 · SP
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37]" />
                (11) 99999-0000
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511999990000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </a>
              <a
                href="tel:+5511999990000"
                className="flex items-center gap-2.5 border border-white/20 hover:border-[#D4AF37]/60 text-white/80 hover:text-[#D4AF37] px-8 py-4 rounded-full text-sm font-medium transition-all duration-200"
              >
                <Phone size={16} />
                Ligar agora
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
