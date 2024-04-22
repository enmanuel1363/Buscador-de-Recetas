const API_KEY = 'aad545e6cc144019b74be18724ae249e'; 
const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

const inputBusqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btnBuscar");
const resultados = document.getElementById("resultados");

btnBuscar.addEventListener("click", () => {
    const query = inputBusqueda.value.trim();

    if (query === "") {
        return;
    }

    fetch(`${baseURL}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            resultados.innerHTML = ""; // Limpiar resultados anteriores

            if (data.results.length === 0) {
                resultados.innerHTML = "No se encontraron recetas.";
                return;
            }

            data.results.forEach(receta => {
                const divReceta = document.createElement("div");
                divReceta.classList.add("receta");

                const imgReceta = document.createElement("img");
                imgReceta.src = receta.image;
                imgReceta.alt = receta.title;

                const tituloReceta = document.createElement("h2");
                tituloReceta.textContent = receta.title;

                const linkReceta = document.createElement("a");
                linkReceta.href = receta.sourceUrl;
                linkReceta.target = "_blank";
                linkReceta.textContent = "Ver receta";

                divReceta.appendChild(imgReceta);
                divReceta.appendChild(tituloReceta);
                divReceta.appendChild(linkReceta);

                resultados.appendChild(divReceta);
            });
        })
        .catch(error => {
            console.error("Error al buscar recetas:", error);
        });
});
