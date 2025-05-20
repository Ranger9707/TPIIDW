// Archivo de lógica CRUD y datos iniciales para salones de eventos

export const SALONES_INICIALES = [
    {
      id: 1,
      nombre: "Espacio Álamo",
      descripcion: "Funcional y accesible, pensado para talleres, capacitaciones, reuniones empresariales y encuentros profesionales.",
      capacidad: 60,
      direccion: "Av. Rivadavia 17555 – Ramos Mejía, Buenos Aires.",
      imagenes: ["Recursos/Salon3.jpg", "Recursos/salon_c.jpg"]
    },
    {
      id: 2,
      nombre: "Espacio Norte",
      descripcion: "Amplio y funcional, este salón se adapta tanto a eventos sociales como empresariales.",
      capacidad: 180,
      direccion: "Av. San Martín 5124 – Agronomía, CABA.",
      imagenes: ["Recursos/Salon3.jpg", "Recursos/salon_c.jpg"]
    },
    {
      id: 3,
      nombre: "Terraza Río",
      descripcion: "Con vistas panorámicas y un ambiente moderno, Terraza Río es ideal para celebraciones al atardecer, cócteles ejecutivos y fiestas exclusivas.",
      capacidad: 130,
      direccion: "Av. España 2250 – Costanera Sur, CABA.",
      imagenes: ["Recursos/Salon3.jpg", "Recursos/salon_c.jpg"]
    }
  ];
  
  // Inicializa LocalStorage con los datos iniciales si es la primera vez que se visita el sitio
  export function inicializarSalones() {
    if (!localStorage.getItem("salones")) {
      localStorage.setItem("salones", JSON.stringify(SALONES_INICIALES));
    }
  }
  
  export function obtenerSalones() {
    return JSON.parse(localStorage.getItem("salones")) || [];
  }
  
  export function guardarSalones(salones) {
    localStorage.setItem("salones", JSON.stringify(salones));
  }
  
  export function agregarSalon(salon) {
    const salones = obtenerSalones();
    salon.id = Date.now(); // id único por timestamp
    salones.push(salon);
    guardarSalones(salones);
  }
  
  export function modificarSalon(id, datosActualizados) {
    let salones = obtenerSalones();
    salones = salones.map(salon =>
      salon.id === id ? { ...salon, ...datosActualizados } : salon
    );
    guardarSalones(salones);
  }
  
  export function eliminarSalon(id) {
    let salones = obtenerSalones();
    salones = salones.filter(salon => salon.id !== id);
    guardarSalones(salones);
  }