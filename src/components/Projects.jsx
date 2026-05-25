import { motion } from 'framer-motion';
import { HiCode, HiChip, HiDatabase, HiShoppingCart, HiBookOpen, HiChartBar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Autonomous Multi-Agent BI Platform',
    subtitle: 'GenAI & Agentic AI',
    description:
      'Multi-agent AI platform generating business strategies, competitor analysis, pricing plans, and growth roadmaps. Features AI agents for research, planning, critique, QA, and memory management using Gemini LLMs with FastAPI backend and real-time Streamlit dashboard with workflow visualization.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'Gemini API', 'ChromaDB', 'LangChain'],
    icon: HiDatabase,
    gradient: 'from-cyan-500/20 to-indigo-500/20',
    accentColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/30',
    github: 'https://github.com/Jigil-ak/autonomous-multi-agent-bi-platform.git',
  },
  {
    title: 'Medical Chatbot',
    subtitle: 'LLM & RAG',
    description:
      'Built with LangChain, Pinecone, and FLAN-T5 for context-aware medical knowledge retrieval. Implements RAG pipeline for accurate, grounded responses deployed on Flask and AWS.',
    tags: ['LangChain', 'Pinecone', 'FLAN-T5', 'RAG', 'Flask', 'AWS'],
    icon: HiChip,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/30',
    github: 'https://github.com/Jigil-ak/Medical-Chatbot-with-LLMs-LangChain-Pinecone-Flask-AWS.git',
  },
  {
    title: 'Dental X-ray AI',
    subtitle: 'Computer Vision',
    description:
      'CNN-based YOLOv5 model to detect caries and classify tooth types with real-time bounding boxes. Trained on custom-annotated dental radiograph dataset with enhanced image analysis.',
    tags: ['YOLOv5', 'CNN', 'OpenCV', 'Python', 'Deep Learning'],
    icon: HiCode,
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/30',
    github: 'https://github.com/Jigil-ak/Enhanced-Dental-Image-Analysis',
  },
  {
    title: 'Smart Shopping App',
    subtitle: 'Hybrid Web/Android',
    description:
      'Hybrid Web/Android app using QR code authentication and automated billing. Full-stack solution with Flask backend and MySQL database.',
    tags: ['Python', 'Flask', 'MySQL', 'Android Studio', 'QR Code'],
    icon: HiShoppingCart,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/30',
    github: null,
  },
  {
    title: 'Book Recommendation Engine',
    subtitle: 'ML System',
    description:
      'Collaborative Filtering using KNN for personalized book suggestions. Analyzes user reading patterns to deliver accurate recommendations.',
    tags: ['KNN', 'Scikit-learn', 'Pandas', 'Python', 'ML'],
    icon: HiBookOpen,
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: 'text-amber-400',
    borderHover: 'hover:border-amber-500/30',
    github: 'https://github.com/Jigil-ak/Book_Recomendation_System.git',
  },
  {
    title: 'Workforce Productivity Analysis',
    subtitle: 'Data Analytics',
    description:
      '1,300+ record analysis using SQL/Python with Power BI interactive dashboards. Uncovered key productivity patterns and trends.',
    tags: ['SQL', 'Python', 'Power BI', 'Pandas', 'Analytics'],
    icon: HiChartBar,
    gradient: 'from-rose-500/20 to-red-500/20',
    accentColor: 'text-rose-400',
    borderHover: 'hover:border-rose-500/30',
    github: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            High-impact projects showcasing end-to-end AI engineering
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className={`project-card glass rounded-2xl overflow-hidden border border-slate-700/30 ${project.borderHover} group flex flex-col`}
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} flex-shrink-0`}>
                      <Icon className={project.accentColor} size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className={`text-xs font-mono ${project.accentColor} mt-0.5`}>
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-mono font-medium bg-slate-800/60 text-slate-400 rounded-md border border-slate-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Link */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-xs font-mono font-medium ${project.accentColor} hover:text-white border border-slate-700/40 hover:border-current rounded-lg px-3 py-2 transition-all duration-300 w-fit bg-slate-800/40 hover:bg-slate-700/40 mt-auto`}
                    >
                      <FaGithub size={14} />
                      View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
