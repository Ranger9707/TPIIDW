document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const mensajeError = document.getElementById("mensajeError");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            mensajeError.style.display = "none";

            const username = document.getElementById("usuario").value.trim();
            const password = document.getElementById("clave").value.trim();
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.message) });
                }
                return res.json();
            })
            .then(loginData => {
                return fetch(`https://dummyjson.com/users/${loginData.id}`);
            })
            .then(res => {
                 if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.message) });
                }
                return res.json();
            })
            .then(userData => {
                if (userData.role === 'admin') {
                    console.log("Acceso concedido para administrador:", userData.username);
                    fetch('https://dummyjson.com/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: username, password: password })
                    }).then(res => res.json()).then(loginDataWithToken => {
                        sessionStorage.setItem('authToken', loginDataWithToken.token);
                        sessionStorage.setItem('userRole', userData.role);
                        sessionStorage.setItem('userName', userData.username);
                        window.location.href = "adminSalones.html";
                    });

                } else {
                    // Si no es 'admin', lanzamos el error de acceso denegado.
                    throw new Error('Acceso denegado. No tienes permisos de administrador.');
                }
            })
            .catch(error => {
                console.error('Error en el proceso de inicio de sesión:', error);
                mensajeError.textContent = `Error: ${error.message || 'Usuario o contraseña incorrectos'}`;
                mensajeError.style.display = "block";
            });
        });
    }
});