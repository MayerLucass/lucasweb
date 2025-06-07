import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  const [counter, setCounter] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 1,
      title: "Interactivo",
      description: "Experimenta con estados y efectos.",
      color: "#8B5CF6"
    },
    {
      id: 2,
      title: "Responsive",
      description: "Diseño perfecto para cualquier dispositivo.",
      color: "#EC4899"
    },
    {
      id: 3,
      title: "Moderno",
      description: "Tecnologías de vanguardia.",
      color: "#3B82F6"
    }
  ];

  return (
    <div className="page">
      <section className="hero">
        <h2>Bienvenido a la Experiencia Premium</h2>
        <p className="subtitle">Contador interactivo:</p>
        
        <div className="counter-container">
          <div className="counter-display">
            <span className="value">{counter}</span>
            <span className="label">Clicks</span>
          </div>
          <div className="buttons">
            <button onClick={() => setCounter(c => c + 1)} className="btn-increment">
              Incrementar
            </button>
            <button onClick={() => setCounter(0)} className="btn-reset">
              Reiniciar
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        {features.map(feature => (
          <div 
            key={feature.id}
            className={`card ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
            style={{ borderTop: `4px solid ${feature.color}` }}
          >
            <h3 style={{ color: feature.color }}>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <section className="about">
        <h2>Sobre Nosotros</h2>
        <div className="content">
          <div className="text">
            <p>Somos especialistas en desarrollo web con tecnologías modernas:</p>
            <ul>
              <li>React + Vite</li>
              <li>Diseño responsive</li>
              <li>Interfaces interactivas</li>
            </ul>
          </div>
          <div className="image-placeholder"></div>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${formData.name}, tu mensaje ha sido enviado!`);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <section className="contact">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Tu nombre" 
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
              placeholder="tu@email.com" 
            />
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
              placeholder="Escribe tu mensaje"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Enviar Mensaje</button>
        </form>
      </section>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
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
    if (windowWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <Router>
      <div className="app dark-theme">
        <header className="header">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>DarkSite</Link>
          </div>

          <button 
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
              <li><Link to="/about" onClick={closeMenu}>Sobre Nosotros</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contacto</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 DarkSite - Todos los derechos reservados</p>
          <div className="links">
            <Link to="/" onClick={closeMenu}>Inicio</Link>
            <Link to="/about" onClick={closeMenu}>Sobre Nosotros</Link>
            <Link to="/contact" onClick={closeMenu}>Contacto</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;