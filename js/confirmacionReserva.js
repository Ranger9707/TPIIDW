import { obtenerReservas } from './reservas-data.js';

document.addEventListener("DOMContentLoaded", () => {
    const contenedorDetalle = document.getElementById('detalle-reserva-confirmada');
    const reservas = obtenerReservas();

    if (!contenedorDetalle || reservas.length === 0) {
        if(contenedorDetalle) contenedorDetalle.innerHTML = '<p class="text-danger">No se encontró ninguna reserva.</p>';
        return;
    }

    // Obtenemos la última reserva guardada, que es la que se acaba de hacer.
    const ultimaReserva = reservas[reservas.length - 1];

    // Creamos el HTML con los detalles de la reserva.
    let serviciosHtml = '';
    if (ultimaReserva.servicios && ultimaReserva.servicios.length > 0) {
        serviciosHtml = `
            <h6>Servicios Adicionales:</h6>
            <ul>
                ${ultimaReserva.servicios.map(s => `<li>${s.nombre}</li>`).join('')}
            </ul>
        `;
    } else {
        serviciosHtml = '<p>No se seleccionaron servicios adicionales.</p>';
    }

    contenedorDetalle.innerHTML = `
        <h5 class="mb-3">Resumen de tu Reserva</h5>
        <p><strong>Nro. de Confirmación:</strong> ${ultimaReserva.id}</p>
        <p><strong>A nombre de:</strong> ${ultimaReserva.cliente}</p>
        <p><strong>Email de contacto:</strong> ${ultimaReserva.email}</p>
        <p><strong>Salón Reservado:</strong> ${ultimaReserva.salon.nombre}</p>
        <p><strong>Fecha del Evento:</strong> ${ultimaReserva.fecha}</p>
        <hr>
        ${serviciosHtml}
        <hr>
        <div class="d-flex justify-content-between">
            <h5 class="mb-0">Total del Presupuesto:</h5>
            <h5 class="mb-0">${ultimaReserva.total}</h5>
        </div>
    `;
});