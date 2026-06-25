'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Eye,
  Sun,
  Shield,
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  Award,
  LucideIcon,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'grau' | 'solar';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
    bar: string;
    accent: string;
  };
  stats: {
    rating: number;
    models: string;
  };
  features: FeatureMetric[];
  cta: string;
}

const PRODUCT_DATA: Record<ProductId, ProductData> = {
  grau: {
    id: 'grau',
    label: 'De Grau',
    title: 'Visão Perfeita',
    subtitle: 'Óculos de Grau Premium',
    description:
      'Armações de alta precisão para todas as prescrições. Design sofisticado com lentes antirreflexo de última geração para máximo conforto visual.',
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=90&fit=crop',
    badge: 'Mais Vendido',
    colors: {
      gradient: 'from-[#0F172A] to-[#1E3A5F]',
      glow: 'bg-[#D4AF37]',
      ring: 'border-[#D4AF37]/30',
      bar: 'bg-[#D4AF37]',
      accent: '#D4AF37',
    },
    stats: { rating: 4.9, models: '200+' },
    features: [
      { label: 'Proteção UV', value: 100, icon: Shield },
      { label: 'Antirreflexo', value: 96, icon: Zap },
      { label: 'Conforto', value: 98, icon: Star },
      { label: 'Durabilidade', value: 94, icon: Award },
    ],
    cta: 'Ver Coleção de Grau',
  },
  solar: {
    id: 'solar',
    label: 'Solar',
    title: 'Estilo & Proteção',
    subtitle: 'Óculos Solar Premium',
    description:
      'Lentes polarizadas com proteção UV400 e frames exclusivos das marcas mais desejadas do mundo. Moda e saúde visual em perfeita harmonia.',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=90&fit=crop',
    badge: 'Nova Coleção',
    colors: {
      gradient: 'from-[#0F172A] to-[#1A1A2E]',
      glow: 'bg-amber-400',
      ring: 'border-amber-400/30',
      bar: 'bg-amber-400',
      accent: '#FBBF24',
    },
    stats: { rating: 4.8, models: '150+' },
    features: [
      { label: 'UV400', value: 100, icon: Sun },
      { label: 'Polarizado', value: 92, icon: Eye },
      { label: 'Estilo', value: 99, icon: Sparkles },
      { label: 'Leveza', value: 90, icon: Zap },
    ],
    cta: 'Ver Coleção Solar',
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 } as never,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 } as never,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20 } as never,
  },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

const imageVariants = (isLeft: boolean): Variants => ({
  initial: {
    opacity: 0,
    scale: 1.3,
    filter: 'blur(20px)',
    rotate: isLeft ? -15 : 15,
    x: isLeft ? -60 : 60,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    rotate: 0,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 22 } as never,
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    filter: 'blur(15px)',
    transition: { duration: 0.2 } as never,
  },
});

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? 'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.12) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.10) 0%, transparent 60%)',
      }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative shrink-0 flex flex-col items-center">
    {/* Rotating ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-12%] rounded-full border border-dashed ${data.colors.ring} opacity-40`}
    />

    {/* Glow */}
    <motion.div
      animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-40`}
    />

    {/* Image container */}
    <div className="relative h-72 w-72 md:h-[400px] md:w-[400px] rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-[#0A1020]/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          variants={imageVariants(isLeft)}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover rounded-full drop-shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Badge */}
    <motion.div layout="position" className="mt-6">
      <div
        className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border backdrop-blur-sm"
        style={{
          borderColor: `${data.colors.accent}33`,
          color: data.colors.accent,
          background: `${data.colors.accent}10`,
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ background: data.colors.accent }}
        />
        {data.badge} · {data.stats.models} modelos
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDir = isLeft ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass} w-full`}
    >
      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
        style={{ color: data.colors.accent }}
      >
        {data.subtitle}
      </motion.p>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {data.title}
      </motion.h1>

      {/* Stars */}
      <motion.div
        variants={itemVariants}
        className={`flex items-center gap-2 mb-5 ${isLeft ? '' : 'flex-row-reverse'}`}
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={data.colors.accent} color={data.colors.accent} />
          ))}
        </div>
        <span className="text-white/50 text-xs">{data.stats.rating} · 10k+ avaliações</span>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-white/50 mb-8 max-w-sm leading-relaxed text-sm md:text-base"
      >
        {data.description}
      </motion.p>

      {/* Feature bars */}
      <motion.div
        variants={itemVariants}
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-6 backdrop-blur-sm space-y-4"
      >
        {data.features.map((feature, idx) => (
          <div key={feature.label}>
            <div className={`flex items-center justify-between mb-2 text-xs ${flexDir}`}>
              <div className="flex items-center gap-1.5 text-white/60">
                <feature.icon size={13} style={{ color: data.colors.accent }} />
                <span>{feature.label}</span>
              </div>
              <span className="font-mono text-white/30">{feature.value}%</span>
            </div>
            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 0.9, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                className={`absolute top-0 bottom-0 ${data.colors.bar} opacity-90 rounded-full`}
              />
            </div>
          </div>
        ))}

        <div className={`pt-2 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40 hover:text-white/80 transition-colors group cursor-pointer"
          >
            <Eye size={12} />
            Ver especificações
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        className={`flex flex-col sm:flex-row gap-3 w-full ${isLeft ? '' : 'justify-end'}`}
      >
        <a
          href="https://wa.me/5511999990000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: data.colors.accent,
            color: '#0F172A',
            boxShadow: `0 8px 24px ${data.colors.accent}30`,
          }}
        >
          <MessageCircle size={15} />
          Agendar Consulta
        </a>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
        >
          {data.cta}
          <ArrowRight size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  onToggle,
}: {
  activeId: ProductId;
  onToggle: (id: ProductId) => void;
}) => {
  const options = Object.values(PRODUCT_DATA).map((p) => ({ id: p.id, label: p.label }));

  return (
    <div className="absolute bottom-10 inset-x-0 flex justify-center z-50">
      <motion.div
        layout
        className="flex items-center gap-1 p-1.5 rounded-full bg-[#0A0F1E]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.95 }}
            className="relative w-28 h-11 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="switcher-bg"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/5 shadow-inner border border-white/10"
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                activeId === opt.id ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-0.5 h-0.5 w-5 rounded-full"
                style={{ background: PRODUCT_DATA[opt.id].colors.accent }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function EyewearShowcase() {
  const [activeId, setActiveId] = useState<ProductId>('grau');

  const currentData = PRODUCT_DATA[activeId];
  const isLeft = activeId === 'grau';

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full bg-[#060C18] text-white overflow-hidden flex flex-col items-center justify-center pb-24"
    >
      <BackgroundGradient isLeft={isLeft} />

      <main className="relative z-10 w-full px-6 py-12 flex flex-col justify-center max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 lg:gap-36 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Visual column */}
          <ProductVisual data={currentData} isLeft={isLeft} />

          {/* Content column */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails key={activeId} data={currentData} isLeft={isLeft} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      <Switcher activeId={activeId} onToggle={setActiveId} />
    </section>
  );
}
