document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value.trim();
            const clave = document.getElementById("clave").value.trim();

            if (usuario === "admin" && clave === "1234") {
                sessionStorage.setItem("logueado", "true");
                window.location.href = "adminSalones.html";
            } else {
                const mensajeError = document.getElementById("mensajeError");
                if (mensajeError) {
                    mensajeError.style.display = "block";
                }
            }
        });
    }
});