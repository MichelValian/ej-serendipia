document.addEventListener("DOMContentLoaded", function () {
    fetch("data.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Omitimos la primera fila (encabezados)
            const nameList = document.getElementById("name-list");

            let womenHTML = '<div class="col-6"><h3 class="text-center">Mujeres</h3>';
            let menHTML = '<div class="col-6"><h3 class="text-center">Hombres</h3>';

            rows.forEach(row => {
                let columns = row.split(/[,;]/).map(col => col.trim());
                if (columns.length >= 5) {
                    const [nombre, edad, sexo, ocupacion, estudios] = columns;

                    const cardHTML = `
                        <div class="card p-3 mb-2 animate__animated animate__fadeIn" style="cursor: pointer;">
                            <h5>${nombre}</h5>
                        </div>
                    `;

                    if (sexo === "F") {
                        womenHTML += `<div onclick="showDetails('${nombre}', '${edad}', '${sexo}', '${ocupacion}', '${estudios}')">${cardHTML}</div>`;
                    } else {
                        menHTML += `<div onclick="showDetails('${nombre}', '${edad}', '${sexo}', '${ocupacion}', '${estudios}')">${cardHTML}</div>`;
                    }
                }
            });

            womenHTML += '</div>';
            menHTML += '</div>';

            nameList.innerHTML = womenHTML + menHTML;
        })
        .catch(error => console.error("Error al cargar el CSV:", error));
});

document.getElementById("search").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardName = card.querySelector("h5").textContent.toLowerCase();
        if (cardName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


function showDetails(nombre, edad, sexo, ocupacion, estudios) {
    document.getElementById("modal-body").innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>Ocupación:</strong> ${ocupacion}</p>
        <p><strong>Nivel de estudios:</strong> ${estudios}</p>
    `;
    new bootstrap.Modal(document.getElementById("infoModal")).show();
}
