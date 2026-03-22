import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub, FaKaggle } from 'react-icons/fa';

const socialLinks = [
  { icon: HiMail, href: 'mailto:jigil.ak2003@gmail.com', label: 'Email', color: 'hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30' },
  { icon: HiPhone, href: 'tel:+918086129924', label: 'Phone', color: 'hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/jigilak/', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30' },
  { icon: FaGithub, href: 'https://github.com/Jigil-ak', label: 'GitHub', color: 'hover:bg-slate-400/20 hover:text-slate-300 hover:border-slate-400/30' },
  { icon: FaKaggle, href: 'https://www.kaggle.com/akjigil', label: 'Kaggle', color: 'hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const btnRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_0rgb903';
    const templateID = 'template_yencl9w';
    const publicKey = 'W6TxmDLajNVv2bhqa';

    emailjs.sendForm(serviceID, templateID, e.target, {
      publicKey: publicKey,
    })
      .then((result) => {
        console.log('Success:', result.text);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error('EmailJS Error:', error);
        alert(`Failed to send the message. Error: ${error.text || error.message}`);
      });
  };

  const createRipple = useCallback((e) => {
    const button = btnRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add('ripple-effect');
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  return (
    <section id="contact" className="section-padding relative">
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
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Have a project in mind or want to collaborate? Let&apos;s connect.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-glow w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-slate-700/40 text-white placeholder-slate-600 text-sm outline-none focus:border-accent-blue/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-glow w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-slate-700/40 text-white placeholder-slate-600 text-sm outline-none focus:border-accent-blue/50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-glow w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-slate-700/40 text-white placeholder-slate-600 text-sm outline-none focus:border-accent-blue/50 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                onClick={createRipple}
                className="btn-ripple w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {sent ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                I&apos;m always interested in exploring opportunities and collaborating on impactful projects in AI, Machine Learning, and Data Science. Let&apos;s connect and build something meaningful.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <a
                  href="mailto:jigil.ak2003@gmail.com"
                  className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <HiMail className="text-red-400" size={18} />
                  </div>
                  <span className="text-sm">jigil.ak2003@gmail.com</span>
                </a>
                <a
                  href="tel:+918086129924"
                  className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <HiPhone className="text-green-400" size={18} />
                  </div>
                  <span className="text-sm">+91 8086129924</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 font-medium">
                Connect with me
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`p-3 rounded-xl glass border border-slate-700/30 text-slate-400 transition-all duration-300 ${link.color}`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
