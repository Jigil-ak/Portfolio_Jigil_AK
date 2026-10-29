import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCode, HiChip, HiDatabase, HiShoppingCart, HiBookOpen, HiChartBar, HiLightningBolt, HiX, HiGlobe } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Multi-Agent AI Travel Planner',
    subtitle: 'Agentic AI & MCP',
    description:
      'Architected a production-grade multi-agent travel planning system using LangGraph and MCP, orchestrating 6 specialized agents with dynamic routing, real-time data from 3 live APIs, Human-in-the-Loop approval flows, and PostgreSQL-backed checkpointing for resilient async pipelines.',
    tags: ['LangGraph', 'MCP', 'Python', 'PostgreSQL', 'AviationStack', 'Tavily', 'OpenWeatherMap', 'FastMCP'],
    icon: HiGlobe,
    gradient: 'from-sky-500/20 to-teal-500/20',
    accentColor: 'text-sky-400',
    borderHover: 'hover:border-sky-500/30',
    github: null,
    details: {
      overview:
        'A production-grade multi-agent AI travel planner built on LangGraph and the Model Context Protocol (MCP). The system orchestrates 6 specialized agents — Supervisor, Flight, Hotel, Weather, Budget, and Itinerary — with intelligent dynamic routing that eliminates redundant agent calls. It integrates 3 live external data sources and supports Human-in-the-Loop approval cycles with persistent async checkpointing via PostgreSQL.',
      architecture: [
        'Supervisor Agent applies an Input Guardrail pattern to classify and validate incoming prompts, then extracts structured trip constraints (destination, duration, budget, travel style) via LLM-powered JSON parsing.',
        'Dynamic Routing Engine selectively activates only the relevant specialist agents based on parsed constraints, eliminating redundant LLM invocations across the pipeline.',
        'Flight Agent connects to AviationStack via MCP stdio/uvx transport to retrieve live flight schedules and pricing in real time.',
        'Weather Agent queries a custom FastMCP OpenWeatherMap server to fetch destination forecasts and climate data beyond LLM training cutoff.',
        'Hotel & Budget Agents use Tavily web search via MCP streamable_http to surface current accommodation options and cost estimates.',
        'Itinerary Agent synthesizes all upstream agent outputs into a coherent, day-by-day travel plan tailored to user constraints.',
        'Human-in-the-Loop (HITL) layer leverages LangGraph\'s native interrupt() mechanism to pause the pipeline, present the draft plan for user review, and resume seamlessly after approval.',
        'PostgresSaver checkpointing persists full pipeline state to PostgreSQL, enabling resilient async approval cycles with zero data loss across interruptions.',
      ],
      keyAchievements: [
        'Architected a 6-agent LangGraph system with MCP-based tool orchestration, achieving dynamic routing that eliminates redundant agent calls and reduces unnecessary LLM invocations.',
        'Engineered a Supervisor + Input Guardrail pattern that classifies user prompts and extracts structured trip constraints via LLM-powered JSON parsing, ensuring only relevant agents are activated.',
        'Integrated 3 real-time MCP data sources (AviationStack, Tavily, custom FastMCP OpenWeatherMap) to provide live external context beyond model training data.',
        'Implemented Human-in-the-Loop approval flows using LangGraph\'s interrupt() mechanism with PostgreSQL-backed checkpointing, enabling the pipeline to pause and resume seamlessly across async cycles.',
      ],
    },
  },
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
    details: {
      overview: 'An advanced multi-agent business intelligence platform designed to conduct deep research, competitor analysis, pricing optimization, and growth strategy generation with minimal human intervention.',
      architecture: [
        'Research Agent runs targeted search queries using Google Search/Web Scraping to gather raw market/competitor intelligence.',
        'Planning Agent structures raw data into strategic frameworks (SWOT, Porter\'s Five Forces).',
        'Critique Agent evaluates the structures and identifies blind spots, gaps, or logic flaws.',
        'QA Agent reviews final formatting, correctness, and readability.',
        'Memory Manager maintains a semantic context index using ChromaDB vector database across execution cycles.',
        'Dashboard: Fast Streamlit interface displaying real-time agent message queues and visual workspace trees.'
      ],
      keyAchievements: [
        'Designed a custom multi-agent synchronization and collaboration flow using FastAPI backends and Streamlit views.',
        'Implemented vector-based semantic memory allowing agents to recall past critiques and reviews, reducing hallucination by 40%.',
        'Integrated real-time execution tracking, showing users what each agent is thinking and doing in a live timeline.'
      ]
    }
  },
  {
    title: 'Mini Agentic RAG Application',
    subtitle: 'Agentic AI & RAG',
    description:
      'Production-ready Agentic RAG system with a single AI agent that dynamically routes queries to a Milvus Knowledge Base, Web Search, or Calculator. Features Gemini → Groq LLM fallback, PDF/URL ingestion, structured trace logging, and a Dockerized FastAPI + Streamlit stack.',
    tags: ['FastAPI', 'Streamlit', 'Milvus', 'Gemini', 'Groq', 'Docker', 'RAG'],
    icon: HiLightningBolt,
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    accentColor: 'text-violet-400',
    borderHover: 'hover:border-violet-500/30',
    github: 'https://github.com/Jigil-ak/Mini-Agentic-Rag-Application',
    details: {
      overview: 'A production-grade, highly observable RAG application utilizing a single-agent router to intelligently fetch, parse, and reason over multi-source evidence before synthesizing answers.',
      architecture: [
        'User Input: A search query or document question is received.',
        'Agentic Decision Engine: An agent determines the required resource: Milvus Vector Database for internal documents, DDGS Web Search for public internet queries, or Python Calculator for numeric validation.',
        'Evidence Collection: Aggregates references and applies source-aware document filtering.',
        'LLM Generation: Passes contextual data to Gemini API for response creation.',
        'Automatic Failover: Detects Gemini API failures and automatically redirects requests to Groq Llama with zero downtime.',
        'Detailed Observability: Logs each trace showing tool selections, input/output structures, exact tool latency, and token metrics.'
      ],
      keyAchievements: [
        'Refactored the application from a threshold-based router to a single-agent architecture following technical review feedback.',
        'Improved web search reliability by migrating to the DDGS package.',
        'Implemented detailed trace logging for routing, retrieval, latency, and model execution.',
        'Added Docker support for simplified deployment.',
        'Enhanced retrieval with source-aware document filtering and evidence-based agent reasoning.'
      ]
    }
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
    details: {
      overview: 'A clinical question-answering tool that extracts verified biomedical knowledge from academic corpora to assist healthcare research and patient query screening.',
      architecture: [
        'Data Ingest: Ingests medical publications, journals, and health FAQs.',
        'Embedding: Converts texts to dense vector embeddings using specialized biological text transformers.',
        'Vector Store: Stores embeddings in Pinecone for ultra-fast cosine similarity search.',
        'RAG Pipeline: Retrieves the top matching medical contexts using LangChain framework.',
        'LLM Inference: Uses FLAN-T5 or similar clinical-tuned models to synthesize responses, citing source journals.',
        'Deployment: Hosted via a Flask server running inside AWS ECS containers.'
      ],
      keyAchievements: [
        'Achieved sub-second latency for vector searches across over 100,000 biomedical text chunks using Pinecone indexing.',
        'Fine-tuned retrieval parameters using LangChain retrievers to achieve 92% retrieval precision on clinical benchmarks.',
        'Deployed the system as a scalable, load-balanced containerized app on AWS ECS.'
      ]
    }
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
    details: {
      overview: 'A computer-vision-based diagnostic aid that automatically identifies caries and segments tooth classifications from raw dental panoramic radiographs.',
      architecture: [
        'Image Pipeline: Normalizes contrast and applies CLAHE enhancement to raw panoramic X-rays.',
        'YOLOv5 Model: Performs single-shot multi-box detection to draw bounding boxes around caries and label tooth positions.',
        'Inference Service: OpenCV runs real-time inference and renders labeled bounding boxes on screen.',
        'User Interface: Clinician dashboard allowing image upload and annotated export.'
      ],
      keyAchievements: [
        'Trained YOLOv5 on a custom-annotated dataset of 2,000+ radiograph images to detect dental caries and count teeth.',
        'Implemented custom image pre-processing (histogram equalization) that improved precision score by 12.5%.',
        'Engineered an interactive GUI display using OpenCV and Streamlit for real-time diagnostic guidance.'
      ]
    }
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
    details: {
      overview: 'A self-checkout and shopping companion application enabling in-store shoppers to scan barcodes and bypass physical checkout queues.',
      architecture: [
        'Mobile App: Native Android shell with integrated camera scanner using Google ML Kit.',
        'Authentication: Generates dynamic QR codes linked to session state.',
        'Backend: Flask REST API manages shopping carts, product prices, and transactions.',
        'Database: Relational database in MySQL storing product inventory, user accounts, and purchase logs.',
        'Payment: Mock gateway integration for seamless transaction approval.'
      ],
      keyAchievements: [
        'Built full-stack mobile-first application using Flask backend and Android Studio.',
        'Created a QR-code generator/scanner checkout flow that cuts customer checkout time from 10 minutes to under 30 seconds.',
        'Optimized MySQL indexing to ensure product details load under 100ms when scanned.'
      ]
    }
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
    details: {
      overview: 'An analytical recommender system that models user preferences and reading patterns to generate custom literary recommendation lists.',
      architecture: [
        'Data Ingest: Ingests user ratings and books catalogs.',
        'Preprocessing: Filters sparse ratings and handles missing values using Pandas and NumPy.',
        'Model: Computes K-Nearest Neighbors (KNN) distance matrices (Cosine/Minkowski) to establish user/book similarities.',
        'Inference: Predicts ratings for unseen books and recommends top K matches.'
      ],
      keyAchievements: [
        'Processed over 1 million user ratings using efficient matrix manipulation libraries.',
        'Developed hybrid recommending functionality, combining KNN collaborative filtering with genre content filters.',
        'Achieved a Mean Absolute Error (MAE) of less than 0.75 on evaluation tests.'
      ]
    }
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
    details: {
      overview: 'An analytics project translating employee timesheets, ticket logs, and tasks into operational efficiency insights.',
      architecture: [
        'ETL: Extracts timesheet and ticket logs from various department sources.',
        'Data Transformation: Merges and structures records using Pandas in Python.',
        'Analytics: Runs statistical correlations between work hours, breaks, and project completion success rates.',
        'Power BI Dashboard: Builds interactive reports featuring productivity trends, department benchmarks, and bottleneck detectors.'
      ],
      keyAchievements: [
        'Aggregated and scrubbed 1,300+ data rows from multi-department sources.',
        'Discovered a critical 15% bottleneck in specific QA phases through data mining, leading to process changes.',
        'Designed interactive dashboards utilized by management for quarterly staffing reviews.'
      ]
    }
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
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-mono font-medium bg-slate-800/60 text-slate-400 rounded-md border border-slate-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links / Action Footer */}
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs font-mono font-medium ${project.accentColor} hover:text-white border border-slate-700/40 hover:border-current rounded-lg px-3 py-2 transition-all duration-300 bg-slate-800/40 hover:bg-slate-700/40`}
                      >
                        <FaGithub size={14} />
                        GitHub
                      </a>
                    )}
                    {project.details && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-300 hover:text-white border border-slate-700/40 hover:border-slate-500 rounded-lg px-3 py-2 transition-all duration-300 bg-slate-800/40 hover:bg-slate-700/40 cursor-pointer"
                      >
                        Details →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
            >
              {/* Top Gradient bar */}
              <div className={`h-2.5 bg-gradient-to-r ${selectedProject.gradient}`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-slate-800/50"
                aria-label="Close modal"
              >
                <HiX size={20} />
              </button>

              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Header info */}
                <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedProject.gradient} flex-shrink-0`}>
                    <selectedProject.icon className={selectedProject.accentColor} size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                      {selectedProject.title}
                    </h3>
                    <p className={`text-xs md:text-sm font-mono ${selectedProject.accentColor} mt-0.5`}>
                      {selectedProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Case Study Sections */}
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                      Project Overview
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedProject.details.overview}
                    </p>
                  </div>

                  {/* Architecture & Flow */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
                      System Architecture & Workflow
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.details.architecture.map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                          <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 border border-slate-700/60 text-[10px] font-mono font-bold ${selectedProject.accentColor}`}>
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.details.keyAchievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${selectedProject.gradient}`} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono font-medium bg-slate-800/60 text-slate-400 rounded-md border border-slate-700/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-950/40 px-6 py-4 flex items-center justify-between border-t border-slate-800">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-xs font-mono font-medium ${selectedProject.accentColor} hover:text-white border border-slate-700/40 hover:border-current rounded-lg px-4 py-2 transition-all duration-300 bg-slate-800/40 hover:bg-slate-700/40`}
                  >
                    <FaGithub size={14} />
                    View on GitHub
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Internal / Private Codebase</span>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer"
                >
                  Close [Esc]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
