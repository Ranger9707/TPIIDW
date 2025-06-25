import { inicializarSalones, obtenerSalones, guardarSalones } from './salones-data.js';
import { inicializarServicios, obtenerServicios, guardarServicios } from './servicios-data.js';
import { obtenerReservas, guardarListaDeReservas } from './reservas-data.js';

const availableImages = [
    "Recursos/Salon1.jpg",
    "Recursos/Salon2.jpg",
    "Recursos/Salon3.jpg",
    "Recursos/Salon4.jpg",
    "Recursos/salon_a.jpg",
    "Recursos/salon_a.png",
    "Recursos/salon_b.jpg",
    "Recursos/salon_b.png",
    "Recursos/salon_c.jpg",
    "Recursos/salon_c.png",
    "Recursos/salon_d.jpg",
    "Recursos/salon_d.png",
];

document.addEventListener("DOMContentLoaded", () => {
    const authToken = sessionStorage.getItem("authToken");
    const userRole = sessionStorage.getItem("userRole");

    if (!authToken || userRole !== 'admin') {
        sessionStorage.clear();
        window.location.href = "login.html";
        return;
    }
    inicializarLogicaSalones();
    inicializarLogicaServicios();
    inicializarLogicaUsuarios();
    inicializarLogicaReservas();
    inicializarLogout();
});

function inicializarLogout() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userName");
            window.location.href = "login.html";
        });
    }
}

// LOGICA SALONES
function inicializarLogicaSalones() {
    inicializarSalones();
    let salones = obtenerSalones();
    const form = document.getElementById("salonForm");
    const tabla = document.getElementById("tablaSalones");
    const buscarInput = document.getElementById("buscarInput");

    const imageSelector = document.getElementById("imageSelector");
    const addImageBtn = document.getElementById("addImageBtn");
    const selectedImagesContainer = document.getElementById("selectedImagesContainer");
    let currentSelectedImages = [];

    if (imageSelector) {
        availableImages.forEach(img => {
            const option = document.createElement("option");
            option.value = img;
            option.textContent = img.split('/').pop();
            imageSelector.appendChild(option);
        });
    }

    const renderSelectedImages = () => {
        selectedImagesContainer.innerHTML = "";
        currentSelectedImages.forEach(imgSrc => {
            const imgPill = document.createElement('div');
            imgPill.className = 'badge bg-primary d-flex align-items-center p-2';
            imgPill.innerHTML = `
                <img src="${imgSrc}" alt="Miniatura" class="me-2 rounded" style="width: 25px; height: 25px; object-fit: cover;">
                <span class="text-white">${imgSrc.split('/').pop()}</span>
                <button type="button" class="btn-close btn-close-white ms-2" data-img-src="${imgSrc}"></button>
            `;
            selectedImagesContainer.appendChild(imgPill);
        });
    };
    
    if (addImageBtn) {
        addImageBtn.addEventListener("click", () => {
            const selectedImage = imageSelector.value;
            if (selectedImage && !currentSelectedImages.includes(selectedImage)) {
                currentSelectedImages.push(selectedImage);
                renderSelectedImages();
            }
        });
    }

    if (selectedImagesContainer) {
        selectedImagesContainer.addEventListener("click", e => {
            if (e.target.matches('.btn-close')) {
                const imgSrcToRemove = e.target.dataset.imgSrc;
                currentSelectedImages = currentSelectedImages.filter(img => img !== imgSrcToRemove);
                renderSelectedImages();
            }
        });
    }


    const renderTablaSalones = (lista) => {
        if (!tabla) return;
        tabla.innerHTML = "";
        lista.forEach(salon => {
            const row = document.createElement("tr");
            const estadoBadge = (salon.estado === 'Reservado')
                ? `<span class="badge bg-danger">Reservado</span>`
                : `<span class="badge bg-success">Disponible</span>`;

            row.innerHTML = `
                <td>${salon.id}</td>
                <td>${salon.nombre}</td>
                <td>${salon.direccion}</td>
                <td>${estadoBadge}</td>
                <td><img src="${salon.imagenes[0]}" alt="Vista previa" class="img-thumbnail" style="max-width: 80px;"></td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 editar-salon-btn" data-id="${salon.id}">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar-salon-btn" data-id="${salon.id}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        });
    };

    const actualizarTablaSalones = () => {
        const filtro = buscarInput.value.trim().toLowerCase();
        const filtrados = salones.filter(s => s.nombre.toLowerCase().includes(filtro));
        renderTablaSalones(filtrados);
    };

    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar-salon-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const salon = salones.find(s => s.id === id);
            if (salon) {
                document.getElementById("salonId").value = salon.id;
                document.getElementById("nombreSalon").value = salon.nombre;
                document.getElementById("precioSalon").value = salon.precio;
                document.getElementById("estadoSalon").value = salon.estado || 'Disponible';
                document.getElementById("direccion").value = salon.direccion;
                document.getElementById("descripcionSalon").value = salon.descripcion;
                currentSelectedImages = [...salon.imagenes];
                renderSelectedImages();
            }
        } else if (e.target.classList.contains("eliminar-salon-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            if (confirm("¿Seguro que quieres eliminar este salón?")) {
                salones = salones.filter(s => s.id !== id);
                guardarSalones(salones);
                actualizarTablaSalones();
            }
        }
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const id = parseInt(document.getElementById("salonId").value);
        
        if(currentSelectedImages.length === 0) {
            alert("Debe seleccionar al menos una imagen para el salón.");
            return;
        }

        const nuevoSalon = {
            id: id || Date.now(),
            nombre: document.getElementById("nombreSalon").value.trim(),
            precio: parseInt(document.getElementById("precioSalon").value) || 0,
            estado: document.getElementById("estadoSalon").value,
            direccion: document.getElementById("direccion").value.trim(),
            descripcion: document.getElementById("descripcionSalon").value.trim(),
            imagenes: currentSelectedImages 
        };

        if (id) {
            const index = salones.findIndex(s => s.id === id);
            if (index !== -1) salones[index] = nuevoSalon;
        } else {
            salones.push(nuevoSalon);
        }
        guardarSalones(salones);
        actualizarTablaSalones();
        form.reset();
        document.getElementById("salonId").value = "";
        currentSelectedImages = [];
        renderSelectedImages();
    });

    buscarInput.addEventListener("input", actualizarTablaSalones);
    actualizarTablaSalones();
}

// LOGICA SERVICIOS
function inicializarLogicaServicios() {
    inicializarServicios();
    let servicios = obtenerServicios();
    const form = document.getElementById("servicioForm");
    const tabla = document.getElementById("tablaServicios");

    const renderTablaServicios = (lista) => {
        if (!tabla) return;
        tabla.innerHTML = "";
        lista.forEach(servicio => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${servicio.id}</td>
                <td>${servicio.nombre}</td>
                <td><img src="${servicio.imagen}" alt="Vista previa" class="img-thumbnail" style="max-width: 100px;"></td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 editar-servicio-btn" data-id="${servicio.id}">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar-servicio-btn" data-id="${servicio.id}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        });
    };

    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar-servicio-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const servicio = servicios.find(s => s.id === id);
            if (servicio) {
                document.getElementById("servicioId").value = servicio.id;
                document.getElementById("nombreServicio").value = servicio.nombre;
                document.getElementById("precioServicio").value = servicio.precio;
                document.getElementById("descripcionServicio").value = servicio.descripcion;
                document.getElementById("imagenServicio").value = servicio.imagen;
            }
        } else if (e.target.classList.contains("eliminar-servicio-btn")) {
             const id = parseInt(e.target.getAttribute("data-id"));
             if (confirm("¿Estas seguro de que queres eliminar este servicio?")) {
                servicios = servicios.filter(s => s.id !== id);
                guardarServicios(servicios);
                renderTablaServicios(servicios);
            }
        }
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const id = parseInt(document.getElementById("servicioId").value);
        const nuevoServicio = {
            id: id || Date.now(),
            nombre: document.getElementById("nombreServicio").value.trim(),
            precio: parseInt(document.getElementById("precioServicio").value) || 0,
            descripcion: document.getElementById("descripcionServicio").value.trim(),
            imagen: document.getElementById("imagenServicio").value.trim()
        };
        if (id) {
            const index = servicios.findIndex(s => s.id === id);
            if (index !== -1) servicios[index] = nuevoServicio;
        } else {
            servicios.push(nuevoServicio);
        }
        guardarServicios(servicios);
        renderTablaServicios(servicios);
        form.reset();
        document.getElementById("servicioId").value = "";
    });

    renderTablaServicios(servicios);
}


//LOGICA USUARIOS (sin cambios)
function inicializarLogicaUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");
    if (!tabla) return;
    
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
        renderTablaUsuarios(data.users, tabla);
    })
    .catch(error => {
        console.error("Error al cargar los usuarios:", error);
        tabla.innerHTML = `<tr><td colspan="6" class="text-center text-danger">No se pudieron cargar los usuarios.</td></tr>`;
    });
}

function renderTablaUsuarios(lista, tabla) {
    tabla.innerHTML = "";
    lista.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${user.image}" alt="Foto de ${user.firstName}" class="img-fluid rounded-circle" style="width: 40px; height: 40px;"></td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.role}</td>
        `;
        tabla.appendChild(row);
    });
}

//LOGICA RESERVAS (sin cambios)
function inicializarLogicaReservas() {
    const tabla = document.getElementById("tablaReservas");
    if (!tabla) return;
    let reservas = obtenerReservas();

    const renderTablaReservas = () => {
        tabla.innerHTML = "";
        reservas.forEach(reserva => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.cliente}</td>
                <td>${reserva.email}</td>
                <td>${reserva.salon.nombre}</td>
                <td>${new Date(reserva.fecha + 'T00:00:00').toLocaleDateString()}</td>
                <td>${reserva.total}</td>
                <td>
                    <button class="btn btn-danger btn-sm eliminar-reserva-btn" data-id="${reserva.id}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(row);
        });
    }

    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar-reserva-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            if (confirm(`¿Está seguro de que desea eliminar la reserva N° ${id}?`)) {
                reservas = reservas.filter(r => r.id !== id);
                guardarListaDeReservas(reservas);
                renderTablaReservas();
            }
        }
    });

    renderTablaReservas();
}