import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OceanBackground from './components/OceanBackground';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-transparent">
      <OceanBackground />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800/50">
        <p>© 2025 Jigil A K. Crafted with passion & precision.</p>
      </footer>
    </div>
  );
}

export default App;
