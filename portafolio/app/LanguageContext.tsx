"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Language;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["es"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    
    "hero.status": "Disponible para nuevos retos",
    "hero.subtitle": "Fullstack Developer & UI Designer",
    "hero.description": "Me apasiona crear aplicaciones web modernas combinando un código robusto con experiencias visuales e interacciones fluidas. Transformo ideas en productos digitales de nivel premium.",
    "hero.btnProjects": "Proyectos",
    "hero.btnTalk": "Hablemos",
    
    "about.intro": "Introducción",
    "about.title": "Sobre Mí",
    "about.p1": "Soy desarrollador fullstack con gran afinidad por el diseño de interfaces y la usabilidad. Creo que el código eficiente no debe estar peleado con un diseño visual impactante y limpio.",
    "about.p2": "Me enfoco en crear soluciones escalables, optimizar el rendimiento y colaborar estrechamente con equipos para materializar visiones de productos modernos. Siempre me encuentro aprendiendo nuevas tendencias y expandiendo mis habilidades técnicas.",
    "about.techCardTitle": "Ficha Técnica",
    "about.location": "Ubicación",
    "about.locationVal": "El Salvador (Remoto)",
    "about.experience": "Experiencia",
    "about.experienceVal": "3+ Años como Fullstack",
    "about.focus": "Enfoque Principal",
    "about.focusVal": "React, Next.js, Node & REST",
    "about.job": "Trabajo",
    "about.jobVal": "Freelance / Tiempo Completo",
    
    "skills.intro": "Tecnologías",
    "skills.title": "Mis Habilidades",
    "skills.tab1": "FrontEnd",
    "skills.tab2": "BackEnd",
    "skills.tab3": "Otros",
    
    "projects.intro": "Portafolio",
    "projects.title": "Proyectos Destacados",
    "projects.project1.title": "DevFlow Dashboard",
    "projects.project1.desc": "Un panel interactivo para desarrolladores con analíticas en tiempo real, gestión de tareas y visualización de progreso. Diseñado con una interfaz moderna y animaciones interactivas.",
    "projects.project2.title": "SmartStore API",
    "projects.project2.desc": "Una API REST robusta y segura construida para comercio electrónico. Incluye autenticación JWT, integración con pasarelas de pago, gestión de productos y control de stock.",
    "projects.code": "Código",
    "projects.demo": "Demo",
    
    "contact.title": "¿Tienes un proyecto en mente?",
    "contact.desc": "Estoy disponible para trabajos freelance, consultorías o posiciones de tiempo completo. Escríbeme y hablemos de cómo puedo ayudarte.",
    "contact.toastTitle": "Correo Copiado",
    "contact.toastDesc": "El correo electrónico ha sido copiado al portapapeles.",
    
    "footer.rights": "Christian André Martinez. Todos los derechos reservados.",
    "footer.top": "Volver arriba",
    "footer.cv": "Descargar CV"
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    "hero.status": "Available for new challenges",
    "hero.subtitle": "Fullstack Developer & UI Designer",
    "hero.description": "I am passionate about creating modern web applications combining robust code with smooth visual experiences and interactions. I transform ideas into premium digital products.",
    "hero.btnProjects": "Projects",
    "hero.btnTalk": "Let's talk",
    
    "about.intro": "Introduction",
    "about.title": "About Me",
    "about.p1": "I am a fullstack developer with a strong affinity for UI design and usability. I believe that efficient code doesn't have to fight with an impactful and clean visual design.",
    "about.p2": "I focus on creating scalable solutions, optimizing performance, and collaborating closely with teams to realize modern product visions. I am always learning new trends and expanding my technical skills.",
    "about.techCardTitle": "Technical Profile",
    "about.location": "Location",
    "about.locationVal": "El Salvador (Remote)",
    "about.experience": "Experience",
    "about.experienceVal": "3+ Years as Fullstack",
    "about.focus": "Main Focus",
    "about.focusVal": "React, Next.js, Node & REST",
    "about.job": "Availability",
    "about.jobVal": "Freelance / Full Time",
    
    "skills.intro": "Technologies",
    "skills.title": "My Skills",
    "skills.tab1": "FrontEnd",
    "skills.tab2": "BackEnd",
    "skills.tab3": "Others",
    
    "projects.intro": "Portfolio",
    "projects.title": "Featured Projects",
    "projects.project1.title": "DevFlow Dashboard",
    "projects.project1.desc": "An interactive developer dashboard with real-time analytics, task management, and progress visualization. Designed with a modern interface and interactive animations.",
    "projects.project2.title": "SmartStore API",
    "projects.project2.desc": "A robust and secure REST API built for e-commerce. Includes JWT authentication, payment gateway integration, product management, and stock control.",
    "projects.code": "Code",
    "projects.demo": "Demo",
    
    "contact.title": "Have a project in mind?",
    "contact.desc": "I am available for freelance work, consulting, or full-time positions. Write me and let's talk about how I can help you.",
    "contact.toastTitle": "Email Copied",
    "contact.toastDesc": "The email address has been copied to your clipboard.",
    
    "footer.rights": "Christian André Martinez. All rights reserved.",
    "footer.top": "Back to top",
    "footer.cv": "Download CV"
  }
};
