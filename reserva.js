
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const salonId = urlParams.get("salon");
    const salonInput = document.getElementById("salon");

    if (salonId && salonInput) {
        salonInput.value = salonId;
    }

    const formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Reserva enviada con éxito!");
            // enviar a una API o guardar en localStorage
            e.target.reset();
            if (salonInput) {
                 salonInput.value = salonId; // Restaura el ID del salón 
            }
        });
    }
});