import { inicializarSalones, obtenerSalones, guardarSalones } from './salones-data.js';
import { inicializarServicios, obtenerServicios, guardarServicios } from './servicios-data.js';

document.addEventListener("DOMContentLoaded", () => {
    //verifico si existe el token en sessionStorage
    if (!sessionStorage.getItem("authToken")) {
        window.location.href = "login.html"; // Si no existe redirigo al login
        return;
    }

    //si existe inicio la logica
    inicializarLogicaSalones();
    inicializarLogicaServicios();
    inicializarLogicaUsuarios();
    inicializarLogout();
});

function inicializarLogicaSalones() {
    // primero se tienen q inicializar los datos y desps se obtienen, si no se rompe, 
    inicializarSalones();
    let salones = obtenerSalones();

    const form = document.getElementById("salonForm");
    const tabla = document.getElementById("tablaSalones");
    const buscarInput = document.getElementById("buscarInput");

    const renderTablaSalones = (lista) => {
        tabla.innerHTML = "";
        lista.forEach(salon => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${salon.id}</td>
                <td>${salon.nombre}</td>
                <td>${salon.direccion}</td>
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
        const id = parseInt(e.target.getAttribute("data-id"));
        if (e.target.classList.contains("editar-salon-btn")) {
            const salon = salones.find(s => s.id === id);
            if (salon) {
                document.getElementById("salonId").value = salon.id;
                document.getElementById("nombreSalon").value = salon.nombre;
                document.getElementById("precioSalon").value = salon.precio; 
                document.getElementById("direccion").value = salon.direccion;
                document.getElementById("descripcionSalon").value = salon.descripcion;
                document.getElementById("imagenes").value = salon.imagenes.join(", ");
            }
        } else if (e.target.classList.contains("eliminar-salon-btn")) {
            if (confirm("¿Seguro que queres eliminar este salon?")) {
                salones = salones.filter(s => s.id !== id);
                guardarSalones(salones);
                actualizarTablaSalones();
            }
        }
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const id = parseInt(document.getElementById("salonId").value);
        const nuevoSalon = {
            id: id || Date.now(),
            nombre: document.getElementById("nombreSalon").value.trim(),
            precio: parseInt(document.getElementById("precioSalon").value) || 0,
            direccion: document.getElementById("direccion").value.trim(),
            descripcion: document.getElementById("descripcionSalon").value.trim(),
            imagenes: document.getElementById("imagenes").value.split(",").map(url => url.trim())
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
    });

    buscarInput.addEventListener("input", actualizarTablaSalones);
    actualizarTablaSalones(); // Carga inicial
}

function inicializarLogicaServicios() {
    // primero se tienen q inicializar los datos y desps se obtienen, si no se rompe, igual q con los salones
    inicializarServicios();
    let servicios = obtenerServicios();

    const form = document.getElementById("servicioForm");
    const tabla = document.getElementById("tablaServicios");

    const renderTablaServicios = (lista) => {
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
        const id = parseInt(e.target.getAttribute("data-id"));
        if (e.target.classList.contains("editar-servicio-btn")) {
            const servicio = servicios.find(s => s.id === id);
            if (servicio) {
                document.getElementById("servicioId").value = servicio.id;
                document.getElementById("nombreServicio").value = servicio.nombre;
                document.getElementById("precioServicio").value = servicio.precio; 
                document.getElementById("descripcionServicio").value = servicio.descripcion;
                document.getElementById("imagenServicio").value = servicio.imagen;
            }
        } else if (e.target.classList.contains("eliminar-servicio-btn")) {
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
    
    renderTablaServicios(servicios); // Carga inicial
}

function inicializarLogout() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("authToken"); // Eliminamos el token
            sessionStorage.removeItem("userName");
            window.location.href = "login.html"; // Redirigimos al login
        });
    }
}

function inicializarLogicaUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");
    
    // petición GET a la API
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
        // elegi la informacion deseada especifica, sin nada sensible
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