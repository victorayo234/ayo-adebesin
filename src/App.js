import React, { useState, useEffect, useRef } from "react";

const Reveal = ({ children, width = "fit-content" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width }}>
      <div
        className={`transition-all duration-1000 ease-out transform ${isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-4 glass-dark shadow-2xl" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#about" className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform flex items-center gap-2">
            <span className="text-blue-500 font-bold text-4xl font-mono">|</span>
            <span className="hidden sm:inline">Web Developer</span>
            <span className="sm:hidden"> Web Developer</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-slate-400 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all relative group tracking-widest uppercase"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          {/* Hamburger Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-white transition-colors relative z-50 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end group">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-2 -rotate-45' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-2 rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl transition-all duration-500 z-[45] md:hidden ${isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {["About", "Projects", "Skills", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl font-black text-slate-800 dark:text-slate-300 hover:text-blue-500 transition-all transform tracking-tighter uppercase ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const IconButton = ({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-slate-100 dark:glass-dark rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all transform hover:-translate-y-1 group border border-slate-200 dark:border-white/5"
    aria-label={label}
  >
    {icon}
  </a>
);

const ProjectCard = ({ title, description, tags, link = "#" }) => (
  <div className="group relative glass-dark rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-3 shadow-2xl hover:shadow-blue-500/10 border border-ui-border/50">
    <div className="p-7">
      <h3 className="text-2xl font-extrabold mb-2 dark:group-hover:text-blue-400 group-hover:text-blue-600 transition-colors tracking-tight text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 dark:text-blue-400 bg-blue-500/5 border border-blue-500/20 px-3 py-1.5 rounded-lg backdrop-blur-md">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-slate-600 dark:text-slate-400/90 text-[14px] mb-5 leading-relaxed font-medium">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white group/link"
      >
        <span className="relative">
          View Project
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover/link:w-full"></span>
        </span>
        <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform duration-300 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="group relative glass-dark rounded-[2rem] p-8 border border-ui-border/50 transition-all duration-500 hover:border-blue-500/50 hover:bg-blue-500/5 shadow-2xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-slate-100 dark:bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">
        {description}
      </p>
    </div>
    {/* Bottom Accent Line */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
  </div>
);

const ApproachStep = ({ number, title, description, isLast }) => (
  <div className={`relative ${!isLast ? 'pb-10' : ''}`}>
    <div className="flex gap-6 items-start">
      <div className="text-3xl font-bold text-slate-300 dark:text-slate-800 pt-1 leading-none min-w-[32px]">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
          {title}: <span className="text-slate-500 dark:text-slate-400 font-medium text-base leading-relaxed">{description}</span>
        </h3>
      </div>
    </div>
  </div>
);

const SpaceBackground = ({ theme }) => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [motes, setMotes] = useState([]);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);

    // Generate shooting stars
    const newShootingStars = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      right: `-${Math.random() * 20}%`,
      top: `${Math.random() * 50}%`,
      duration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setShootingStars(newShootingStars);

    // Generate light motes for light mode - increased count for spiral effect
    const newMotes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 10}px`,
      duration: `${Math.random() * 15 + 15}s`,
      delay: `${Math.random() * -20}s`, // Random negative delay for staggered start
    }));
    setMotes(newMotes);
  }, []);

  return (
    <div className={`stars-container z-0 transition-opacity duration-1000`}>
      {/* Dark mode stars */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              "--twinkle-duration": star.duration,
              backgroundColor: 'white'
            }}
          />
        ))}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="shooting-star"
            style={{
              right: s.right,
              top: s.top,
              "--shooting-duration": s.duration,
              "--shooting-delay": s.delay,
              backgroundImage: 'linear-gradient(to left, #60a5fa, transparent)'
            }}
          />
        ))}
      </div>

      {/* Light mode motes */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        {motes.map((mote) => (
          <div
            key={mote.id}
            className="light-mote"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              "--mote-duration": mote.duration,
              "--mote-delay": mote.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TechOrbit = ({ skills }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Single ring containing all skills revolving together
  const rings = [
    { radius: isMobile ? 120 : 250, speed: "animate-orbit-slow", items: skills },
  ];

  return (
    <div className="relative h-[500px] md:h-[650px] w-full flex items-center justify-center overflow-hidden px-4">
      {/* Central Core - React */}
      <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-slate-100 dark:bg-slate-900/50 rounded-full flex items-center justify-center border-2 border-blue-500/30 backdrop-blur-xl animate-atmosphere shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <img
          src="https://skillicons.dev/icons?i=react"
          alt="React"
          className="w-12 h-12 md:w-16 md:h-16 object-contain animate-spin-slow relative z-20"
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* Orbitings Icons */}
      {rings.map((ring, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div
            className={`relative flex items-center justify-center pointer-events-auto ${ring.speed}`}
            style={{ width: ring.radius * 2, height: ring.radius * 2 }}
          >
            {ring.items.map((skill, j) => {
              const angle = (j / ring.items.length) * 2 * Math.PI;
              const x = Math.cos(angle) * ring.radius;
              const y = Math.sin(angle) * ring.radius;
              return (
                <div
                  key={skill.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                >
                  {/* Icons revolve but stay upright */}
                  <div className={ring.speed === "animate-orbit-reverse" ? "animate-orbit-slow" : "animate-orbit-reverse"}>
                    <div className={`hover:scale-125 transition-transform duration-300 cursor-pointer p-2 ${isMobile ? 'animate-bounce' : ''}`} style={{ animationDuration: isMobile ? '3s' : '0s' }}>
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const DailyLog = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const logItems = [
    { label: "Status", value: "Available for Hire", icon: <div className="status-pulse" /> },
    { label: "Current Focus", value: "Full-Stack Perfection", icon: "🎯" },
    { label: "Learning", value: "Advanced System Design", icon: "🧠" },
    // { label: "Listening", value: "Code & Chill", icon: "🎧" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Live Clock Card */}
      <div className="lg:col-span-1 glass-dark rounded-3xl p-6 border border-ui-border/50 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
        <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Current Local Time / NG</div>
        <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="mt-4 text-[12px] text-slate-400 dark:text-slate-500 font-medium">Checking from Lagos, Nigeria</div>
      </div>

      {logItems.map((item, i) => (
        <div key={i} className="glass-dark rounded-3xl p-6 border border-ui-border/50 hover:border-blue-500/30 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</span>
            <span className="text-xl">{item.icon}</span>
          </div>
          <div className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = "service_eutizfg";
    const templateId = "template_g2x1r0u";
    const publicKey = "WKn08PuODDZS067GD";

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.text();
        console.error("EmailJS Error:", errorData);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network/Service Error:", error);
      setStatus("error");
    }
  };

  const skills = [
    { name: "HTML", icon: "https://skillicons.dev/icons?i=html" },
    { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
    { name: "JavaScript", icon: "https://skillicons.dev/icons?i=javascript" },
    { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
    { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
    { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
    { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30 transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <main>
        {/* About Section */}
        <Reveal width="100%">
          <section id="about" className="relative pt-24 pb-20 px-6 overflow-hidden">
            <SpaceBackground theme={theme} />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                Available for new opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight text-foreground">
                Hi, I'm <span className="text-blue-500">Ayo Adebesin</span>
              </h1>
              <h2 className="pb-5 text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white">A Web Developer + UI/UX Designer</h2>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                I bring ideas to life on the web, blending sleek interfaces with smooth user experiences to create meaningful digital interactions that suits the user's preference and liking.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <IconButton
                  href="http://github.com/victorayo234"
                  label="GitHub"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>}
                />
                <IconButton
                  href="https://linkedin.com"
                  label="LinkedIn"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>}
                />
                <IconButton
                  href="https://x.com/cobra_ayo"
                  label="X (Twitter)"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.29 19.497h2.039L6.486 3.24H4.298l13.313 17.41z" /></svg>}
                />
                <IconButton
                  href="mailto:victorayo234@gmail.com"
                  label="Email"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>}
                />
              </div>

              <a href="/resume.pdf" download className="inline-flex items-center px-10 py-5 bg-blue-700 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1">
                View Resume
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            </div>
          </section>
        </Reveal>

        {/* Daily Log Section */}
        <Reveal width="100%">
          <section id="log" className="pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col mb-12">
                <h2 className="text-4xl font-bold mb-4 flex items-center gap-4 text-foreground">
                  <span className="text-blue-500 font-bold text-5xl font-mono">|</span>
                  Status <span></span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400">A live snapshot of my current professional orbit.</p>
              </div>
              <DailyLog />
            </div>
          </section>
        </Reveal>

        {/* Projects Section */}
        <Reveal width="100%">
          <section id="projects" className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                  <h2 className="text-4xl font-bold mb-4 text-foreground"><span className="text-blue-500 font-bold text-5xl font-mono">|</span>Featured Projects</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-6">A selection of my recent works across web and mobile.</p>
                </div>
                <a href="http://github.com/victorayo234" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:text-blue-400 transition-colors border-b-2 border-blue-500/20 pb-1">
                  View all projects
                </a>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Portfolio Website"
                  description="A fully functional and responsive portfolio site, showcasing my skills and qualifications."
                  tags={["React", "Tailwind"]}
                  link="https://ayoadebesin.vercel.app"
                />
                <ProjectCard
                  title="Profile List"
                  description="A custom built profile grouping, adding and filtering website, based on the idea of Linkedin, It makes use of react.js and basic css, to make a  perfecly responsive and  functional website."
                  tags={["React", "CSS"]}
                  link="https://ava-profile.vercel.app"
                />
                <ProjectCard
                  title=" Easybank"
                  description="A next generation modern and visually engaging digital banking landing page which features a fully responsive layout, smooth interface sections, and showcases key banking features in a clean and user-friendly design. "
                  tags={["HTML", "CSS", "JAVASCRIPT"]}
                  link="https://easybank-one-project.vercel.app"
                />
                <ProjectCard
                  title="Cloud Management Platform"
                  description="Internal tool for monitoring cloud infrastructure and system health."
                  tags={["TypeScript", "Node.js", "AWS"]}
                  link="#"
                />
              </div>
            </div>
          </section>
        </Reveal>


        {/* Features Section - Quality in Every Detail */}
        <Reveal width="100%">
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                Key Features
              </span>
              <div className="max-w-3xl mb-20">
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-900 dark:text-white font-bold">
                  Quality in Every Detail
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Delivering excellence through innovative solutions and meticulous attention to detail
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FeatureCard
                  title="Creative Design"
                  description="Crafting unique, responsive websites that perfectly blend aesthetics with functionality."
                  icon={<svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3M9.707 3.586l7.707 7.707" /></svg>}
                />
                <FeatureCard
                  title="Rapid Development"
                  description="Swift and efficient development process without compromising on quality or attention to detail."
                  icon={<svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
                <FeatureCard
                  title="High Performance"
                  description="Optimized code and efficient hosting ensuring lightning-fast page loads and smooth user experience."
                  icon={<svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 10-4 0v6M17 19v-2a2 2 0 10-4 0v2M13 19v-4a2 2 0 10-4 0v4m6 0h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2" /></svg>}
                />
                <FeatureCard
                  title="Scalable Architecture"
                  description="Future-proof solutions built to grow with your needs, utilizing modern development practices."
                  icon={<svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                />
              </div>
            </div>
          </section>
        </Reveal>

        {/* Skills Orbit Section */}
        <Reveal width="100%">
          <section id="skills" className="py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-foreground"><span className="text-blue-500 font-bold text-5xl font-mono">|</span>Current Skills</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-16 max-w-2xl text-left">Here are the tools and technologies I use to turn creative ideas into functional, user-friendly digital experiences — from design to deployment, each one helps bring clarity, performance, and style to the final product.
              </p>
              <TechOrbit skills={skills} />
            </div>
          </section>
        </Reveal>

        {/* Development Approach Section */}
        <Reveal width="100%">
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header at top-left */}
              <div className="max-w-3xl mb-20 text-left">
                <h2 className="text-5xl md:text-6xl font-semibold mb-8 tracking-tighter text-slate-900 dark:text-white leading-none ls-6">
                  My Web Development <br />
                  Approach
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                  I follow a structured approach to delivering high-quality websites that cater to my clients' needs. From gathering requirements to product launch and ongoing maintenance, each step is essential to the success of the project.
                </p>
              </div>

              {/* Grid with Image and Steps */}
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                {/* Left Column: Image */}
                <div className="relative group">
                  <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl">
                    <img
                      src="/premium_desk_setup_hero_1770325919796.png"
                      alt="Development Workspace"
                      className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                </div>

                {/* Right Column: Steps */}
                <div className="lg:pt-4">
                  <div className="text-[14px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] mb-10">Steps</div>
                  <div className="space-y-2">
                    <ApproachStep
                      number="1"
                      title="Client Requirements Gathering"
                      description="Understanding the clients needs and objectives to build a roadmap for the project."
                    />
                    <ApproachStep
                      number="2"
                      title="Design and Development"
                      description="Creating design mockups and developing the website, ensuring it meets the clients expectations."
                    />
                    <ApproachStep
                      number="3"
                      title="Testing and Optimization"
                      description="Thoroughly testing the website for bugs, performance, and responsiveness across devices."
                    />
                    <ApproachStep
                      number="4"
                      title="Launch and Maintenance"
                      description="Launching the website and providing ongoing support for any updates or maintenance."
                      isLast={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Contact Section */}
        <Reveal width="100%">
          <section id="contact" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-[2rem] p-12 relative overflow-hidden border border-ui-border/50 transition-colors duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 text-foreground">Let's work together.</h2>
                  <p className="text-slate-600 dark:text-slate-400">Ready to start your next project? Drop me a message below!</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-2">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Michael Scoffield"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-2">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="mike@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-2">Message</label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Share your ideas..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all resize-none text-foreground"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 text-center pt-4">
                    <button
                      disabled={status === "sending"}
                      type="submit"
                      className="w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                    {status === "success" && <p className="mt-4 text-green-400 font-medium">Message sent successfully!</p>}
                    {status === "error" && <p className="mt-4 text-red-400 font-medium">Something went wrong. Please try again.</p>}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="py-12 border-t border-ui-border/50 px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex-col md:flex-row justify-between items-center gap-8 text-foreground">
          <p className="text-center text-5xl w-4xl mb-4 font-serif">
            " I’m always open to exciting collaborations, freelance gigs, or full-time opportunities. Let’s build something impactful."
          </p>
          <p className="text-center mb-8">- Ayo Adebesin</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm italic text-center flex justify-center align-center">© {new Date().getFullYear()} Ayo Adebesin. Made with passion & precision.</p>

        </div>
      </footer>
    </div>
  );
}

export default App;
