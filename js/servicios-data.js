
export const SERVICIOS_KEY = 'servicios_adicionales';


export const serviciosIniciales = [
    {
        id: 1,
        nombre: 'Servicio de DJ Profesional',
        descripcion: 'La mejor música para tu evento. Nuestros DJs cuentan con una amplia variedad de géneros musicales y equipos de sonido e iluminación de última generación para crear el ambiente perfecto.',
        imagen: 'https://placehold.co/600x400/343a40/ffffff?text=DJ',
        precio: 15000,
    },
    {
        id: 2,
        nombre: 'Catering Exclusivo',
        descripcion: 'Deleita a tus invitados con nuestras propuestas gastronómicas. Ofrecemos desde cócteles y recepciones hasta menús completos de varios pasos, adaptados a tus gustos y necesidades.',
        imagen: 'https://placehold.co/600x400/007bff/ffffff?text=Catering',
        precio: 15000,
    },
    {
        id: 3,
        nombre: 'Animación y Entretenimiento',
        descripcion: 'Shows en vivo, magos, animadores y mucho más para que tu evento sea único y memorable. Coordinamos el entretenimiento ideal para todo tipo de celebración, tanto para adultos como para niños.',
        imagen: 'https://placehold.co/600x400/28a745/ffffff?text=Show',
        precio: 15000,
    }
];


export function inicializarServicios() {
    if (!localStorage.getItem(SERVICIOS_KEY)) {
        localStorage.setItem(SERVICIOS_KEY, JSON.stringify(serviciosIniciales));
    }
}


export function obtenerServicios() {
    return JSON.parse(localStorage.getItem(SERVICIOS_KEY)) || [];
}


export function guardarServicios(lista) {
    localStorage.setItem(SERVICIOS_KEY, JSON.stringify(lista));
}