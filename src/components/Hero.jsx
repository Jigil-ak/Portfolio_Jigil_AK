import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: -x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const stats = [
    { value: 'AI/ML', label: 'Specialization' },
    { value: 'GenAI & NLP', label: 'Focus' },
    { value: 'MCA', label: 'Degree' },
    { value: '5+', label: 'Projects' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        {/* Badge */}
        {/* Title Group with floating effect */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-blue/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-300 tracking-widest uppercase">
              Open to Opportunities
            </span>
          </motion.div>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4"
          >
            <span className="text-white">I am </span>
            <span className="text-gradient">Jigil A K</span>
          </motion.h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-slate-300 font-medium mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        >
          AI/ML Engineer &amp; Data Scientist
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="min-h-[60px] md:h-12 flex items-center justify-center mb-10"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400/80 mr-3 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
            {'>'}
          </span>
          <TypeAnimation
            sequence={[
              'Data Scientist', 2000,
              'AI/ML Engineer', 2000,
              'GenAI Developer', 2000,
              'Data Analyst', 2000,
              'Machine Learning Engineer', 2000,
            ]}
            speed={50}
            deletionSpeed={40}
            repeat={Infinity}
            className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-cyan-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          />
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-1.5">
            Data Scientist and AI Engineer specializing in Machine Learning,
            NLP, and Generative AI, building real-world AI solutions.
          </p>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Focused on designing scalable, end-to-end intelligent applications
            using Python and modern AI technologies.
          </p>
        </motion.div>

        {/* Stats Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-strong rounded-xl border border-white/10 px-4 py-3 text-center hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-shadow duration-500"
            >
              <p className="text-lg md:text-xl font-display font-bold text-gradient leading-tight">
                {stat.value}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:scale-105 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl glass border border-slate-600/30 text-slate-300 font-semibold text-sm hover:border-accent-blue/30 hover:text-white hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 text-slate-500"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <HiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
