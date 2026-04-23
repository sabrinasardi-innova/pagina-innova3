// --- FUNCIÓN MENÚ
const showMenu = () => {
  const toggle = document.getElementById("nav__toggle"),
    nav = document.getElementById("nav-menu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      toggle.classList.toggle("show-icon");
    });
  }

  // 👇 AHORA SÍ: el DOM ya existe
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  dropdownItems.forEach((item) => {
    const dropdownButton = item.querySelector(".dropdown__button");

    if (dropdownButton) {
      dropdownButton.addEventListener("click", () => {
        if (window.innerWidth > 1118) return; // 👈 CLAVE

        const showDropdown = document.querySelector(".show-dropdown");

        toggleItem(item);

        if (showDropdown && showDropdown !== item) {
          toggleItem(showDropdown);
        }
      });
    }
  });
};

const toggleItem = (item) => {
  const dropdownContainer = item.querySelector(".dropdown__container");

  if (item.classList.contains("show-dropdown")) {
    // cerrar
    dropdownContainer.style.height = 0;
    item.classList.remove("show-dropdown");
  } else {
    // abrir
    dropdownContainer.style.height = dropdownContainer.scrollHeight + "px";
    item.classList.add("show-dropdown");
  }
};

// --- SI EXISTEN placeholders → usa fetch
const headerPlaceholder = document.getElementById("header-placeholder");

if (headerPlaceholder) {
  Promise.all([
    fetch("header.html")
      .then((res) => res.text())
      .then((html) => {
        headerPlaceholder.innerHTML = html;
      }),

    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => {
        document.getElementById("footer-placeholder").innerHTML = html;
      }),
  ])
    .then(showMenu)
    .catch((error) => console.error("Error:", error));
} else {
  // SI estás en header.html directamente
  document.addEventListener("DOMContentLoaded", showMenu);
}
