import { motion } from 'framer-motion';

/* ───────────────────────────────────────────────
   Deep-Sea Skills Stream
   • 5 infinite-looping marquee rows
   • Alternating direction (L→R / R→L)
   • Glassmorphism cards with bioluminescent glow
   • GPU-accelerated, 60fps smooth
   ─────────────────────────────────────────────── */

// ── Logo resolver (CDN + fallback) ──────────
function logoUrl(name) {
  const map = {
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    SQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    'Machine Learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'Deep Learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    NLP: 'https://api.iconify.design/carbon/string-text.svg?color=%2306b6d4',
    'Generative AI': 'https://api.iconify.design/simple-icons/openai.svg?color=%2300d4aa',
    LLM: 'https://api.iconify.design/simple-icons/openai.svg?color=%238b5cf6',
    RAG: 'https://api.iconify.design/carbon/data-enrichment.svg?color=%2306b6d4',
    TensorFlow: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    PyTorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    Keras: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    Pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    NumPy: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    OpenCV: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    YOLOv5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    'Hugging Face': 'https://api.iconify.design/simple-icons/huggingface.svg?color=%23fb923c',
    NLTK: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    Flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    Streamlit: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
    'REST API': 'https://api.iconify.design/carbon/api.svg?color=%2306b6d4',
    'Model Deployment': 'https://api.iconify.design/carbon/deployment-pattern.svg?color=%2310b981',
    MLOps: 'https://api.iconify.design/carbon/machine-learning-model.svg?color=%238b5cf6',
    'CI/CD': 'https://api.iconify.design/carbon/continuous-deployment.svg?color=%23f59e0b',
    'Data Analysis': 'https://api.iconify.design/carbon/chart-multitype.svg?color=%2306b6d4',
    EDA: 'https://api.iconify.design/carbon/explore.svg?color=%2310b981',
    'Feature Engineering': 'https://api.iconify.design/carbon/settings-adjust.svg?color=%23f59e0b',
    'Predictive Analytics': 'https://api.iconify.design/carbon/analytics.svg?color=%238b5cf6',
    'Statistical Modeling': 'https://api.iconify.design/carbon/chart-scatter.svg?color=%23ec4899',
    'Data Visualization': 'https://api.iconify.design/carbon/chart-area.svg?color=%2306b6d4',
    Matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
    Seaborn: 'https://api.iconify.design/carbon/chart-line-data.svg?color=%236366f1',
    'Power BI': 'https://api.iconify.design/simple-icons/powerbi.svg?color=%23f2c811',
    MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    SQLite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
    Cassandra: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg',
    DBMS: 'https://api.iconify.design/carbon/data-base.svg?color=%2306b6d4',
    'Data Structures': 'https://api.iconify.design/carbon/tree-view.svg?color=%2310b981',
    OOP: 'https://api.iconify.design/carbon/object-storage.svg?color=%238b5cf6',
    SDLC: 'https://api.iconify.design/carbon/flow.svg?color=%23f59e0b',
    Agile: 'https://api.iconify.design/carbon/task-approved.svg?color=%2310b981',
    Debugging: 'https://api.iconify.design/carbon/debug.svg?color=%23ef4444',
    Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    Excel: 'https://api.iconify.design/vscode-icons/file-type-excel.svg',
    Hadoop: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg',
    AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Prompt Engineering': 'https://api.iconify.design/simple-icons/openai.svg?color=%2306b6d4',
    PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    ChatGPT: 'https://api.iconify.design/simple-icons/openai.svg?color=%2310b981',
    OpenAI: 'https://api.iconify.design/simple-icons/openai.svg?color=%23ffffff',
    Gemini: 'https://api.iconify.design/simple-icons/googlegemini.svg?color=%234285f4',
    Claude: 'https://api.iconify.design/simple-icons/anthropic.svg?color=%23d4a574',
    DeepSeek: 'https://api.iconify.design/carbon/machine-learning.svg?color=%234f46e5',
    Perplexity: 'https://api.iconify.design/carbon/search-advanced.svg?color=%2320b2aa',
  };
  return map[name] || 'https://api.iconify.design/carbon/cube.svg?color=%2394a3b8';
}

// ── Row data ────────────────────────────────
const rows = [
  {
    skills: ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'NLP', 'Generative AI', 'LLM', 'RAG', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy'],
    direction: 'left',
    speed: 25,
  },
  {
    skills: ['OpenCV', 'YOLOv5', 'Hugging Face', 'NLTK', 'Flask', 'Streamlit', 'REST API', 'Model Deployment', 'MLOps', 'CI/CD', 'Data Analysis', 'EDA', 'Feature Engineering', 'Predictive Analytics', 'Statistical Modeling'],
    direction: 'right',
    speed: 28,
  },
  {
    skills: ['Data Visualization', 'Matplotlib', 'Seaborn', 'Power BI', 'MySQL', 'SQLite', 'Cassandra', 'DBMS', 'Data Structures', 'OOP', 'SDLC', 'Agile', 'Debugging', 'Git', 'Jupyter Notebook'],
    direction: 'left',
    speed: 26,
  },
  {
    skills: ['VS Code', 'Excel', 'Hadoop', 'AWS', 'Prompt Engineering', 'PHP', 'C', 'HTML', 'ChatGPT', 'OpenAI', 'Gemini', 'Claude', 'DeepSeek', 'Perplexity'],
    direction: 'right',
    speed: 30,
  },
];

// ── Single Skill Card ───────────────────────
function SkillCard({ name }) {
  return (
    <div className="group flex-shrink-0 mx-1.5 md:mx-2">
      <div
        className="flex flex-col items-center justify-center w-[6rem] h-24 md:w-[7rem] md:h-28 rounded-2xl
                    bg-[rgba(0,18,25,0.5)] backdrop-blur-xl border border-white/[0.06]
                    shadow-[0_0_20px_rgba(6,182,212,0.06)]
                    hover:shadow-[0_0_35px_rgba(6,182,212,0.25),0_0_80px_rgba(59,130,246,0.12)]
                    hover:border-cyan-400/20 hover:scale-[1.12]
                    transition-all duration-500 ease-out cursor-default
                    will-change-transform"
      >
        <img
          src={logoUrl(name)}
          alt={name}
          className="w-8 h-8 md:w-[2.25rem] md:h-[2.25rem] object-contain mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />
        <span className="text-[9px] md:text-[10px] text-slate-400 group-hover:text-white font-medium text-center leading-tight px-1 transition-colors duration-300">
          {name}
        </span>
      </div>
    </div>
  );
}

// ── Marquee Row ─────────────────────────────
function MarqueeRow({ skills, direction, speed }) {
  // Duplicate skills 3x to ensure seamless loop
  const tripled = [...skills, ...skills, ...skills];

  // Total width estimate for one set
  // Desktop: w-[7rem] (112px) + mx-2 (16px) = 128px per card
  // Mobile: w-[6rem] (96px) + mx-1.5 (12px) = 108px per card -> we use max
  const setWidth = skills.length * 128;

  const isLeft = direction === 'left';

  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#001219] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#001219] to-transparent pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: isLeft ? [0, -setWidth] : [-setWidth, 0],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{ willChange: 'transform' }}
      >
        {tripled.map((skill, i) => (
          <SkillCard key={`${skill}-${i}`} name={skill} />
        ))}
      </motion.div>
    </div>
  );
}

// ── Main Component ──────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Skills <span className="text-gradient">Stream</span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
          Technologies flowing through my deep-sea development ecosystem
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto mt-4" />
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-3 md:space-y-4 relative z-[1]">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <MarqueeRow
              skills={row.skills}
              direction={row.direction}
              speed={row.speed}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
