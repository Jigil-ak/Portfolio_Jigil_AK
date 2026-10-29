import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import {
  FaBrain,
  FaCogs,
  FaChartLine,
  FaDatabase,
  FaRobot,
  FaUsers,
  FaLightbulb,
} from 'react-icons/fa';

const experiences = [
  {
    role: 'AI Engineer Intern',
    company: 'SwarmLens Pvt. Ltd',
    period: 'Aug 10, 2026 – Present',
    isCurrent: true,
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    gradient: 'from-cyan-500/15 to-blue-500/15',
    orbColor: 'bg-cyan-500/10',
    duties: [
      {
        icon: FaBrain,
        text: 'Contributed to the R&D team in AI/ML research, experimentation, and development of internal and client-oriented proof-of-concept solutions.',
        color: 'text-cyan-400',
        glow: 'shadow-cyan-400/30',
      },
      {
        icon: FaRobot,
        text: 'Worked on Generative AI and LLM-based applications, gaining practical experience with RAG, AI agents, multi-agent workflows, and AI orchestration.',
        color: 'text-blue-400',
        glow: 'shadow-blue-400/30',
      },
      {
        icon: FaDatabase,
        text: 'Contributed to AI solutions involving data processing, analysis, information retrieval, automated insights, and report generation across different business and industrial use cases.',
        color: 'text-teal-400',
        glow: 'shadow-teal-400/30',
      },
      {
        icon: FaUsers,
        text: 'Collaborated with cross-functional team members and Subject Matter Experts (SMEs) to understand requirements and support the development and integration of AI-based proof-of-concept solutions.',
        color: 'text-indigo-400',
        glow: 'shadow-indigo-400/30',
      },
      {
        icon: FaLightbulb,
        text: 'Participated in AI architecture discussions, technical experimentation, debugging, and knowledge-sharing activities while working with modern AI/ML technologies.',
        color: 'text-sky-400',
        glow: 'shadow-sky-400/30',
      },
    ],
  },
  {
    role: 'Machine Learning & Data Science Intern',
    company: 'Infotact Solutions',
    period: 'Jun 2025 – Sep 2025',
    isCurrent: false,
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
    gradient: 'from-violet-500/15 to-indigo-500/15',
    orbColor: 'bg-violet-500/10',
    duties: [
      {
        icon: FaBrain,
        text: 'Developed machine learning models using Python and Scikit-learn for predictive analytics.',
        color: 'text-violet-400',
        glow: 'shadow-violet-400/30',
      },
      {
        icon: FaCogs,
        text: 'Performed data preprocessing, feature engineering, and model validation across end-to-end ML pipelines.',
        color: 'text-purple-400',
        glow: 'shadow-purple-400/30',
      },
      {
        icon: FaChartLine,
        text: 'Conducted exploratory data analysis (EDA) and statistical analysis on structured datasets to extract actionable insights.',
        color: 'text-fuchsia-400',
        glow: 'shadow-fuchsia-400/30',
      },
      {
        icon: FaDatabase,
        text: 'Evaluated model performance using Accuracy, Precision, Recall, F1-score, and Confusion Matrix benchmarks.',
        color: 'text-emerald-400',
        glow: 'shadow-emerald-400/30',
      },
      {
        icon: FaUsers,
        text: 'Collaborated with team members to deliver AI solutions within project timelines using Git for version control and collaborative development.',
        color: 'text-blue-400',
        glow: 'shadow-blue-400/30',
      },
    ],
  },
];

function ExperienceCard({ exp, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="relative group"
    >
      {/* Bioluminescent pulse border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          boxShadow: exp.isCurrent
            ? '0 0 35px rgba(6,182,212,0.12), 0 0 70px rgba(59,130,246,0.08)'
            : '0 0 35px rgba(139,92,246,0.12), 0 0 70px rgba(99,102,241,0.08)',
        }}
      />

      {/* Card container */}
      <div
        className={`glass-strong rounded-2xl border ${exp.borderColor} p-6 md:p-8 relative overflow-hidden transition-all duration-300`}
      >
        {/* Glow orbs */}
        <div
          className={`absolute -top-16 -right-16 w-48 h-48 ${exp.orbColor} rounded-full blur-[80px] pointer-events-none`}
        />
        <div
          className={`absolute -bottom-12 -left-12 w-40 h-40 ${exp.orbColor} rounded-full blur-[60px] pointer-events-none`}
        />

        {/* Card Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 border-b border-slate-800/80 pb-5">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${exp.gradient} border ${exp.borderColor} flex-shrink-0 mt-0.5`}
            >
              <HiBriefcase className={exp.accentColor} size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-display font-bold text-white">
                  {exp.role}
                </h3>
                {exp.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <p className={`text-sm font-medium ${exp.accentColor} mt-1`}>
                {exp.company}
              </p>
            </div>
          </div>

          <span
            className={`text-xs md:text-sm font-mono border px-3.5 py-1.5 rounded-full w-fit self-start md:self-auto ${exp.badgeBg}`}
          >
            {exp.period}
          </span>
        </div>

        {/* Duties list */}
        <div className="relative z-10 space-y-4">
          {exp.duties.map((duty, i) => {
            const Icon = duty.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="flex items-start gap-3.5 group/duty"
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-lg bg-slate-800/70 border border-slate-700/50 shadow-md ${duty.glow} group-hover/duty:scale-110 transition-transform duration-300 mt-0.5`}
                >
                  <Icon className={duty.color} size={15} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {duty.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Professional industry experience in AI/ML research, Generative AI, and data science
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Experience Cards Stack */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp.company} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
