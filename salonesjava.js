export const SALONES_KEY = 'salones_eventos';


//         salones iniciales no borrar
export const salonesIniciales = [
    {
        id: 1,
        nombre: 'Salón Aurora',
        descripcion: 'Un espacio versátil y luminoso, ideal para celebraciones familiares, cumpleaños infantiles y reuniones sociales. Cuenta con juegos para niños, cocina equipada y patio al aire libre. Capacidad: hasta 100 personas.',
        direccion: 'Av. Directorio 3245 – Parque Chacabuco, CABA',
        imagenes: ['Recursos/Salon1.jpg', 'Recursos/Salon_a.jpg']
    },
    {
        id: 2,
        nombre: 'Espacio Ébano',
        descripcion: 'Diseñado para eventos corporativos y lanzamientos de productos, este salón moderno ofrece tecnología audiovisual de última generación, sala VIP y catering ejecutivo. Capacidad: hasta 80 personas.',
        direccion: 'Calle Suipacha 935 – Microcentro, CABA.',
        imagenes: ['Recursos/Salon2.jpg', 'Recursos/salon_b.jpg']
    },
    {
        id: 3,
        nombre: 'Jardín del Sol',
        descripcion: 'Rodeado de naturaleza, este salón al aire libre es perfecto para eventos diurnos, celebraciones campestres y encuentros informales. Posee quincho, pileta y área de juegos. Capacidad: hasta 150 personas.',
        direccion: 'Av. de los Incas 4520 – Villa Urquiza, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 4,
        nombre: 'Salón Velvet',
        descripcion: 'Ambiente elegante y sofisticado, ideal para fiestas de 15, bodas y aniversarios. Decoración glamorosa, pista de baile y servicio de ambientación personalizado. Capacidad: hasta 200 personas.',
        direccion: 'Pje. Bollini 1486 – Palermo Chico, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 5,
        nombre: 'Espacio Álamo',
        descripcion: 'Funcional y accesible, pensado para talleres, capacitaciones, reuniones empresariales y encuentros profesionales. WiFi de alta velocidad, proyector y mobiliario adaptable. Capacidad: hasta 60 personas.',
        direccion: 'Av. Rivadavia 17555 – Ramos Mejía, Buenos Aires.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 6,
        nombre: 'Salón Luna Park',
        descripcion: 'Temático y divertido, ideal para cumpleaños infantiles y fiestas con animación. Incluye inflables, luces de colores, escenario y cabina de DJ. Capacidad: hasta 90 personas.',
        direccion: 'Av. Belgrano 3785 – Almagro, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 7,
        nombre: 'La Cúpula',
        descripcion: 'Un salón exclusivo con diseño circular y techo vidriado, perfecto para cenas de gala y eventos premium. Ofrece catering gourmet, valet parking y música en vivo. Capacidad: hasta 120 personas.',
        direccion: 'Roque Sáenz Peña 246 – San Telmo, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 8,
        nombre: 'Espacio Norte',
        descripcion: 'Amplio y funcional, este salón se adapta tanto a eventos sociales como empresariales. Cuenta con doble acceso, sector lounge y cocina industrial. Capacidad: hasta 180 personas.',
        direccion: 'Av. San Martín 5124 – Agronomía, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    },
    {
        id: 9,
        nombre: 'Terraza Río',
        descripcion: 'Con vistas panorámicas y un ambiente moderno, Terraza Río es ideal para celebraciones al atardecer, cócteles ejecutivos y fiestas exclusivas. Dispone de barra al aire libre, deck de madera, iluminación LED y climatización. Capacidad: hasta 130 personas.',
        direccion: 'Av. España 2250 – Costanera Sur, CABA.',
        imagenes: ['Recursos/Salon3.jpg', 'Recursos/salon_c.jpg']
    }
];

export function inicializarSalones() {
    if (!localStorage.getItem(SALONES_KEY)) {
        localStorage.setItem(SALONES_KEY, JSON.stringify(salonesIniciales));
    }
}

export function obtenerSalones() {
    return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

export function guardarSalones(lista) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(lista));
}

// pase las funciones al js porque estaban en el html 

export function renderTabla(salones, tabla) {
    tabla.innerHTML = "";
    salones.forEach(salon => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td><img src="${salon.imagenes[0]}" alt="Vista previa" class="img-thumbnail" style="max-width: 80px;"></td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editarSalon(${salon.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

export function filtrarSalones(salones, filtro) {
    return salones.filter(salon =>
        salon.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
}

export function inicializarAdminSalones() {
    if (sessionStorage.getItem("logueado") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("salonForm");
    const tabla = document.getElementById("tablaSalones");
    const buscarInput = document.getElementById("buscarInput");

    let salones = obtenerSalones();

    function actualizarTabla() {
        const filtro = buscarInput.value.trim();
        const filtrados = filtrarSalones(salones, filtro);
        renderTabla(filtrados, tabla);
    }

    window.editarSalon = (id) => {
        const salon = salones.find(s => s.id === id);
        if (salon) {
            document.getElementById("salonId").value = salon.id;
            document.getElementById("nombre").value = salon.nombre;
            document.getElementById("direccion").value = salon.direccion;
            document.getElementById("descripcion").value = salon.descripcion;
            document.getElementById("imagenes").value = salon.imagenes.join(", ");
        }
    };

    window.eliminarSalon = (id) => {
        if (confirm("Seguro que queres eliminar este salon?")) {
            salones = salones.filter(s => s.id !== id);
            guardarSalones(salones);
            actualizarTabla();
        }
    };

    window.resetForm = () => {
        form.reset();
        document.getElementById("salonId").value = "";
    };

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
}
