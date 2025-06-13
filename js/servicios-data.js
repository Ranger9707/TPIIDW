// servicios-data.js
export const SERVICIOS_KEY = 'servicios_adicionales';

// Datos iniciales de los servicios
export const serviciosIniciales = [
    {
        id: 1,
        nombre: 'Servicio de DJ Profesional',
        descripcion: 'La mejor música para tu evento. Nuestros DJs cuentan con una amplia variedad de géneros musicales y equipos de sonido e iluminación de última generación para crear el ambiente perfecto.',
        imagen: 'https://placehold.co/600x400/343a40/ffffff?text=DJ'
    },
    {
        id: 2,
        nombre: 'Catering Exclusivo',
        descripcion: 'Deleita a tus invitados con nuestras propuestas gastronómicas. Ofrecemos desde cócteles y recepciones hasta menús completos de varios pasos, adaptados a tus gustos y necesidades.',
        imagen: 'https://placehold.co/600x400/007bff/ffffff?text=Catering'
    },
    {
        id: 3,
        nombre: 'Animación y Entretenimiento',
        descripcion: 'Shows en vivo, magos, animadores y mucho más para que tu evento sea único y memorable. Coordinamos el entretenimiento ideal para todo tipo de celebración, tanto para adultos como para niños.',
        imagen: 'https://placehold.co/600x400/28a745/ffffff?text=Show'
    }
];

/**
 * Inicializa los servicios en localStorage si no existen.
 */
export function inicializarServicios() {
    if (!localStorage.getItem(SERVICIOS_KEY)) {
        localStorage.setItem(SERVICIOS_KEY, JSON.stringify(serviciosIniciales));
    }
}

/**
 * Obtiene la lista de servicios desde localStorage.
 * @returns {Array} La lista de servicios.
 */
export function obtenerServicios() {
    return JSON.parse(localStorage.getItem(SERVICIOS_KEY)) || [];
}

/**
 * Guarda la lista de servicios en localStorage.
 * @param {Array} lista - La lista de servicios a guardar.
 */
export function guardarServicios(lista) {
    localStorage.setItem(SERVICIOS_KEY, JSON.stringify(lista));
}