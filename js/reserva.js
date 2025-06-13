
import { obtenerSalones } from './salones-data.js';
import { obtenerServicios } from './servicios-data.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const salonId = parseInt(urlParams.get("salon"));

    const salones = obtenerSalones();
    const servicios = obtenerServicios();

    const salonSeleccionado = salones.find(s => s.id === salonId);

    if (!salonSeleccionado) {
        document.querySelector('main').innerHTML = '<h2 class="text-center text-danger">Error: Salón no encontrado.</h2>';
        return;
    }

    // dom
    const tituloSalon = document.getElementById('nombre-salon-titulo');
    const contenedorServicios = document.getElementById('contenedor-servicios');
    const detallePresupuesto = document.getElementById('presupuesto-detalle');
    const totalPresupuesto = document.getElementById('presupuesto-total');
    const formReserva = document.getElementById('formReserva');

    // UI
    tituloSalon.textContent = `Reservar: ${salonSeleccionado.nombre}`;

    // checkboxes para servicios
    servicios.forEach(servicio => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${servicio.id}" id="servicio-${servicio.id}" data-precio="${servicio.precio}">
            <label class="form-check-label" for="servicio-${servicio.id}">
                ${servicio.nombre} (+ $${servicio.precio.toLocaleString()})
            </label>
        `;
        contenedorServicios.appendChild(div);
    });

    // actualiza el presupuesto
    const actualizarPresupuesto = () => {
        let total = salonSeleccionado.precio;
        let detalleHtml = `<p class="d-flex justify-content-between"><span>Costo del Salón:</span> <strong>$${salonSeleccionado.precio.toLocaleString()}</strong></p>`;
        
        const serviciosSeleccionados = document.querySelectorAll('#contenedor-servicios input:checked');
        
        if (serviciosSeleccionados.length > 0) {
            detalleHtml += '<hr><h6>Servicios Adicionales:</h6>';
            serviciosSeleccionados.forEach(input => {
                const precio = parseInt(input.dataset.precio);
                const nombre = input.nextElementSibling.textContent.split('(+')[0].trim();
                total += precio;
                detalleHtml += `<p class="d-flex justify-content-between"><span>${nombre}</span> <strong>$${precio.toLocaleString()}</strong></p>`;
            });
        }
        
        detallePresupuesto.innerHTML = detalleHtml;
        totalPresupuesto.textContent = `$${total.toLocaleString()}`;
    };

    // Event listener para los checkboxes
    contenedorServicios.addEventListener('change', actualizarPresupuesto);

    // Event listener para el formulario
    formReserva.addEventListener("submit", (e) => {
        e.preventDefault();
        const totalFinal = totalPresupuesto.textContent;
        alert(`¡Reserva enviada con éxito! El total de su presupuesto es: ${totalFinal}`);
        e.target.reset();
        actualizarPresupuesto(); // Resetear el presupuesto visual
    });
    
    // Carga inicial del presupuesto
    actualizarPresupuesto();
});