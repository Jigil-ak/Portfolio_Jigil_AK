import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiStatusOnline,
  HiClock,
  HiDownload,
  HiSparkles,
} from 'react-icons/hi';
import { FaLinkedinIn, FaGithub, FaKaggle } from 'react-icons/fa';

const contactDetails = [
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Kannur, Kerala, India',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+91 8086129924',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: HiMail,
    label: 'Email',
    value: 'jigil.ak2003@gmail.com',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/jigilak/',
    label: 'LinkedIn',
    hoverColor: 'hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/Jigil-ak',
    label: 'GitHub',
    hoverColor: 'hover:bg-slate-400/20 hover:text-slate-300 hover:border-slate-400/30',
  },
  {
    icon: FaKaggle,
    href: 'https://www.kaggle.com/akjigil',
    label: 'Kaggle',
    hoverColor: 'hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30',
  },
];

export default function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [auraPos, setAuraPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Tilt calculation
    const tiltX = (y - 0.5) * 15;
    const tiltY = -(x - 0.5) * 15;
    
    setTilt({ x: tiltX, y: tiltY });
    setAuraPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setAuraPos({ x: 50, y: 50 });
  }, []);

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto" />
        </motion.div>

        {/* Main Content: Photo + Info */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
          {/* ── Square Profile Photo with 3D Aura ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                y: [0, -8, 0] // Floating effect combined with 3D tilt
              }}
              transition={{
                rotateX: { type: 'spring', stiffness: 300, damping: 20 },
                rotateY: { type: 'spring', stiffness: 300, damping: 20 },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative"
            >
              {/* Dynamic Outer Aura with Gentle Pulse */}
              <motion.div 
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 rounded-[2.5rem] blur-2xl transition-all duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${auraPos.x}% ${auraPos.y}%, rgba(56,189,248,0.7), rgba(168,85,247,0.4), transparent 60%)`
                }}
              />

              {/* Glass frame — SQUARE with rounded corners */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl glass-strong border border-white/10 p-1.5 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
                <img
                  src="/blacksuit_cleaned.png"
                  alt="Jigil A K"
                  className="w-full h-full rounded-xl object-cover pointer-events-none"
                />
              </div>

              {/* Status dot */}
              <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-dark-900 shadow-lg shadow-emerald-400/40" />
            </motion.div>
          </motion.div>

          {/* ── Text & Details ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-accent-blue/10">
                <HiSparkles className="text-accent-blue" size={18} />
              </div>
              <span className="text-sm font-semibold text-accent-blue uppercase tracking-wider">
                Who I Am
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8">
              I&apos;m an AI/ML Engineer and Data Scientist with an MCA
              specialization in Data Science and Big Data Analytics, focused on
              transforming complex data into intelligent, scalable solutions. I
              have hands-on experience across Machine Learning, Deep Learning,
              NLP, and Generative AI, with a strong emphasis on building
              practical, real-world systems. I specialize in developing
              end-to-end AI applications—from RAG-based LLM solutions to
              computer vision and recommendation systems—covering the full
              pipeline from data processing and model development to deployment.
            </p>

            {/* ── Contact & Status Grid ────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {contactDetails.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass border border-slate-700/30"
                  >
                    <div className={`p-1.5 rounded-lg ${d.bg}`}>
                      <Icon className={d.color} size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 leading-none mb-0.5">
                        {d.label}
                      </p>
                      <p className="text-sm text-slate-200 font-medium truncate">
                        {d.value}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Status & Availability badges */}
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <HiStatusOnline size={15} />
                  Open to Work
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue/10 border border-accent-blue/40 text-accent-blue text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                  <HiClock size={15} />
                  Available Immediately
                </span>
              </div>
            </div>

            {/* ── Action Row: Socials + CV ──────────────── */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-700/30">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`p-3 rounded-xl glass border border-slate-700/30 text-slate-400 transition-all duration-300 ${link.hoverColor}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}

              {/* Download CV */}
              <a
                href="https://drive.google.com/file/d/10fPH6sW0Nlbe6J4EC380UAxC6dde3hqy/view"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 hover:scale-105 transition-all duration-300"
              >
                <HiDownload size={16} />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
