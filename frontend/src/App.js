import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";

// Component for Android status bar
const AndroidStatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="android-status-bar">
      <div className="status-left">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="status-right">
        <div className="status-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div className="status-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
            <line x1="2" y1="20" x2="2" y2="20"></line>
          </svg>
        </div>
        <div className="status-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
            <line x1="5" y1="10" x2="5" y2="15"></line>
            <line x1="10" y1="10" x2="10" y2="15"></line>
            <line x1="23" y1="13" x2="23" y2="13"></line>
          </svg>
        </div>
        <div className="battery-indicator">
          <div className="battery-level"></div>
          <span>85%</span>
        </div>
      </div>
    </div>
  );
};

// Component for the animated portfolio card with 3D flip effect
const PortfolioCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  // Handle hover on desktop only
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsFlipped(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full sm:w-80 h-80 rounded-xl m-2 shadow-md perspective"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
    >
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front rounded-xl overflow-hidden shadow-md">
          <div className="ripple-effect"></div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
            <h3 className="text-xl font-bold material-text">{project.title}</h3>
            <p className="text-sm text-gray-200">{project.category}</p>
          </div>
        </div>
        <div className="flip-card-back rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-purple-600 to-blue-500 p-6 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-3 material-text">{project.title}</h3>
          <p className="text-sm text-white/90 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-white/20 rounded-full text-white material-chip"
              >
                {tech}
              </span>
            ))}
          </div>
          <motion.button 
            className="mt-auto self-center px-4 py-2 bg-white/10 hover:bg-white/20 material-button rounded-full text-sm text-white font-medium"
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Skill component with animation
const Skill = ({ skill, level, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="mb-3"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-white material-text">{skill}</span>
        <span className="text-gray-300">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-md material-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-3xl text-purple-400 mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 material-text">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </motion.div>
  );
};

// Animated contact form field
const FormField = ({ label, type, placeholder, index }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="mb-4 material-input-container"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <label
        className={`block mb-2 text-sm font-medium transition-all duration-300 ${
          focused ? "text-purple-400" : "text-gray-300"
        } ${value ? "material-label-active" : ""}`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full p-3 text-sm bg-gray-800/30 border rounded-lg outline-none transition-all duration-300 material-input ${
            focused
              ? "border-purple-400 shadow-[0_0_0_2px_rgba(167,139,250,0.2)]"
              : "border-gray-700 focus:border-blue-500"
          }`}
          rows="4"
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        ></textarea>
      ) : (
        <input
          type={type}
          className={`w-full p-3 text-sm bg-gray-800/30 border rounded-lg outline-none transition-all duration-300 material-input ${
            focused
              ? "border-purple-400 shadow-[0_0_0_2px_rgba(167,139,250,0.2)]"
              : "border-gray-700 focus:border-blue-500"
          }`}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      )}
      <div className="material-input-underline"></div>
    </motion.div>
  );
};

// TabItem component for bottom navigation
const TabItem = ({ icon, label, isActive, onClick }) => {
  return (
    <motion.button
      className={`flex-1 flex flex-col items-center justify-center py-2 ${
        isActive ? "text-purple-400" : "text-gray-400"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 w-6 h-1 bg-purple-400 rounded-t-md"
          layoutId="activeTab"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

// Main Android App Component
const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  // Portfolio projects data
  const projects = [
    {
      title: "UI/UX Design",
      category: "Mobile App",
      description: "A sleek mobile app interface design with intuitive user experience for a finance application. The design focuses on clear information hierarchy and visual feedback.",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      image: "https://images.unsplash.com/photo-1542641728-6ca359b085f4",
    },
    {
      title: "Digital Art",
      category: "Illustration",
      description: "A series of digital illustrations featuring abstract gradient designs with a modern aesthetic. Created for a technology brand's marketing campaign.",
      technologies: ["Photoshop", "Illustrator", "Procreate"],
      image: "https://images.unsplash.com/photo-1563089145-599997674d42",
    },
    {
      title: "3D Modeling",
      category: "Visual Design",
      description: "3D modeling and visualization project for an architectural firm. Created realistic 3D models with detailed textures and lighting effects.",
      technologies: ["Blender", "Cinema 4D", "Substance Painter"],
      image: "https://images.unsplash.com/photo-1633432695467-66403aa96bfd",
    },
    {
      title: "Logo Design",
      category: "Branding",
      description: "Minimalist logo design for a real estate company. The design emphasizes simplicity, memorability, and versatility across different media.",
      technologies: ["Illustrator", "InDesign", "Photoshop"],
      image: "https://images.unsplash.com/photo-1535567679266-c113f99615bd",
    },
    {
      title: "Web Design",
      category: "UI/UX",
      description: "Responsive website design for a creative agency. Features modern layout, interactive elements, and smooth animations for enhanced user experience.",
      technologies: ["Figma", "HTML/CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
    },
    {
      title: "Digital Art",
      category: "Abstract",
      description: "Abstract digital art compositions featuring vibrant colors and geometric shapes. Created for an art exhibition focused on digital media.",
      technologies: ["Photoshop", "Illustrator", "After Effects"],
      image: "https://images.unsplash.com/photo-1653023500770-3a3b64a1b4c4",
    },
  ];

  // Skills data
  const skills = [
    { skill: "Graphic Design", level: 95 },
    { skill: "UI/UX Design", level: 90 },
    { skill: "Brand Identity", level: 85 },
    { skill: "Logo Design", level: 92 },
    { skill: "Digital Marketing", level: 80 },
    { skill: "Web Design", level: 88 },
    { skill: "Motion Graphics", level: 82 },
    { skill: "Project Management", level: 85 },
  ];

  // Services data
  const services = [
    {
      icon: "🎨",
      title: "Graphic Design",
      description: "High-quality graphic design services for all your visual communication needs, from print to digital media.",
    },
    {
      icon: "✏️",
      title: "Logo Design",
      description: "Create a distinctive and memorable logo that represents your brand's identity and resonates with your audience.",
    },
    {
      icon: "📱",
      title: "UI/UX Design",
      description: "User-centered interface and experience design for websites and mobile apps that are intuitive and engaging.",
    },
    {
      icon: "🌐",
      title: "Web Design",
      description: "Modern, responsive website designs that look great on all devices and provide an exceptional user experience.",
    },
    {
      icon: "📊",
      title: "Social Media Marketing",
      description: "Strategic social media marketing to boost your online presence and engage with your target audience.",
    },
    {
      icon: "📝",
      title: "Brand Identity",
      description: "Comprehensive brand identity development including logos, color schemes, typography, and brand guidelines.",
    },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 400);

      // Update active section based on scroll position
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "portfolio", ref: portfolioRef },
        { id: "services", ref: servicesRef },
        { id: "contact", ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up GSAP animations
  useEffect(() => {
    // Animation for the background gradient
    const backgroundElement = document.querySelector(".animated-bg");
    if (backgroundElement) {
      gsap.to(backgroundElement, {
        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="android-device">
      <div className="android-notch"></div>
      <AndroidStatusBar />
      
      <div className="android-app-content min-h-screen text-white relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="animated-bg fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 z-[-1]"></div>
        
        {/* Floating particles effect */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i+1}`}></div>
          ))}
        </div>

        {/* Hero section */}
        <section
          ref={homeRef}
          id="home"
          className="min-h-screen flex items-center justify-center px-4 pt-12 pb-20"
        >
          <div className="container mx-auto flex flex-col-reverse items-center justify-between">
            <motion.div
              className="w-full text-center mt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 material-text">
                <span className="block mb-2">Hello, I'm</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Shaon Rahman
                </span>
              </h1>
              <div className="h-16 overflow-hidden">
                <TypeAnimation
                  sequence={[
                    "Graphics Designer",
                    1000,
                    "Project Manager",
                    1000,
                    "UI/UX Designer",
                    1000,
                    "Brand Expert",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-2xl md:text-3xl text-gray-200 font-light material-text"
                />
              </div>
              <p className="text-gray-300 my-6 max-w-lg mx-auto">
                With 10 years of experience in graphics design, I create stunning
                visuals and manage projects at Labancy company to deliver
                exceptional creative solutions for clients.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium material-button elevation-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(contactRef)}
                >
                  Hire Me
                </motion.button>
                <motion.button
                  className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 material-button-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(portfolioRef)}
                >
                  View Portfolio
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="w-full flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse-slow"></div>
                <img
                  src="https://images.unsplash.com/photo-1557862921-37829c790f19"
                  alt="Shaon Rahman"
                  className="absolute inset-2 rounded-full object-cover border-4 border-white profile-image"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About section */}
        <section
          ref={aboutRef}
          id="about"
          className="py-12 px-4"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-10 material-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About <span className="text-purple-400">Me</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="material-card bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400 material-text">My Story</h3>
                <p className="text-gray-300 mb-4">
                  I'm a passionate graphics designer with over 10 years of experience in the creative industry. 
                  Currently working as a Project Manager at Labancy, I oversee creative projects and ensure 
                  they meet the highest standards of quality and client satisfaction.
                </p>
                <p className="text-gray-300 mb-6">
                  Throughout my career, I've collaborated with diverse clients, from startups to established
                  brands, helping them communicate their message through compelling visual design.
                  My approach combines creativity with strategic thinking to deliver results that not only
                  look great but also achieve business objectives.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Name:</h4>
                    <p className="text-gray-300">Shaon Rahman</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Experience:</h4>
                    <p className="text-gray-300">10+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Role:</h4>
                    <p className="text-gray-300">Project Manager</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Company:</h4>
                    <p className="text-gray-300">Labancy</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="material-card bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400 material-text">My Skills</h3>
                <div className="mt-6">
                  {skills.map((skill, index) => (
                    <Skill
                      key={index}
                      skill={skill.skill}
                      level={skill.level}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio section */}
        <section
          ref={portfolioRef}
          id="portfolio"
          className="py-12 px-4"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 material-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-purple-400">Portfolio</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-300 text-center max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A showcase of my creative work spanning various design disciplines including
              UI/UX design, branding, illustrations, and more.
            </motion.p>
            
            <div className="flex flex-wrap justify-center">
              {projects.map((project, index) => (
                <PortfolioCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Services section */}
        <section
          ref={servicesRef}
          id="services"
          className="py-12 px-4"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 material-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-purple-400">Services</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-300 text-center max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Labancy provides comprehensive design and marketing solutions tailored to
              meet your brand's specific needs and goals.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section
          ref={contactRef}
          id="contact"
          className="py-12 px-4 pb-24"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 material-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact <span className="text-purple-400">Me</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-300 text-center max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have a project in mind or want to discuss a potential collaboration?
              Get in touch with me, and I'll get back to you as soon as possible.
            </motion.p>
            
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg material-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white material-text">Send Me a Message</h3>
                <form>
                  <FormField
                    label="Your Name"
                    type="text"
                    placeholder="Enter your name"
                    index={0}
                  />
                  <FormField
                    label="Your Email"
                    type="email"
                    placeholder="Enter your email"
                    index={1}
                  />
                  <FormField
                    label="Subject"
                    type="text"
                    placeholder="Enter subject"
                    index={2}
                  />
                  <FormField
                    label="Your Message"
                    type="textarea"
                    placeholder="Type your message here..."
                    index={3}
                  />
                  <motion.button
                    className="w-full px-6 py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium material-button elevation-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
              
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg material-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6 text-white material-text">Contact Information</h3>
                
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-4 android-list-item"
                    whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-purple-400">Phone</h4>
                      <p className="text-gray-300">+1 234 567 890</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-4 android-list-item"
                    whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-purple-400">Email</h4>
                      <p className="text-gray-300">shaon@labancy.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-4 android-list-item"
                    whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-purple-400">Location</h4>
                      <p className="text-gray-300">New York, NY, USA</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-white mb-4 material-text">Follow Me</h4>
                  <div className="flex space-x-4">
                    {/* Social icons with hover animations */}
                    {["facebook", "twitter", "instagram", "linkedin"].map((social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r from-blue-500 to-purple-600 transition-colors material-icon-button"
                        whileHover={{ y: -5, scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          {social === "facebook" && (
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          )}
                          {social === "twitter" && (
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          )}
                          {social === "instagram" && (
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          )}
                          {social === "linkedin" && (
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                          )}
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Android navigation bar (bottom) */}
        <div className="android-nav-bar fixed bottom-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 flex items-center justify-around z-50">
          <TabItem 
            icon="🏠" 
            label="Home" 
            isActive={activeSection === "home"} 
            onClick={() => scrollToSection(homeRef)} 
          />
          <TabItem 
            icon="👨‍💼" 
            label="About" 
            isActive={activeSection === "about"} 
            onClick={() => scrollToSection(aboutRef)} 
          />
          <TabItem 
            icon="📁" 
            label="Portfolio" 
            isActive={activeSection === "portfolio"} 
            onClick={() => scrollToSection(portfolioRef)} 
          />
          <TabItem 
            icon="⚙️" 
            label="Services" 
            isActive={activeSection === "services"} 
            onClick={() => scrollToSection(servicesRef)} 
          />
          <TabItem 
            icon="📞" 
            label="Contact" 
            isActive={activeSection === "contact"} 
            onClick={() => scrollToSection(contactRef)} 
          />
        </div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg z-40 material-fab elevation-3"
              onClick={() => scrollToTop()}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Android home navigation bar */}
      <div className="android-system-navbar">
        <div className="nav-button back-button"></div>
        <div className="nav-button home-button"></div>
        <div className="nav-button recent-button"></div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;