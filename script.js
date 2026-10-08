// ============================================================
// CONFIGURAÇÃO RÁPIDA
// Troque pelo link real do Instagram da loja.
// Exemplo: https://www.instagram.com/decstore/
// ============================================================
const INSTAGRAM_URL = "https://www.instagram.com/dec1store/";

const products = [
  {
    id: 1,
    name: "Kit Aquarela Essencial",
    category: "pintura",
    price: 89.90,
    image: "assets/kit-aquarela.svg",
    description: "Estojo com cores vibrantes para estudos, ilustrações e cartões.",
    tag: "Mais pedido"
  },
  {
    id: 2,
    name: "Sketchbook Rosé A5",
    category: "papelaria",
    price: 42.90,
    image: "assets/sketchbook.svg",
    description: "Caderno artístico com papel encorpado e acabamento delicado.",
    tag: "Novo"
  },
  {
    id: 3,
    name: "Pincéis Soft Touch",
    category: "pintura",
    price: 36.50,
    image: "assets/pinceis.svg",
    description: "Conjunto versátil para aquarela, guache e técnicas mistas.",
    tag: "Favorito"
  },
  {
    id: 4,
    name: "Lápis de Cor Pastel",
    category: "desenho",
    price: 54.90,
    image: "assets/lapis-cor.svg",
    description: "Paleta suave para ilustrações delicadas e projetos criativos.",
    tag: "24 cores"
  },
  {
    id: 5,
    name: "Canetas Fine Art",
    category: "desenho",
    price: 29.90,
    image: "assets/canetas.svg",
    description: "Pontas finas para line art, lettering e detalhes precisos.",
    tag: "6 pontas"
  },
  {
    id: 6,
    name: "Bloco para Aquarela",
    category: "papelaria",
    price: 31.90,
    image: "assets/bloco-aquarela.svg",
    description: "Papel texturizado para aquarela, guache e estudos de cor.",
    tag: "300 g/m²"
  }
];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const sakuraLayer = document.getElementById("sakuraLayer");

function renderProducts(filter = "todos") {
  const visibleProducts = filter === "todos"
    ? products
    : products.filter(product => product.category === filter);

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>

        <div class="product-footer">
          <span class="price">${money.format(product.price)}</span>
          <a
            class="instagram-button"
            href="${INSTAGRAM_URL}"
            target="_blank"
            rel="noopener"
            aria-label="Ver ${product.name} no Instagram"
            title="Abra o Instagram da loja e envie o nome do produto: ${product.name}"
          >
            Pedir no Instagram
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll(".js-general-instagram").forEach(link => {
  link.href = INSTAGRAM_URL;
});

document.getElementById("year").textContent = new Date().getFullYear();

let lastSakuraTime = 0;
const SAKURA_INTERVAL = 55;

function createSakura(x, y) {
  const flower = document.createElement("span");
  flower.className = "sakura-flower";

  const size = Math.random() * 16 + 16;
  const drift = (Math.random() * 90 - 45).toFixed(1) + "px";
  const distance = (Math.random() * 120 + 180).toFixed(1) + "px";
  const duration = (Math.random() * 1.8 + 2.2).toFixed(2) + "s";
  const rotation = (Math.random() * 420 - 210).toFixed(0) + "deg";

  flower.style.left = `${x + (Math.random() * 16 - 8)}px`;
  flower.style.top = `${y + (Math.random() * 10 - 5)}px`;
  flower.style.setProperty("--size", `${size}px`);
  flower.style.setProperty("--drift-x", drift);
  flower.style.setProperty("--fall-distance", distance);
  flower.style.setProperty("--fall-duration", duration);
  flower.style.setProperty("--rotate-end", rotation);

  sakuraLayer.appendChild(flower);

  flower.addEventListener("animationend", () => {
    flower.remove();
  });
}

window.addEventListener("mousemove", event => {
  const now = performance.now();
  if (now - lastSakuraTime < SAKURA_INTERVAL) return;
  lastSakuraTime = now;

  createSakura(event.clientX, event.clientY);

  if (Math.random() > 0.55) {
    createSakura(event.clientX + (Math.random() * 30 - 15), event.clientY - 8);
  }
});

window.addEventListener("touchmove", event => {
  const touch = event.touches[0];
  if (!touch) return;

  const now = performance.now();
  if (now - lastSakuraTime < 90) return;
  lastSakuraTime = now;

  createSakura(touch.clientX, touch.clientY);
}, { passive: true });

renderProducts();
