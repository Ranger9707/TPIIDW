import { obtenerSalones, guardarSalones } from './salones-data.js';
import { obtenerServicios, inicializarServicios } from './servicios-data.js';
import { guardarReserva } from './reservas-data.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarServicios();

    const urlParams = new URLSearchParams(window.location.search);
    const salonId = parseInt(urlParams.get("salon"));

    const todosLosSalones = obtenerSalones();
    const servicios = obtenerServicios();

    const salonSeleccionado = todosLosSalones.find(s => s.id === salonId);

    if (!salonSeleccionado) {
        document.querySelector('main').innerHTML = '<h2 class="text-center text-danger">Error: Salón no encontrado.</h2>';
        return;
    }


    const tituloSalon = document.getElementById('nombre-salon-titulo');
    const contenedorServicios = document.getElementById('contenedor-servicios');
    const detallePresupuesto = document.getElementById('presupuesto-detalle');
    const totalPresupuestoElem = document.getElementById('presupuesto-total');
    const formReserva = document.getElementById('formReserva');

    if (!formReserva) return; 

    tituloSalon.textContent = `Reservar: ${salonSeleccionado.nombre}`;

    // Generar checkboxes para los servicios
    servicios.forEach(servicio => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${servicio.id}" id="servicio-${servicio.id}" data-precio="${servicio.precio}">
            <label class="form-check-label" for="servicio-${servicio.id}">
                ${servicio.nombre} (+ $${(servicio.precio || 0).toLocaleString()})
            </label>
        `;
        contenedorServicios.appendChild(div);
    });

    // Función para actualizar el presupuesto
    const actualizarPresupuesto = () => {
        let total = salonSeleccionado.precio;
        let detalleHtml = `<p class="d-flex justify-content-between"><span>Costo del Salón:</span> <strong>$${(salonSeleccionado.precio || 0).toLocaleString()}</strong></p>`;
        
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
        totalPresupuestoElem.textContent = `$${total.toLocaleString()}`;
    };

    // Event listener para los checkboxes de servicios
    contenedorServicios.addEventListener('change', actualizarPresupuesto);

    // Event listener para el formulario
    formReserva.addEventListener("submit", (e) => {
        e.preventDefault(); // Detenemos el envío normal del formulario

        console.log("Evento 'submit' detectado. Iniciando proceso de reserva...");

        try {
            const serviciosSeleccionados = Array.from(document.querySelectorAll('#contenedor-servicios input:checked'))
                .map(input => ({
                    id: parseInt(input.value),
                    nombre: input.nextElementSibling.textContent.split('(+')[0].trim(),
                    precio: parseInt(input.dataset.precio)
                }));

            const nuevaReserva = {
                id: Date.now(),
                cliente: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                fecha: document.getElementById('fecha').value,
                horario: document.getElementById('horario').value,
                salon: {
                    id: salonSeleccionado.id,
                    nombre: salonSeleccionado.nombre,
                    precio: salonSeleccionado.precio
                },
                servicios: serviciosSeleccionados,
                total: totalPresupuestoElem.textContent
            };

            console.log("Guardando la reserva...");
            guardarReserva(nuevaReserva);
            console.log("Reserva guardada en localStorage.");

            console.log("Actualizando estado del salón...");
            const salonIndex = todosLosSalones.findIndex(s => s.id === salonSeleccionado.id);
            if (salonIndex !== -1) {
                todosLosSalones[salonIndex].estado = 'Reservado';
                guardarSalones(todosLosSalones);
                console.log("Estado del salón guardado.");
            } else {
                console.error("No se encontró el índice del salón para actualizar.");
            }

            console.log("Redirigiendo a confirmacionReserva.html...");
            window.location.href = 'confirmacionReserva.html';

        } catch (error) {
            console.error("Ocurrió un error durante el proceso de reserva:", error);
            alert("Hubo un error al procesar tu reserva. Por favor, intenta de nuevo.");
        }
    });
    
    actualizarPresupuesto();
});