// js/reservas-data.js

const RESERVAS_KEY = 'reservas_confirmadas';

/**
 * Obtiene todas las reservas guardadas desde localStorage.
 * @returns {Array} Un array de objetos de reserva.
 */
export function obtenerReservas() {
    return JSON.parse(localStorage.getItem(RESERVAS_KEY)) || [];
}

/**
 * Guarda una nueva reserva individual en localStorage.
 * @param {object} nuevaReserva - El objeto de la reserva a guardar.
 */
export function guardarReserva(nuevaReserva) {
    const reservas = obtenerReservas();
    reservas.push(nuevaReserva);
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
}

/**
 * Guarda una lista completa de reservas en localStorage.
 * Ideal para cuando se elimina un elemento.
 * @param {Array} lista - El array completo de reservas a guardar.
 */
export function guardarListaDeReservas(lista) {
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(lista));
}