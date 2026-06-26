"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Produtos", href: "#produtos" },
  { label: "Marcas", href: "#marcas" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
];

const services = [
  "Óculos de Grau",
  "Óculos Solar",
  "Lentes de Contato",
  "Lentes Oftálmicas",
  "Exame de Vista Grátis",
  "Ajuste e Manutenção",
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F172A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="font-display text-2xl font-bold text-[#D4AF37]">
                AURORA
              </div>
              <div className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
                Óticas
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Referência em eyewear premium em São Paulo desde 2005. Saúde
              ocular e estilo em perfeita harmonia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] transition-all duration-200"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/50 hover:text-[#D4AF37] transition-all duration-200"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">
              Serviços
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-white/50 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                Av. Paulista, 1000, Bela Vista<br />
                São Paulo — SP, 01310-100
              </li>
              <li>
                <a
                  href="tel:+5511999990000"
                  className="flex items-center gap-3 text-white/50 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  <Phone size={14} className="text-[#D4AF37] shrink-0" />
                  (11) 99999-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@oticasaurora.com.br"
                  className="flex items-center gap-3 text-white/50 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  <Mail size={14} className="text-[#D4AF37] shrink-0" />
                  contato@oticasaurora.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Clock size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                Seg–Sex: 9h–20h<br />
                Sáb: 9h–18h<br />
                Dom: 10h–15h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Óticas Aurora. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs">
            CNPJ 00.000.000/0001-00 · CRO/SP 0000
          </p>
        </div>
      </div>
    </footer>
  );
}
