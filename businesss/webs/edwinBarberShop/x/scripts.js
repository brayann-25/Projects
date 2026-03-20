function showLocation(loc) {
  // 1. Mostrar el contenedor principal
  document.getElementById("main-content").style.display = "block";

  // 2. Ocultar todos los datos de locación primero
  const allData = document.querySelectorAll(".location-data");
  allData.forEach((el) => (el.style.display = "none"));

  // 3. Mostrar solo los de la locación elegida
  const selectedData = document.querySelectorAll("." + loc + "-content");
  selectedData.forEach((el) => (el.style.display = "block"));

  // 4. Actualizar etiqueta y hacer scroll
  document.getElementById("current-loc-label").innerText =
    "EDWIN STOP - " + loc.toUpperCase();
  document
    .getElementById("main-content")
    .scrollIntoView({ behavior: "smooth" });

  // Ocultar el selector para centrarse en la info (opcional)
  // document.getElementById('hero-selector').style.height = '40vh';
}

function resetSelector() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
