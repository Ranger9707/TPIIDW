
import { inicializarSalones, obtenerSalones } from './salones-data.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarSalones();

    const salones = obtenerSalones();
    const contenedor = document.getElementById('contenedor-salones');

    if (contenedor && salones.length > 0) {
        salones.forEach((salon) => {
            const div = document.createElement('div');
            div.className = 'col-md-4';

            div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div id="carouselSalones${salon.id}" class="carousel slide mb-3" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${salon.imagenes.map((img, i) => `
                            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100" alt="${salon.nombre} - Imagen ${i + 1}">
                            </div>`).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselSalones${salon.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
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
                    <a href="reserva.html?salon=${salon.id}" class="btn btn-custom mt-auto">
                        <i class="fas fa-calendar-check"></i> Reservar ahora
                    </a>
                </div>
            </div>`;

            contenedor.appendChild(div);
        });
    }
});