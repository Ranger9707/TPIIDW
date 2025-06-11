
import { obtenerSalones, guardarSalones } from './salones-data.js';

let salones = obtenerSalones();

function renderTabla(lista, tabla) {
    tabla.innerHTML = "";
    lista.forEach(salon => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td><img src="${salon.imagenes[0]}" alt="Vista previa" class="img-thumbnail" style="max-width: 80px;"></td>
            <td>
                <button class="btn btn-warning btn-sm me-2 editar-btn" data-id="${salon.id}">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${salon.id}">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

function filtrarSalones(filtro) {
    return salones.filter(salon =>
        salon.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
}

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("logueado") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("salonForm");
    const tabla = document.getElementById("tablaSalones");
    const buscarInput = document.getElementById("buscarInput");

    function actualizarTabla() {
        const filtro = buscarInput.value.trim();
        const filtrados = filtrarSalones(filtro);
        renderTabla(filtrados, tabla);
    }

    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const salon = salones.find(s => s.id === id);
            if (salon) {
                document.getElementById("salonId").value = salon.id;
                document.getElementById("nombre").value = salon.nombre;
                document.getElementById("direccion").value = salon.direccion;
                document.getElementById("descripcion").value = salon.descripcion;
                document.getElementById("imagenes").value = salon.imagenes.join(", ");
            }
        } else if (e.target.classList.contains("eliminar-btn")) {
            if (confirm("¿Seguro que quieres eliminar este salón?")) {
                const id = parseInt(e.target.getAttribute("data-id"));
                salones = salones.filter(s => s.id !== id);
                guardarSalones(salones);
                actualizarTabla();
            }
        }
    });
    
    const resetButton = form.querySelector('button[type="reset"]');
    if(resetButton) {
        resetButton.addEventListener('click', () => {
            form.reset();
            document.getElementById("salonId").value = "";
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const id = parseInt(document.getElementById("salonId").value);
        const nuevoSalon = {
            id: id || Date.now(),
            nombre: document.getElementById("nombre").value.trim(),
            direccion: document.getElementById("direccion").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            imagenes: document.getElementById("imagenes").value.split(",").map(url => url.trim())
        };

        if (id) {
            const index = salones.findIndex(s => s.id === id);
            if (index !== -1) salones[index] = nuevoSalon;
        } else {
            salones.push(nuevoSalon);
        }

        guardarSalones(salones);
        actualizarTabla();
        form.reset();
        document.getElementById("salonId").value = "";
    });

    buscarInput.addEventListener("input", actualizarTabla);
    actualizarTabla();
});