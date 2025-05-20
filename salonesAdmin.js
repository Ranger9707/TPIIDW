// Archivo para gestionar la interfaz de administración desde salones.html

import {
    inicializarSalones,
    obtenerSalones,
    agregarSalon,
    modificarSalon,
    eliminarSalon
  } from './salonesdata.js';
  
  let idEditando = null; // Si es null, estamos creando; si tiene valor, estamos editando.
  
  window.onload = function() {
    inicializarSalones();
    renderizarTabla();
    document.getElementById("formSalon").onsubmit = guardarSalonForm;
    document.getElementById("btnCancelar").onclick = limpiarFormulario;
  };
  
  function renderizarTabla() {
    const salones = obtenerSalones();
    const tbody = document.getElementById('tbodySalones');
    tbody.innerHTML = salones.map(salon => `
      <tr>
        <td>${salon.nombre}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.capacidad}</td>
        <td>${salon.direccion}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarSalon(${salon.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="borrarSalon(${salon.id})">Eliminar</button>
        </td>
      </tr>
    `).join('');
  }
  
  // Lógica para exponer funciones globalmente (por uso de onclick en HTML)
  window.editarSalon = function(id) {
    const salon = obtenerSalones().find(s => s.id === id);
    if (salon) {
      idEditando = salon.id;
      document.getElementById("nombre").value = salon.nombre;
      document.getElementById("descripcion").value = salon.descripcion;
      document.getElementById("capacidad").value = salon.capacidad;
      document.getElementById("direccion").value = salon.direccion;
      document.getElementById("tituloForm").innerText = "Editar Salón";
      document.getElementById("btnGuardar").innerText = "Actualizar";
      document.getElementById("btnCancelar").style.display = "inline-block";
    }
  }
  
  window.borrarSalon = function(id) {
    if (confirm("¿Estás seguro de eliminar este salón?")) {
      eliminarSalon(id);
      renderizarTabla();
      limpiarFormulario();
    }
  }
  
  function guardarSalonForm(e) {
    e.preventDefault();
    const salon = {
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      capacidad: parseInt(document.getElementById("capacidad").value),
      direccion: document.getElementById("direccion").value,
      imagenes: [] // puedes agregar campos para imágenes si lo deseas
    };
    if (idEditando) {
      modificarSalon(idEditando, salon);
    } else {
      agregarSalon(salon);
    }
    renderizarTabla();
    limpiarFormulario();
  }
  
  function limpiarFormulario() {
    document.getElementById("formSalon").reset();
    idEditando = null;
    document.getElementById("tituloForm").innerText = "Nuevo Salón";
    document.getElementById("btnGuardar").innerText = "Guardar";
    document.getElementById("btnCancelar").style.display = "none";
  }