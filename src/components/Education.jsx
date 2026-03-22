import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';

const educationData = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Data Science & Big Data Analytics',
    college: 'Yenepoya University',
    period: '10/2023 – 08/2025',
    image: 'https://www.yenepoya.edu.in/img/contact.jpg',
    imageAlt: 'Yenepoya University campus',
    reverse: false,
  },
  {
    degree: 'Bachelor of Computer Science (B.Sc)',
    specialization: 'Computer Science',
    college: 'Kannur University',
    period: '06/2020 – 04/2023',
    image: 'https://kannur.kreap.co.in/user/pages/images/slides/K1.jpg',
    imageAlt: 'Kannur University campus',
    reverse: true,
  },
];

/* Bubble particles for the "rise" effect */
function BubbleParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 60, opacity: 0, scale: 0 }}
          whileInView={{ y: -20, opacity: [0, 0.5, 0], scale: [0, 1, 0.5] }}
          viewport={{ once: true }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
          className="absolute rounded-full border border-cyan-400/30"
          style={{
            width: 6 + Math.random() * 10,
            height: 6 + Math.random() * 10,
            left: `${15 + Math.random() * 70}%`,
            bottom: 0,
          }}
        />
      ))}
    </div>
  );
}

/* Single Education Card */
function EduCard({ edu, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const isReversed = edu.reverse;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Bubble burst on scroll */}
      <BubbleParticles />

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
        className={`flex flex-col ${
          isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
        } glass-strong rounded-2xl border border-cyan-500/10 overflow-hidden group`}
      >
        {/* ── Image Side ─────────────────────────────── */}
        <div className="relative md:w-2/5 h-60 md:h-72 overflow-hidden">
          <img
            src={edu.image}
            alt={edu.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Submerged glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500" />

          {/* College name on image (mobile) */}
          <div className="absolute bottom-4 left-4 md:hidden">
            <p className="text-lg font-display font-bold text-gradient-warm">
              {edu.college}
            </p>
          </div>
        </div>

        {/* ── Details Side ───────────────────────────── */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          {/* Period badge */}
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full w-fit mb-4">
            {edu.period}
          </span>

          {/* Icon + Degree */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/15 to-cyan-500/15 border border-purple-500/20 flex-shrink-0 mt-0.5">
              <HiAcademicCap className="text-purple-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-gradient transition-all duration-500">
                {edu.degree}
              </h3>
              {edu.specialization && (
                <p className="text-sm text-cyan-400 font-medium mt-0.5">
                  {edu.specialization}
                </p>
              )}
            </div>
          </div>

          {/* College (desktop) */}
          <p className="hidden md:block text-base font-display font-semibold text-gradient-warm mb-3 ml-[52px]">
            {edu.college}
          </p>

          {/* Subtle description */}
          <div className="ml-[52px]">
            <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-cyan-500/40 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Education <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
            Academic foundations that power my AI engineering expertise
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <EduCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
