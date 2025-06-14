document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const mensajeError = document.getElementById("mensajeError");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            mensajeError.style.display = "none"; // Ocultar error previo

            const username = document.getElementById("usuario").value.trim();
            const password = document.getElementById("clave").value.trim();

            // Hacemos la petición POST a la API de DummyJSON
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    // expiresInMins: 60, // Opcional: se puede definir la duración del token
                })
            })
            .then(res => {
                if (!res.ok) {
                    // Si la respuesta no es 2xx, lanzamos un error para que lo capture el .catch
                    return res.json().then(err => { throw new Error(err.message) });
                }
                return res.json();
            })
            .then(data => {
                // Si la autenticación es exitosa, la API devuelve un token
                console.log(data);
                sessionStorage.setItem('authToken', data.token); // Guardamos el token en sessionStorage
                sessionStorage.setItem('userName', data.username);
                window.location.href = "adminSalones.html"; // Redirigimos al panel
            })
            .catch(error => {
                // Si hay un error de red o de autenticación, lo mostramos
                console.error('Error de inicio de sesión:', error);
                mensajeError.textContent = `Error: ${error.message || 'Usuario o contraseña incorrectos'}`;
                mensajeError.style.display = "block";
            });
        });
    }
});