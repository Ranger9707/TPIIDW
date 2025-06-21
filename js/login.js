document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const mensajeError = document.getElementById("mensajeError");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            mensajeError.style.display = "none"; // oculta error previo

            const username = document.getElementById("usuario").value.trim();
            const password = document.getElementById("clave").value.trim();

            // petición POST a la API
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    // expiresInMins: 60, // se puede definir la duración del token, no lo probe asi que no se muy bien como funca
                })
            })
            .then(res => {
                if (!res.ok) {
                    // si la respuesta no es 2xx lanzamos un error para que lo agarre el catch
                    return res.json().then(err => { throw new Error(err.message) });
                }
                return res.json();
            })
            .then(data => {
                // autenticación es exitosa API devuelve un token
                console.log(data);
                sessionStorage.setItem('authToken', data.token); // Guardamos el token 
                sessionStorage.setItem('userName', data.username);
                window.location.href = "adminSalones.html"; // Redirigimos 
            })
            .catch(error => {
                // Si hay un error de red o de autenticacion se muestra, no se si esto pasa pero por las dudas lo dejo
                console.error('Error de inicio de sesión:', error);
                mensajeError.textContent = `Error: ${error.message || 'Usuario o contraseña incorrectos'}`;
                mensajeError.style.display = "block";
            });
        });
    }
});