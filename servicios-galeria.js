// servicios-galeria.js
import { inicializarServicios, obtenerServicios } from './servicios-data.js';

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa los datos si es la primera vez que se carga
    inicializarServicios();

    const servicios = obtenerServicios();
    const contenedor = document.getElementById('contenedor-servicios');

    if (contenedor && servicios.length > 0) {
        contenedor.innerHTML = ''; // Limpiamos el contenedor por si acaso
        servicios.forEach((servicio) => {
            const div = document.createElement('div');
            div.className = 'col-lg-4 col-md-6';

            div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${servicio.nombre}</h5>
                    <p class="card-text">${servicio.descripcion}</p>
                    <a href="contacto.html" class="btn btn-custom mt-auto">Consultar</a>
                </div>
            </div>`;

            contenedor.appendChild(div);
        });
    }
});