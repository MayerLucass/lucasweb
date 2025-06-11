import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

// Componente mejorado para scroll al top con animación
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
}

// PageWrapper con más opciones de animación
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // Curva de easing personalizada
      }}
    >
      {children}
    </motion.div>
  );
}

// Componente de contador reutilizable
function Counter({ initialValue = 0 }) {
  const [counter, setCounter] = useState(initialValue);
  
  // Efecto para guardar el contador en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('counter');
    if (saved) setCounter(parseInt(saved));
  }, []);
  
  useEffect(() => {
    localStorage.setItem('counter', counter.toString());
  }, [counter]);

  return (
    <div className="counter-container">
      <div className="counter-display">
        <span className="value">{counter}</span>
        <span className="label">Clicks</span>
      </div>
      <div className="buttons">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
          onClick={() => setCounter(c => c + 1)}
          className="btn-increment"
        >
          Incrementar
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
          onClick={() => setCounter(0)}
          className="btn-reset"
        >
          Reiniciar
        </motion.button>
      </div>
    </div>
  );
}

// Componente de FeatureCard reutilizable
function FeatureCard({ feature, isActive, onClick }) {
  return (
    <motion.div
      className={`card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(feature.id)}
      style={{ borderTop: `4px solid ${feature.color}` }}
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      data-aos="zoom-in"
      layout // Animación de layout con Framer Motion
    >
      <h3 style={{ color: feature.color }}>{feature.title}</h3>
      <p>{feature.description}</p>
      {isActive && (
        <motion.div 
          className="active-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ¡Seleccionado!
        </motion.div>
      )}
    </motion.div>
  );
}

function Home() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    { id: 1, title: "Interactivo", description: "Experimenta con estados y efectos.", color: "#8B5CF6" },
    { id: 2, title: "Responsive", description: "Diseño perfecto para cualquier dispositivo.", color: "#EC4899" },
    { id: 3, title: "Moderno", description: "Tecnologías de vanguardia.", color: "#3B82F6" }
  ];

  return (
    <PageWrapper>
      <div className="page">
        <section className="hero" data-aos="fade-up">
          <h2>Bienvenido a la Experiencia Premium</h2>
          <p className="subtitle">Contador interactivo con persistencia:</p>
          <Counter />
        </section>

        <section className="features">
          {features.map(feature => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              isActive={activeFeature === feature.id}
              onClick={setActiveFeature}
            />
          ))}
        </section>

        {/* Nueva sección de testimonios */}
        <section className="testimonials" data-aos="fade-up">
          <h3>Lo que dicen nuestros usuarios</h3>
          <div className="testimonial-carousel">
            <motion.div 
              className="testimonial"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p>"La mejor experiencia de usuario que he tenido"</p>
              <div className="author">- Carlos M.</div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

function About() {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <PageWrapper>
      <div className="page">
        <section className="about" data-aos="fade-right">
          <h2>Sobre Nosotros</h2>
          
          <div className="tabs">
            <button 
              className={activeTab === 'mission' ? 'active' : ''}
              onClick={() => setActiveTab('mission')}
            >
              Misión
            </button>
            <button 
              className={activeTab === 'vision' ? 'active' : ''}
              onClick={() => setActiveTab('vision')}
            >
              Visión
            </button>
            <button 
              className={activeTab === 'team' ? 'active' : ''}
              onClick={() => setActiveTab('team')}
            >
              Equipo
            </button>
          </div>
          
          <div className="content">
            <div className="text">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'mission' && (
                    <>
                      <h3>Nuestra Misión</h3>
                      <p>Crear experiencias web excepcionales que impulsen el éxito de nuestros clientes.</p>
                    </>
                  )}
                  {activeTab === 'vision' && (
                    <>
                      <h3>Nuestra Visión</h3>
                      <p>Ser líderes en innovación tecnológica para el 2030.</p>
                    </>
                  )}
                  {activeTab === 'team' && (
                    <>
                      <h3>Nuestro Equipo</h3>
                      <p>Profesionales apasionados por el desarrollo web y la experiencia de usuario.</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              
              <div className="tech-stack">
                <h4>Tecnologías que utilizamos:</h4>
                <div className="tech-icons">
                  <span>React</span>
                  <span>Vite</span>
                  <span>Framer Motion</span>
                  <span>Sass</span>
                </div>
              </div>
            </div>
            <motion.div 
              className="image-placeholder"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            ></motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '',
    subject: 'Consulta'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío a API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', subject: 'Consulta' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <PageWrapper>
      <div className="page">
        <section className="contact" data-aos="fade-left">
          <h2>Contacto</h2>
          
          {submitStatus === 'success' && (
            <motion.div 
              className="alert success"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ¡Gracias por tu mensaje! Te responderemos pronto.
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div 
              className="alert error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Hubo un error. Por favor intenta nuevamente.
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Asunto:</label>
              <select 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
              >
                <option value="Consulta">Consulta</option>
                <option value="Soporte">Soporte</option>
                <option value="Cotización">Cotización</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="5" 
              />
            </div>
            
            <motion.button
              type="submit"
              className="submit-btn"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03, backgroundColor: "#4f46e5" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                "Enviar Mensaje"
              )}
            </motion.button>
          </form>
          
          <div className="contact-info">
            <h3>Otras formas de contacto</h3>
            <p>Email: info@darksite.com</p>
            <p>Teléfono: +1 (555) 123-4567</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: 'ease-in-out-quad'
    });
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => {
    if (windowWidth <= 768) setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`app ${theme}-theme`}>
        <header className="header">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              {theme === 'dark' ? 'DarkSite' : 'LightSite'}
            </Link>
          </div>
          
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            <button
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>Inicio</Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMenu}>Sobre Nosotros</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu}>Contacto</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
                <li><Link to="/about" onClick={closeMenu}>Sobre Nosotros</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contacto</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contacto</h4>
              <p>email: info@darksite.com</p>
              <p>tel: +1 (555) 123-4567</p>
            </div>
            
            <div className="footer-section">
              <h4>Síguenos</h4>
              <div className="social-links">
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Facebook">👍</a>
                <a href="#" aria-label="Instagram">📷</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {theme === 'dark' ? 'DarkSite' : 'LightSite'} - Todos los derechos reservados</p>
            <button 
              className="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Volver arriba"
            >
              ↑
            </button>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;