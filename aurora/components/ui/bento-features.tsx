"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Stethoscope, Truck, Shield, Sparkles, HeartHandshake } from "lucide-react";

function FeaturesSection() {
  const spiralRef = useRef<HTMLDivElement>(null);

  const [cfg] = useState({
    points: 800,
    dotRadius: 1.6,
    duration: 3,
    gradient: "none",
    color: "#D4AF37",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.35,
    background: "transparent",
  });

  const gradients = useMemo(() => ({ none: [] as string[] }), []);

  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 620;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.color);
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  const features = [
    {
      icon: Eye,
      title: "Exame Visual Gratuito",
      blurb: "Optometristas experientes realizam exames completos sem custo. Prescrição precisa para óculos de grau e lentes de contato.",
      meta: "Saúde",
    },
    {
      icon: Stethoscope,
      title: "Atendimento Personalizado",
      blurb: "Consultores especializados em moda e saúde ocular para encontrar o eyewear ideal para o seu rosto e estilo de vida.",
      meta: "Serviço",
    },
    {
      icon: Truck,
      title: "Entrega Expressa 24h",
      blurb: "Óculos prontos em até 24h para lentes simples. Entregamos em toda a Grande São Paulo sem custo adicional.",
      meta: "Logística",
    },
    {
      icon: Shield,
      title: "Garantia Total de 12 Meses",
      blurb: "Cobertura completa em todos os produtos com manutenção preventiva gratuita e suporte pós-venda.",
      meta: "Garantia",
    },
    {
      icon: Sparkles,
      title: "Marcas Premium Exclusivas",
      blurb: "Revendedores autorizados: Ray-Ban, Oakley, Prada, Vogue, Armani e Carrera. Autenticidade garantida.",
      meta: "Marcas",
    },
    {
      icon: HeartHandshake,
      title: "Convênios & Parcelamento",
      blurb: "Aceitamos os principais convênios médicos e parcelamos em até 12x sem juros no cartão de crédito.",
      meta: "Pagamento",
    },
  ];

  const spans = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-6 md:row-span-1",
  ];

  return (
    <div id="diferenciais" className="w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #060C18 40%, #0F172A 100%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-6 py-24 text-white">
        {/* Background Spiral — gold tinted */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
          style={{ mixBlendMode: "screen" }}
        >
          <div ref={spiralRef} />
        </div>

        <header className="relative mb-10 flex flex-col items-start border-b border-[#D4AF37]/20 pb-6">
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Por que nos escolher
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
            Nossos Diferenciais
          </h2>
          <p className="mt-3 text-base text-white/60 max-w-xl">
            Mais de 20 anos unindo saúde ocular, tecnologia e estilo para oferecer a melhor experiência em eyewear.
          </p>
        </header>

        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6 auto-rows-[minmax(130px,auto)]">
          {features.map((f, i) => (
            <BentoCard
              key={i}
              span={spans[i]}
              title={f.title}
              blurb={f.blurb}
              meta={f.meta}
              icon={f.icon}
              featured={i === 0}
            />
          ))}
        </div>

        <footer className="relative mt-12 border-t border-white/10 pt-6 text-xs text-white/30">
          Óticas Aurora — Saúde visual com sofisticação desde 2005.
        </footer>
      </section>
    </div>
  );
}

function BentoCard({
  span = "",
  title,
  blurb,
  meta,
  icon: Icon,
  featured = false,
}: {
  span?: string;
  title: string;
  blurb: string;
  meta: string;
  icon: React.ElementType;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06] cursor-default ${span}`}
    >
      <header className="mb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
          <Icon size={16} className="text-[#D4AF37]" />
        </div>
        <h3 className={`font-semibold leading-tight ${featured ? "text-xl md:text-2xl font-display" : "text-base md:text-lg"}`}>
          {title}
        </h3>
        {meta && (
          <span className="ml-auto rounded-full border border-[#D4AF37]/20 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-[#D4AF37]/70 shrink-0">
            {meta}
          </span>
        )}
      </header>
      <p className={`text-white/60 leading-relaxed max-w-prose ${featured ? "text-base" : "text-sm"}`}>
        {blurb}
      </p>

      {/* Gold hover glow corner */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
}

export default FeaturesSection;
export { FeaturesSection };
