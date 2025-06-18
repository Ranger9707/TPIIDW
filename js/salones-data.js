
export const SALONES_KEY = 'salones_eventos';


export const salonesIniciales = [
    {
        id: 1,
        nombre: 'Salón Aurora',
        descripcion: 'Un espacio versátil y luminoso, ideal para celebraciones familiares, cumpleaños infantiles y reuniones sociales. Cuenta con juegos para niños, cocina equipada y patio al aire libre. Capacidad: hasta 100 personas.',
        direccion: 'Av. Directorio 3245 – Parque Chacabuco, CABA',
        imagenes: ['Recursos/Salon1.jpg', 'Recursos/Salon_a.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },
    {
        id: 2,
        nombre: 'Espacio Ébano',
        descripcion: 'Diseñado para eventos corporativos y lanzamientos de productos, este salón moderno ofrece tecnología audiovisual de última generación, sala VIP y catering ejecutivo. Capacidad: hasta 80 personas.',
        direccion: 'Calle Suipacha 935 – Microcentro, CABA.',
        imagenes: ['Recursos/Salon2.jpg', 'Recursos/salon_b.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },
    {
        id: 3,
        nombre: 'Jardín del Sol',
        descripcion: 'Rodeado de naturaleza, este salón al aire libre es perfecto para eventos diurnos, celebraciones campestres y encuentros informales. Posee quincho, pileta y área de juegos. Capacidad: hasta 150 personas.',
        direccion: 'Av. de los Incas 4520 – Villa Urquiza, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },
    {
        id: 4,
        nombre: 'Salón Velvet',
        descripcion: 'Ambiente elegante y sofisticado, ideal para fiestas de 15, bodas y aniversarios. Decoración glamorosa, pista de baile y servicio de ambientación personalizado. Capacidad: hasta 200 personas.',
        direccion: 'Pje. Bollini 1486 – Palermo Chico, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },
    {
        id: 5,
        nombre: 'Espacio Álamo',
        descripcion: 'Funcional y accesible, pensado para talleres, capacitaciones, reuniones empresariales y encuentros profesionales. WiFi de alta velocidad, proyector y mobiliario adaptable. Capacidad: hasta 60 personas.',
        direccion: 'Av. Rivadavia 17555 – Ramos Mejía, Buenos Aires.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },
    {
        id: 6,
        nombre: 'Salón Luna Park',
        descripcion: 'Temático y divertido, ideal para cumpleaños infantiles y fiestas con animación. Incluye inflables, luces de colores, escenario y cabina de DJ. Capacidad: hasta 90 personas.',
        direccion: 'Av. Belgrano 3785 – Almagro, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg'],
        precio: 144000,
        estado: 'Disponible'
    },

];



export function inicializarSalones() {
    if (!localStorage.getItem(SALONES_KEY)) {
        localStorage.setItem(SALONES_KEY, JSON.stringify(salonesIniciales));
    }
}


export function obtenerSalones() {
    return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}


export function guardarSalones(lista) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(lista));
}