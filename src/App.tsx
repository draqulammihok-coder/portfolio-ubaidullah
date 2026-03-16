/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Settings, 
  Code2, 
  FileSpreadsheet, 
  ChevronRight, 
  Mail, 
  MessageSquare, 
  Menu, 
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Zap,
  Globe,
  Database,
  ArrowRight,
  Phone,
  Send
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  image: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Chatbot System",
    description: "Intelligent customer support automation using LLMs and vector databases.",
    image: "https://picsum.photos/seed/ai-bot/600/400",
    tech: ["Python", "OpenAI", "React"]
  },
  {
    id: 2,
    title: "Automation Workflow Tool",
    description: "Streamlined business operations by connecting disparate SaaS platforms.",
    image: "https://picsum.photos/seed/automation/600/400",
    tech: ["Node.js", "Zapier", "API"]
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Modern, responsive web application with seamless payment integration.",
    image: "https://picsum.photos/seed/web-dev/600/400",
    tech: ["React", "Tailwind", "Stripe"]
  },
  {
    id: 4,
    title: "Excel Dashboard System",
    description: "Advanced data visualization and automated reporting for financial firms.",
    image: "https://picsum.photos/seed/excel/600/400",
    tech: ["Excel VBA", "Power Query", "DAX"]
  }
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "AI Solutions",
    description: "Custom AI integration to enhance your business intelligence.",
    icon: <Brain className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Business Automation",
    description: "Eliminate repetitive tasks with smart workflow automation.",
    icon: <Settings className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Website Development",
    description: "High-performance websites built with modern technologies.",
    icon: <Code2 className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Excel Data Systems",
    description: "Complex data modeling and automated reporting solutions.",
    icon: <Database className="w-8 h-8" />
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechFlow Inc.",
    content: "The AI integration transformed our support desk. We've seen a 40% reduction in response times.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Innovate Solutions",
    content: "Our Excel workflows used to take days. Now they run in seconds. Truly an expert in productivity.",
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "Startup Hub",
    content: "The website is stunning and fast. Exactly what we needed for our launch.",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

const TOOLS = [
  { name: "Python", icon: <Cpu /> },
  { name: "JavaScript", icon: <Globe /> },
  { name: "React", icon: <Zap /> },
  { name: "Excel", icon: <FileSpreadsheet /> },
  { name: "Power Automate", icon: <Settings /> },
  { name: "Node.js", icon: <Database /> },
  { name: "Tailwind CSS", icon: <CheckCircle2 /> },
  { name: "OpenAI API", icon: <Brain /> }
];

// --- Components ---

const Reveal = ({ children, delay = 0, y = 20 }: { children: React.ReactNode, delay?: number, y?: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`magnetic-wrap ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-6 bg-white/5 backdrop-blur-sm' : 'py-10'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="#home" className="text-xs font-display font-bold tracking-[0.3em] uppercase">
          UBAIDULLAH <span className="opacity-30">SALAHUDDIN</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="glass-button px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group">
            Get In Touch <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-10 space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60"
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          x: mousePosition.x * -1, 
          y: mousePosition.y * -1,
          rotate: mousePosition.x * 0.1
        }}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: mousePosition.x, 
          y: mousePosition.y,
          rotate: mousePosition.y * -0.1
        }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-5xl px-6 relative z-10"
      >
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl mb-6 cursor-pointer"
          >
            <img 
              src="https://i.ibb.co/xS3P7gWJ/picwish-8824833481-image1.png" 
              alt="Ubaidullah Salahuddin" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 mb-2"
            >
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em]">UBAIDULLAH SALAHUDDIN</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="status-badge"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Available for work</span>
            </motion.div>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hero-title text-4xl md:text-7xl lg:text-8xl mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"
        >
          I'M UBAIDULLAH, A TECH EXPERT BUILDING WEBSITES FOR STARTUPS.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xs md:text-sm text-ink/40 max-w-xl mb-16 leading-relaxed font-medium uppercase tracking-widest"
        >
          I design unique websites that turn start-ups into market leaders. Let's create a digital presence that not only looks amazing but also drives real results for your business.
        </motion.p>

        <MagneticButton>
          <a href="#contact" className="glass-button px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center group">
            Get In Touch <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </MagneticButton>
      </motion.div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Brain, Cpu, Zap, Globe].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              y: [0, -100],
              x: mousePosition.x * (i + 1) * 0.5
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              bottom: "-10%"
            }}
          >
            <Icon className="w-8 h-8 text-accent/20" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <Reveal y={50}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden glass-card p-4">
              <img 
                src="https://i.ibb.co/VpM9f5QM/image.png" 
                alt="Expertise" 
                className="w-full h-full object-cover rounded-[32px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[32px] max-w-[240px]"
            >
              <p className="text-5xl font-display font-bold mb-2">2+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-tight">Years of Digital Problem Solving Experience</p>
            </motion.div>
          </motion.div>
        </Reveal>

        <div className="space-y-12">
          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">Building Smart Solutions for Modern Businesses</h2>
            <p className="text-sm md:text-base text-ink/50 leading-relaxed font-medium">
              I help businesses automate workflows, build intelligent AI tools, create professional websites, and improve productivity using advanced Excel and Word solutions. My approach combines technical precision with creative problem-solving.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-12">
            {[
              { label: "AI Integration", value: "Chatbots & ML" },
              { label: "Automation", value: "Workflow Flows" },
              { label: "Web Dev", value: "Modern UI/UX" },
              { label: "Office", value: "Excel Dashboards" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={0.3 + i * 0.1}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-2">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const skills = [
    {
      title: "Artificial Intelligence",
      desc: "AI chatbots, tools integration, content systems, and machine learning solutions.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Automation Expert",
      desc: "Workflow, business, data, and task automation to scale your operations.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Web Development",
      desc: "Modern websites, responsive UI, portfolio sites, and business landing pages.",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      title: "Word & Excel Expert",
      desc: "Advanced formulas, dashboards, Word automation, and professional documentation.",
      icon: <FileSpreadsheet className="w-6 h-6" />,
    }
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Core Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                className="glass-card h-full p-10 rounded-[32px] transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-50 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{skill.title}</h3>
                <p className="text-xs font-medium text-ink/50 leading-relaxed">{skill.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6">Selected Works</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">Portfolio</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-16">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[48px] glass-card p-4 mb-10 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-[36px] group-hover:scale-[1.1] transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center"
                   >
                     <ExternalLink className="w-6 h-6 text-white" />
                   </motion.div>
                </div>
              </div>
              <div className="px-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-3 uppercase tracking-tight group-hover:text-accent transition-colors">{project.title}</h3>
                  <div className="flex gap-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-widest opacity-20 group-hover:opacity-60 transition-opacity">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.div 
                  whileHover={{ rotate: 45 }}
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">Services</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">What I Offer</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                className="glass-card h-full p-12 rounded-[40px] flex flex-col items-start group transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-50 flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">{service.title}</h3>
                <p className="text-xs font-medium text-ink/50 leading-relaxed flex-grow">{service.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tools = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">Stack</span>
          <h2 className="text-3xl font-display font-bold">Tools & Technologies</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                {React.cloneElement(tool.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-[64px] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] -mr-48 -mt-48 rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8 block">Get In Touch</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-12 leading-[0.9]">
                Let's build <br />
                <span className="opacity-20">something</span> <br />
                great.
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Email</p>
                    <p className="text-sm font-bold uppercase tracking-widest">zehriubaid5@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Phone</p>
                    <p className="text-sm font-bold uppercase tracking-widest">03195951943</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <Reveal delay={0.1}>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 ml-4">Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.02 }}
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/50 border border-white/80 rounded-full px-8 py-4 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 ml-4">Email</label>
                    <motion.input 
                      whileFocus={{ scale: 1.02 }}
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/50 border border-white/80 rounded-full px-8 py-4 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.3}>
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest opacity-30 ml-4">Message</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows={4} 
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/50 border border-white/80 rounded-[32px] px-8 py-6 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <MagneticButton className="w-full">
                  <button className="glass-button w-full py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center group">
                    Send Message <Send className="ml-2 w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </MagneticButton>
              </Reveal>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-xs font-display font-bold tracking-[0.3em] uppercase">
          UBAIDULLAH <span className="opacity-30">SALAHUDDIN</span>
        </div>
        
        <div className="flex space-x-12">
          {['Twitter', 'Instagram', 'Dribbble'].map(social => (
            <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity">
              {social}
            </a>
          ))}
        </div>

        <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-20">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-accent/20 selection:text-accent">
      <div className="atmosphere" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Services />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
