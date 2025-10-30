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
    ctaLink:
      "https://wa.me/18098063040?text=Hola! Me gustaría agendar una cita",
    backgroundImage: "/images/hero-bg.jpg",
    heroImage: "/images/hero-model.jpg",
  },

  services: [
    {
      id: 1,
      title: "Productos para tu cabello rizo",
      description:
        "Tratamientos especializados diseñados específicamente para cabello texturizado y rizado",
      image: "/ram1.jpg",
      icon: "AutoFixHigh",
    },
    {
      id: 2,
      title: "Servicios de Peinado",
      description:
        "Peinado profesional que realza tu belleza natural y textura",
      image: "/peinado.jpg",
      icon: "Brush",
    },
    {
      id: 3,
      title: "Tratamientos Capilares",
      description:
        "Tratamientos nutritivos para restaurar y mantener un cabello saludable",
      image: "/aceite.jpg",
      icon: "Spa",
    },
    {
      id: 4,
      title: "Consulta",
      description:
        "Consulta personalizada de cuidado capilar para entender tus necesidades únicas",
      image: "/consulta.jpg",
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
    title: "Nuestros Salones",
    description: "",
    image: "/images/salon-interior.jpg",
    location: {
      city: "Cerros de Gurabo",
      address: "Clodomiro Checo 15, Santiago de los Caballeros",
      phone: "1 809 806 3040",
      ctaText: "Agendar Cita",
    },
  },

  salonSecond: {
    location: {
      city: "Los Pepines",
      address: "Calle RC, C. R. Tolentino 47, Santiago de los Caballeros",
      phone: "1 809 626 0101",
      ctaText: "Agendar Cita",
    },
  },

  // Beautiful Curls Section
  beautifulCurls: {
    images: [
      { src: "/portada.jpg", alt: "Professional salon business" },
      { src: "/ram2.jpg", alt: "Hair products" },
      { src: "/car-1.jpg", alt: "Hair styling" },
      { src: "/car-2.jpg", alt: "Hair oil treatment" },
    ],
  },

  // Specialty Info Section
  specialtyInfo: {
    title: "Especializados en Cabello Rizado y Afro",
    description:
      "Rizos Afros y Más nació con la misión de apoyar y empoderar a todas las personas que desean lucir su cabello natural con orgullo. Creemos firmemente que cada textura cuenta una historia única y merece ser celebrada sin prejuicios ni estigmas. Por eso, ofrecemos un espacio seguro y especializado donde cuidamos, educamos y realzamos la belleza auténtica de los rizos y afros.",
    features: [
      {
        id: 1,
        title: "Técnicas Especializadas",
        description:
          "Métodos profesionales específicos para cabello rizado y afro",
        icon: "check",
      },
      {
        id: 2,
        title: "Productos Premium",
        description:
          "Solo utilizamos productos de la más alta calidad para tu cabello",
        icon: "star",
      },
      {
        id: 3,
        title: "Atención Personalizada",
        description:
          "Cada cliente recibe un tratamiento único adaptado a sus necesidades",
        icon: "person",
      },
    ],
  },

  // Image Panels Section
  imagePanels: [
    {
      id: 1,
      image: "/indhira.jpg",
      alt: "Indhira - Estilista profesional",
    },
    {
      id: 2,
      image: "/portada.jpg",
      alt: "Portada del salón",
    },
    {
      id: 3,
      image: "/rossaly.jpg",
      alt: "Rossaly - Tratamientos capilares",
      ctaText: "Reservar Ahora",
    },
  ],

  // Social Media Links
  socialMedia: {
    instagram: "https://www.instagram.com/rizosafrosymas",
    facebook: "https://www.facebook.com/rizosafrosymas.rd",
    whatsapp: "18098063040",
  },

  // WhatsApp Buttons Configuration
  whatsappButtons: [
    {
      id: 1,
      text: "Cerros de Gurabo",
      phone: "18098063040",
    },
    {
      id: 2,
      text: "Los Pepines",
      phone: "18096260101",
    },
  ],

  colorScheme: {
    primary: "#9F436E", // Pink/Magenta
    secondary: "#13A3A3", // Teal
    accent: "#F472B6", // Light pink
    background: "#FEF7F0", // Warm beige
    text: "#1F2937", // Dark gray
    textLight: "#6B7280", // Light gray
    logoGreen: "#8BC34A", // Brand green color
  },
};
