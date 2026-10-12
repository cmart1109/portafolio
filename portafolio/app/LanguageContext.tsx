"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Language = "es" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-lang";
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", emitChange);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", emitChange);
  };
}

function getSnapshot(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "es" || saved === "en" ? saved : "es";
}

function getServerSnapshot(): Language {
  return "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep the document language in sync (a11y + SEO)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    emitChange();
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
    "about.locationVal": "Honduras (Remoto)",
    "about.experience": "Experiencia",
    "about.experienceVal": "3+ Años como Fullstack",
    "about.focus": "Enfoque Principal",
    "about.focusVal": "React, Next.js, Node & REST",
    "about.job": "Trabajo",
    "about.jobVal": "Freelance / Tiempo Completo",
    
    "education.intro": "Educación",
    "education.title": "Formación Académica",
    "education.degree": "B.S. en Desarrollo de Software",
    "education.school": "BYU-Idaho",
    "education.program": "Programa en línea a través de BYU-Pathway Worldwide, con enfoque en fundamentos de ingeniería de software y desarrollo de aplicaciones web.",
    "education.status": "En curso",
    
    "stats.years": "Años de experiencia",
    "stats.technologies": "Tecnologías",
    "stats.projects": "Proyectos destacados",
    "stats.remote": "Trabajo remoto",
    
    "skills.intro": "Tecnologías",
    "skills.title": "Mis Habilidades",
    "skills.tab1": "FrontEnd",
    "skills.tab2": "BackEnd",
    "skills.tab3": "Otros",
    
    "process.intro": "Metodología",
    "process.title": "Cómo trabajo",
    "process.description": "Un proceso claro y transparente, desde la idea hasta el despliegue.",
    "process.step1.title": "Descubrimiento",
    "process.step1.desc": "Entiendo el objetivo, los usuarios y los requisitos antes de escribir una sola línea de código.",
    "process.step2.title": "Diseño",
    "process.step2.desc": "Defino la arquitectura técnica y el sistema visual priorizando usabilidad, contraste y accesibilidad.",
    "process.step3.title": "Desarrollo",
    "process.step3.desc": "Construyo con componentes reutilizables, tipado estricto y el rendimiento como prioridad.",
    "process.step4.title": "Entrega",
    "process.step4.desc": "Despliego, mido resultados y acompaño con soporte y mejoras continuas.",
    
    "projects.intro": "Portafolio",
    "projects.title": "Proyectos Destacados",
    "projects.typeAcademic": "Proyecto universitario",
    "projects.typePersonal": "Proyecto personal",
    "projects.project1.title": "MarkPad",
    "projects.project1.desc": "Un editor de Markdown en el navegador con vista previa renderizada en vivo. Incluye cuentas de usuario, CRUD de documentos organizados por proyectos, autoguardado y enlaces públicos de solo lectura, integrando Monaco Editor mediante interoperabilidad JavaScript en Blazor.",
    "projects.project1.h1": "Editor de código Monaco con resaltado de sintaxis y vista previa en vivo.",
    "projects.project1.h2": "Autenticación y CRUD de documentos por proyecto con Entity Framework Core.",
    "projects.project1.h3": "Autoguardado, enlaces públicos de solo lectura y HTML sanitizado.",
    "projects.project2.title": "Whisp",
    "projects.project2.desc": "Un clon de red social inspirado en X donde puedes publicar, comentar y dar 'me gusta' a las publicaciones de otros, con autenticación de usuarios. Construido con Next.js, TypeScript, Prisma y Chakra UI.",
    "projects.project2.h1": "Publicaciones, comentarios y 'me gusta' con autenticación de usuarios.",
    "projects.project2.h2": "Prisma como ORM y Chakra UI para una interfaz responsive.",
    "projects.project2.h3": "Desplegado en Vercel con Next.js y TypeScript.",
    "projects.code": "Código",
    "projects.demo": "Demo",
    
    "contact.title": "¿Tienes un proyecto en mente?",
    "contact.desc": "Estoy disponible para trabajos freelance, consultorías o posiciones de tiempo completo. Escríbeme y hablemos de cómo puedo ayudarte.",
    "contact.copied": "¡Copiado!",
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
    "about.locationVal": "Honduras (Remote)",
    "about.experience": "Experience",
    "about.experienceVal": "3+ Years as Fullstack",
    "about.focus": "Main Focus",
    "about.focusVal": "React, Next.js, Node & REST",
    "about.job": "Availability",
    "about.jobVal": "Freelance / Full Time",
    
    "education.intro": "Education",
    "education.title": "Academic Background",
    "education.degree": "B.S. in Software Development",
    "education.school": "BYU-Idaho",
    "education.program": "Online program through BYU-Pathway Worldwide, focused on software engineering fundamentals and web application development.",
    "education.status": "In progress",
    
    "stats.years": "Years of experience",
    "stats.technologies": "Technologies",
    "stats.projects": "Featured projects",
    "stats.remote": "Remote work",
    
    "skills.intro": "Technologies",
    "skills.title": "My Skills",
    "skills.tab1": "FrontEnd",
    "skills.tab2": "BackEnd",
    "skills.tab3": "Others",
    
    "process.intro": "Methodology",
    "process.title": "How I work",
    "process.description": "A clear and transparent process, from idea to deployment.",
    "process.step1.title": "Discovery",
    "process.step1.desc": "I understand the goal, the users, and the requirements before writing a single line of code.",
    "process.step2.title": "Design",
    "process.step2.desc": "I define the technical architecture and the visual system, prioritizing usability, contrast, and accessibility.",
    "process.step3.title": "Development",
    "process.step3.desc": "I build with reusable components, strict typing, and performance as a priority.",
    "process.step4.title": "Delivery",
    "process.step4.desc": "I deploy, measure results, and follow up with support and continuous improvements.",
    
    "projects.intro": "Portfolio",
    "projects.title": "Featured Projects",
    "projects.typeAcademic": "University project",
    "projects.typePersonal": "Personal project",
    "projects.project1.title": "MarkPad",
    "projects.project1.desc": "A browser-based Markdown editor with a live rendered preview. It includes user accounts, document CRUD organized by project, autosave, and read-only public share links, integrating Monaco Editor through JavaScript interop in Blazor.",
    "projects.project1.h1": "Monaco code editor with syntax highlighting and a live preview pane.",
    "projects.project1.h2": "Authentication and per-project document CRUD with Entity Framework Core.",
    "projects.project1.h3": "Autosave, read-only public share links, and sanitized HTML output.",
    "projects.project2.title": "Whisp",
    "projects.project2.desc": "A social media clone inspired by X where you can post, comment, and like other people's posts, with user authentication. Built with Next.js, TypeScript, Prisma, and Chakra UI.",
    "projects.project2.h1": "Posts, comments, and likes with user authentication.",
    "projects.project2.h2": "Prisma as the ORM and Chakra UI for a responsive interface.",
    "projects.project2.h3": "Deployed on Vercel with Next.js and TypeScript.",
    "projects.code": "Code",
    "projects.demo": "Demo",
    
    "contact.title": "Have a project in mind?",
    "contact.desc": "I am available for freelance work, consulting, or full-time positions. Write me and let's talk about how I can help you.",
    "contact.copied": "Copied!",
    "contact.toastTitle": "Email Copied",
    "contact.toastDesc": "The email address has been copied to your clipboard.",
    
    "footer.rights": "Christian André Martinez. All rights reserved.",
    "footer.top": "Back to top",
    "footer.cv": "Download CV"
  }
};
