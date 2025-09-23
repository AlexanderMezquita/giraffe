export const landingPageData = {
  navigation: {
    logo: "Salón de Belleza",
    menuItems: ["Servicios", "Acerca de", "Salón", "Contacto"],
    rightItems: ["ENGLISH", "🔍", "🛒"],
  },

  hero: {
    announcement: "BIENVENIDO/A",
    title: "EL MEJOR ESPACIO PARA CUIDAR TU PELO RIZO O AFRO",
    subtitle: "RESERVA TU CITA PARA UN CUIDADO PROFESIONAL EN TU CABELLO",
    ctaText: "Reserva tu Cita",
    ctaLink: "/citas",
    backgroundImage: "/images/hero-bg.jpg",
    heroImage: "/images/hero-model.jpg",
  },

  services: [
    {
      id: 1,
      title: "Cuidado Capilar Natural",
      description:
        "Tratamientos especializados diseñados específicamente para cabello texturizado y rizado",
      image: "/images/service-natural.jpg",
      icon: "AutoFixHigh",
    },
    {
      id: 2,
      title: "Servicios de Peinado",
      description:
        "Peinado profesional que realza tu belleza natural y textura",
      image: "/images/service-styling.jpg",
      icon: "Brush",
    },
    {
      id: 3,
      title: "Tratamientos Capilares",
      description:
        "Tratamientos nutritivos para restaurar y mantener un cabello saludable",
      image: "/images/service-treatments.jpg",
      icon: "Spa",
    },
    {
      id: 4,
      title: "Consulta",
      description:
        "Consulta personalizada de cuidado capilar para entender tus necesidades únicas",
      image: "/images/service-consultation.jpg",
      icon: "Chat",
    },
  ],

  features: [
    {
      id: 1,
      title: "Estilistas Expertos",
      description:
        "Nuestro equipo se especializa en el cuidado de cabello natural y texturizado",
      icon: "Person",
    },
    {
      id: 2,
      title: "Productos Premium",
      description:
        "Utilizamos solo productos de la más alta calidad para cabello natural",
      icon: "Star",
    },
    {
      id: 3,
      title: "Cuidado Personalizado",
      description:
        "Cada servicio está adaptado a las necesidades únicas de tu cabello",
      icon: "Favorite",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "María Rodríguez",
      text: "¡Por fin encontré un salón que realmente entiende mis rizos! El servicio fue increíble.",
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "Ana González",
      text: "Mi cabello nunca se ha visto mejor. ¡Los estilistas aquí son verdaderos artistas!",
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "Carmen Silva",
      text: "Profesionales, cariñosos, y realmente saben trabajar con cabello natural.",
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
  ],

  salon: {
    title: "Nuestro Salón Principal",
    description:
      "Descubre la experiencia completa de Ouidad: Identifica tu tipo de rizo, personaliza un corte para tu patrón único, y aprende cómo cuidar tus rizos entre visitas al salón.",
    image: "/images/salon-interior.jpg",
    location: {
      city: "Santiago De Los Caballeros",
      address: "Clodomiro Checo 15, Santiago de los Caballeros 51000",
      phone: "1 809 806 3040",
      ctaText: "Reservar Ahora",
    },
  },

  salonSecond: {
    title: "Experiencia Personalizada",
    description:
      "Nuestro equipo de expertos se dedica a entender las necesidades únicas de tu cabello. Con técnicas especializadas y productos premium, creamos un ambiente donde tu cabello natural puede brillar en todo su esplendor.",
    image: "/images/salon-interior-2.jpg",
    location: {
      city: "Santo Domingo",
      address: "Av. Winston Churchill, Plaza Central, Local 15",
      phone: "809 555 7890",
      ctaText: "Agendar Cita",
    },
  },

  colorScheme: {
    primary: "#9F436E", // Pink/Magenta
    secondary: "#13A3A3", // Teal
    accent: "#F472B6", // Light pink
    background: "#FEF7F0", // Warm beige
    text: "#1F2937", // Dark gray
    textLight: "#6B7280", // Light gray
  },
};
