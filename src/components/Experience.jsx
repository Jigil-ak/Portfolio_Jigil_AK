import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import {
  FaBrain,
  FaCogs,
  FaChartLine,
  FaDatabase,
} from 'react-icons/fa';

const duties = [
  {
    icon: FaBrain,
    text: 'Built and deployed machine learning models using Python on real-world datasets, delivering data-driven insights.',
    color: 'text-cyan-400',
    glow: 'shadow-cyan-400/30',
  },
  {
    icon: FaCogs,
    text: 'Managed the end-to-end ML pipeline, including data preprocessing, EDA, feature engineering, model training, and evaluation.',
    color: 'text-blue-400',
    glow: 'shadow-blue-400/30',
  },
  {
    icon: FaChartLine,
    text: 'Applied and fine-tuned algorithms such as Logistic Regression, KNN, Decision Trees, and SVM for improved accuracy and performance.',
    color: 'text-purple-400',
    glow: 'shadow-purple-400/30',
  },
  {
    icon: FaDatabase,
    text: 'Leveraged SQL and Python to analyze data, uncover trends, and support decision-making through meaningful insights.',
    color: 'text-emerald-400',
    glow: 'shadow-emerald-400/30',
  },
];

export default function Experience() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto" />
        </motion.div>

        {/* 3D Floating Glassmorphism Pane */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
          className="relative"
        >
          {/* Bioluminescent glow pulse */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(6,182,212,0.08), 0 0 60px rgba(59,130,246,0.06)',
                '0 0 50px rgba(6,182,212,0.15), 0 0 100px rgba(59,130,246,0.1)',
                '0 0 30px rgba(6,182,212,0.08), 0 0 60px rgba(59,130,246,0.06)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
          />

          {/* Card */}
          <div className="glass-strong rounded-2xl border border-cyan-500/10 p-8 md:p-10 relative overflow-hidden">
            {/* Decorative glow orbs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/6 rounded-full blur-[60px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-500/20">
                  <HiBriefcase className="text-cyan-400" size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Machine Learning &amp; Data Science Intern
                  </h3>
                </div>
              </div>
              <span className="text-sm font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full w-fit">
                06/2025 – 09/2025
              </span>
            </div>

            {/* Duties with glowing icons */}
            <div className="relative z-10 space-y-5">
              {duties.map((duty, i) => {
                const Icon = duty.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 group"
                  >
                    {/* Glowing icon */}
                    <div
                      className={`flex-shrink-0 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40 shadow-lg ${duty.glow} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`${duty.color}`} size={16} />
                    </div>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed pt-0.5">
                      {duty.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
