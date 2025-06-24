import { inicializarServicios, obtenerServicios } from './servicios-data.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarServicios();

    const servicios = obtenerServicios();
    const contenedor = document.getElementById('contenedor-servicios');

    if (contenedor && servicios.length > 0) {
        contenedor.innerHTML = '';
        servicios.forEach((servicio) => {
            const div = document.createElement('div');
            div.className = 'col-lg-4 col-md-6';

            div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${servicio.nombre}</h5>
                    <p class="card-text">${servicio.descripcion}</p>
                    <p class="mt-2"><strong>Precio:</strong> $${servicio.precio.toLocaleString()}</p>
                    <a href="contacto.html" class="btn btn-custom mt-auto">Consultar</a>
                </div>
            </div>`;

            contenedor.appendChild(div);
        });
    }
});