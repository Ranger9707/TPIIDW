import { inicializarSalones, obtenerSalones } from './salones-data.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarSalones();
    const salones = obtenerSalones();
    const contenedor = document.getElementById('contenedor-salones');

    if (contenedor && salones.length > 0) {
        contenedor.innerHTML = '';
        salones.forEach((salon) => {
            const div = document.createElement('div');
            div.className = `col-md-4 ${salon.estado === 'Reservado' ? 'salon-reservado' : ''}`;

            const precioFormateado = (salon.precio || 0).toLocaleString();

            // Lógica para crear el botón correcto según el estado del salón
            let botonHtml = '';
            let badgeHtml = '';

            if (salon.estado === 'Reservado') {
                badgeHtml = '<span class="badge bg-danger position-absolute top-0 start-0 m-2">Reservado</span>';
                botonHtml = '<button class="btn btn-secondary mt-auto" disabled>No Disponible</button>';
            } else {
                // Se crea un enlace <a> estándar y funcional
                botonHtml = `<a href="reserva.html?salon=${salon.id}" class="btn btn-custom mt-auto">
                                <i class="fas fa-calendar-check"></i> Reservar ahora
                             </a>`;
            }

            div.innerHTML = `
            <div class="card h-100 shadow-sm position-relative">
                ${badgeHtml}
                <div id="carouselSalones${salon.id}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${(salon.imagenes || []).map((img, i) => `
                            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100" alt="${salon.nombre} - Imagen ${i + 1}">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselSalones${salon.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Siguiente</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselSalones${salon.id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Siguiente</span>
                    </button>
                </div>

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${salon.nombre}</h5>
                    <p class="card-text">${salon.descripcion}</p>
                    <p><strong>Dirección:</strong> ${salon.direccion}</p>
                    <p class="mt-2"><strong>Precio Base:</strong> $${precioFormateado}</p>
                    ${botonHtml}
                </div>
            </div>`;

            contenedor.appendChild(div);
        });
    }
});