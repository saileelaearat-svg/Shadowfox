/* =========================================================
   ShopEase — product data + storefront logic
   ========================================================= */

const PRODUCTS = [
  // Electronics
  { id:"e1", name:"AeroBeat Wireless Headphones", category:"electronics", price:4499, oldPrice:5999, rating:4.6, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { id:"e2", name:"Pulse Fitness Smartwatch", category:"electronics", price:3299, oldPrice:null, rating:4.4, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
  { id:"e3", name:"Nimbus Mirrorless Camera", category:"electronics", price:42999, oldPrice:47999, rating:4.8, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
  { id:"e4", name:"Orbit Bluetooth Speaker", category:"electronics", price:1899, oldPrice:2499, rating:4.3, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80" },
  { id:"e5", name:"Flux Mechanical Keyboard", category:"electronics", price:3899, oldPrice:null, rating:4.7, img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
  { id:"e6", name:"Halo Noise-Cancelling Earbuds", category:"electronics", price:2799, oldPrice:3499, rating:4.5, img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80" },
  // Fashion
  { id:"f1", name:"Strider Canvas Sneakers", category:"fashion", price:2199, oldPrice:2799, rating:4.5, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id:"f2", name:"Harbor Denim Jacket", category:"fashion", price:3499, oldPrice:null, rating:4.2, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
  { id:"f3", name:"Modern Leather Tote Bag", category:"fashion", price:2899, oldPrice:3699, rating:4.6, img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },
  { id:"f4", name:"Horizon Aviator Sunglasses", category:"fashion", price:1299, oldPrice:1799, rating:4.4, img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80" },
  { id:"f5", name:"Everyday Cotton Cap", category:"fashion", price:599, oldPrice:null, rating:4.1, img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80" },
  { id:"f6", name:"Classic Analog Wristwatch", category:"fashion", price:3999, oldPrice:4999, rating:4.7, img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80" },
  // Home
  { id:"h1", name:"Warmlight Table Lamp", category:"home", price:1599, oldPrice:1999, rating:4.5, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { id:"h2", name:"Loop Accent Chair", category:"home", price:8999, oldPrice:10999, rating:4.6, img:"https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80" },
  { id:"h3", name:"Potted Fiddle-Leaf Plant", category:"home", price:899, oldPrice:null, rating:4.3, img:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80" },
  { id:"h4", name:"Kettle & Cookware Set", category:"home", price:2699, oldPrice:3299, rating:4.4, img:"https://images.unsplash.com/photo-1584990347449-a0c15d67e8f9?auto=format&fit=crop&w=600&q=80" },
  // Beauty
  { id:"b1", name:"Dew Hydrating Serum", category:"beauty", price:999, oldPrice:1299, rating:4.6, img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
  { id:"b2", name:"Bloom Eau de Parfum", category:"beauty", price:2499, oldPrice:null, rating:4.7, img:"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { id:"b3", name:"Velvet Matte Lipstick Set", category:"beauty", price:1199, oldPrice:1499, rating:4.5, img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
  { id:"b4", name:"Silk Repair Hair Oil", category:"beauty", price:749, oldPrice:999, rating:4.4, img:"https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80" },
];

const CAT_LABEL = { electronics:"Electronics", fashion:"Fashion", home:"Home", beauty:"Beauty" };
const DELIVERY_FLAT = 79;
const FREE_DELIVERY_OVER = 2000;

let state = {
  category: "all",
  query: "",
  cart: JSON.parse(localStorage.getItem("shopease_cart") || "{}"), // {productId: qty}
};

const rupee = n => "₹" + n.toLocaleString("en-IN");

function starString(rating){
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

/* ---------- Rendering ---------- */
function getFiltered(){
  return PRODUCTS.filter(p => {
    const matchCat = state.category === "all" || p.category === state.category;
    const matchQuery = p.name.toLowerCase().includes(state.query.trim().toLowerCase());
    return matchCat && matchQuery;
  });
}

function renderGrid(){
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  const meta = document.getElementById("resultsMeta");
  const items = getFiltered();

  meta.textContent = `${items.length} product${items.length === 1 ? "" : "s"}`
    + (state.category !== "all" ? ` in ${CAT_LABEL[state.category]}` : "");

  grid.innerHTML = "";
  noResults.hidden = items.length !== 0;

  items.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="card-media">
        ${p.oldPrice ? `<span class="card-badge">SALE</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null;this.src=fallbackImg('${p.name.replace(/'/g,"")}','1B2A4A')">
        <div class="price-tag card-price-tag">
          <span class="tag-hole"></span>
          <span class="tag-price">${rupee(p.price)}</span>
        </div>
      </div>
      <div class="card-body">
        <span class="card-cat">${CAT_LABEL[p.category]}</span>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-rating"><span class="stars">${starString(p.rating)}</span><span>${p.rating}</span></div>
        <div class="card-footer">
          <span class="card-price">${p.oldPrice ? `<span class="strike">${rupee(p.oldPrice)}</span>` : ""}${rupee(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id, btn));
  });
}

/* ---------- Cart ---------- */
function saveCart(){
  localStorage.setItem("shopease_cart", JSON.stringify(state.cart));
}

function addToCart(id, btnEl){
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveCart();
  renderCart();
  updateCartCount();
  if (btnEl){
    btnEl.textContent = "Added ✓";
    btnEl.classList.add("added");
    setTimeout(() => { btnEl.textContent = "Add to cart"; btnEl.classList.remove("added"); }, 1100);
  }
}

function changeQty(id, delta){
  if (!state.cart[id]) return;
  state.cart[id] += delta;
  if (state.cart[id] <= 0) delete state.cart[id];
  saveCart();
  renderCart();
  updateCartCount();
}

function removeFromCart(id){
  delete state.cart[id];
  saveCart();
  renderCart();
  updateCartCount();
}

function cartEntries(){
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === id), qty }))
    .filter(e => e.product);
}

function updateCartCount(){
  const count = Object.values(state.cart).reduce((a, b) => a + b, 0);
  document.getElementById("cartCount").textContent = count;
}

function renderCart(){
  const container = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const footerEl = document.getElementById("cartFooter");
  const entries = cartEntries();

  if (entries.length === 0){
    container.innerHTML = "";
    emptyEl.classList.add("show");
    footerEl.style.display = "none";
    return;
  }
  emptyEl.classList.remove("show");
  footerEl.style.display = "block";

  container.innerHTML = entries.map(({ product, qty }) => `
    <div class="cart-item">
      <img src="${product.img}" alt="${product.name}"
           onerror="this.onerror=null;this.src=fallbackImg('${product.name.replace(/'/g,"")}','1B2A4A')">
      <div class="cart-item-info">
        <span class="cart-item-name">${product.name}</span>
        <span class="cart-item-price">${rupee(product.price)}</span>
        <div class="qty-row">
          <button class="qty-btn" data-action="dec" data-id="${product.id}">−</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
          <button class="remove-btn" data-action="remove" data-id="${product.id}">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  container.querySelectorAll("[data-action]").forEach(btn => {
    const id = btn.dataset.id;
    btn.addEventListener("click", () => {
      if (btn.dataset.action === "inc") changeQty(id, 1);
      if (btn.dataset.action === "dec") changeQty(id, -1);
      if (btn.dataset.action === "remove") removeFromCart(id);
    });
  });

  const subtotal = entries.reduce((sum, e) => sum + e.product.price * e.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FLAT;

  document.getElementById("cartSubtotal").textContent = rupee(subtotal);
  document.getElementById("cartDelivery").textContent = delivery === 0 ? "Free" : rupee(delivery);
  document.getElementById("cartTotal").textContent = rupee(subtotal + delivery);
}

/* ---------- Drawer + Modal ---------- */
function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}
function openModal(){
  document.getElementById("modalOverlay").classList.add("show");
}
function closeModal(){
  document.getElementById("modalOverlay").classList.remove("show");
}

/* ---------- Filters ---------- */
function setCategory(cat){
  state.category = cat;
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
  document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
  renderGrid();
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  renderCart();
  updateCartCount();

  document.querySelectorAll(".nav-link, .chip").forEach(btn => {
    btn.addEventListener("click", () => setCategory(btn.dataset.category));
  });

  document.getElementById("searchInput").addEventListener("input", e => {
    state.query = e.target.value;
    renderGrid();
  });

  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", () => { closeCart(); closeModal(); });
  document.getElementById("continueShopping").addEventListener("click", closeCart);

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const entries = cartEntries();
    if (entries.length === 0) return;
    const total = document.getElementById("cartTotal").textContent;
    document.getElementById("modalMessage").textContent =
      `Thanks for shopping with ShopEase. Your order total was ${total}. This is a demo — no real payment or shipment occurs.`;
    state.cart = {};
    saveCart();
    renderCart();
    updateCartCount();
    closeCart();
    openModal();
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
});