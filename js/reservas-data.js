const RESERVAS_KEY = 'reservas_confirmadas';

export function obtenerReservas() {
    return JSON.parse(localStorage.getItem(RESERVAS_KEY)) || [];
}

export function guardarReserva(nuevaReserva) {
    const reservas = obtenerReservas();
    reservas.push(nuevaReserva);
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
}

export function guardarListaDeReservas(lista) {
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(lista));
}