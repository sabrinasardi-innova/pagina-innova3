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

  const conoceemaPlaceholder = document.getElementById("conoce-ema-placeholder");
  if (conoceemaPlaceholder) {
    fetches.push(
      fetch("conoceacreditaciones.html")
        .then((res) => res.text())
        .then((html) => {
          conoceemaPlaceholder.innerHTML = html;
        }),
    );
  }

  const emaamaacPlaceholder = document.getElementById("ema-amaac-placeholder");
  if (emaamaacPlaceholder) {
    fetches.push(
      fetch("amaac.html")
        .then((res) => res.text())
        .then((html) => {
          emaamaacPlaceholder.innerHTML = html;
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

const next = document.getElementById("next");
const prev = document.getElementById("prev");

if (next && prev) {
  let list = document.querySelector(".slider .list");
  let items = document.querySelectorAll(".slider .list .item");
  let dots = document.querySelectorAll(".slider .dots li");

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

  prev.onclick = function () {
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
    });
  });
}

// --- SWIPE IMÁGENES HERO --- //

let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector(".slider");

if (slider) {
  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();
  });
}

function handleSwipe() {
  const threshold = 50; // sensibilidad

  if (touchStartX - touchEndX > threshold) {
    // swipe izquierda → siguiente slide
    next.click();
  }

  if (touchEndX - touchStartX > threshold) {
    // swipe derecha → slide anterior
    prev.click();
  }
}

     // --- SECCIÓN 2: LÓGICA DE LAS PESTAÑAS (sin cambios) ---
    const tabSection = document.querySelector('.page-tab-section');
    const tabLinks = document.querySelectorAll('.tab-list a');

    function switchTab(link) {
        const targetPanelId = link.getAttribute('href');
        const targetPanel = document.querySelector(targetPanelId);

        if (targetPanel && link) {
            document.querySelectorAll('.tab-list li.active').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel.active').forEach(item => item.classList.remove('active'));
            
            link.parentElement.classList.add('active');
            targetPanel.classList.add('active');

            if (tabSection) {
                tabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            switchTab(this);
        });
    });

    // --- SECCIÓN 3: ACTIVAR PESTAÑA DESDE URL (sin cambios) ---
    function activateTabFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`.tab-list a[href="${hash}"]`);
            if (targetLink) {
                setTimeout(() => { switchTab(targetLink); }, 100);
            }
        }
    }
    activateTabFromHash();

    // --- ABRIR PESTAÑAS DESDE ENLACES INTERNOS ---
document.querySelectorAll(".abrir-tab").forEach(enlace => {
    enlace.addEventListener("click", function (e) {
        e.preventDefault();

        const selector = this.dataset.tab;

        const targetLink = document.querySelector(
            `.tab-list a[href="${selector}"]`
        );

        if (targetLink) {
            switchTab(targetLink);
        }
    });
});
