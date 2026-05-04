// --- FUNCIÓN MENÚ
const showMenu = () => {
  // BOTÓN HAMBURGUESA
  const toggle = document.getElementById("nav__toggle");
  const nav = document.getElementById("nav-menu");

  // TOGGLE
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      toggle.classList.toggle("show-icon");
    });
  }

  // OBTENER TODOS LOS ITEMS QUE CONTIENE EL DROPDOWN
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  dropdownItems.forEach((item) => {
    const dropdownButton = item.querySelector(".dropdown__button");

    if (dropdownButton) {
      // EN DESKTOP IGNORA CLICKS
      dropdownButton.addEventListener("click", () => {
        if (window.innerWidth > 1119) return;
        // SI SE ABRE UN NUEVO DROPDOWN CIERRA EL ANTERIOR
        const openDropdown = document.querySelector(".show-dropdown");

        toggleItem(item);

        if (openDropdown && openDropdown !== item) {
          toggleItem(openDropdown);
        }
      });
    }
  });

  // AL REDIMENSIONAR LA VENTANA LIMPIA EL ESTADO DEL MENÚ
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1119) {
      if (nav) {
        nav.classList.remove("show-menu");
      }
      if (toggle) {
        toggle.classList.remove("show-icon");
      }
      document.querySelectorAll(".show-dropdown").forEach((item) => {
        const container = item.querySelector(".dropdown__container");
        if (container) container.style.height = "0px";
        item.classList.remove("show-dropdown");
      });
    }
  });
};

//ANIMACIÓN DE TRANSICIÓN DROPDOWN-MOVIL
const toggleItem = (item) => {
  const dropdownContainer = item.querySelector(".dropdown__container");

  if (item.classList.contains("show-dropdown")) {
    // cerrar
    dropdownContainer.style.height = "0px";
    item.classList.remove("show-dropdown");
  } else {
    // abrir
    dropdownContainer.style.height = dropdownContainer.scrollHeight + "px";
    item.classList.add("show-dropdown");
  }
};

//
const headerPlaceholder = document.getElementById("header-placeholder");

if (headerPlaceholder) {
  const fetches = [
    fetch("header.html")
      .then((res) => res.text())
      .then((html) => {
        headerPlaceholder.innerHTML = html;
      }),
  ];

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetches.push(
      fetch("footer.html")
        .then((res) => res.text())
        .then((html) => {
          footerPlaceholder.innerHTML = html;
        }),
    );
  }

  Promise.all(fetches)
    .then(showMenu)
    .catch((error) => console.error("Error:", error));
} else {
  document.addEventListener("DOMContentLoaded", showMenu);
}

// --- FUNCIÓN SLIDER HERO

let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlider();
};

prev.oneclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {next.click()}, 3000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {next.click()}, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', function (){
    active = key;
    reloadSlider();
  })
})
