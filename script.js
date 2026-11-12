document.addEventListener("DOMContentLoaded", function(){
    // ========== Глобальні змінні ==========
let products = []; // Масив всіх товарів
let cart = []; // Маив товарів у кошику
let productsBlock = document.querySelector(".card-conteiner")

// ========== Отримання товарів з JSON ==========
async function fetchProducts() {
    const response = await fetch('data.json');
    const data = await response.json();
    products = data; // Оновлюємо глобальний масив для роботи addToCart
    displayProducts(data);
}


// ========== Відображення товарів ==========
function displayProducts(products) {
    productsBlock.innerHTML = ''; // Очищаємо блок товарів

    products.forEach(product => {
        const card = createProductCard(product);
        productsBlock.innerHTML += card;
    });
}
})
function createProductCard(product){
    return `
            <div class="box-1">
  <div class="box-2">
    <img class="img-1" src="data:image/jpeg;base64,…(asset.jpg, 70 KB)" alt="">
    <img class="img-2" src="data:image/svg+xml;base64,…(asset.svg, 1 KB)" alt="">
  </div>
  <div class="box-3">
    <div class="box-4">
      <p class="text-1">3 МІС. / ЖИВЕ 8–12 РОКІВ</p>
    </div>
    <p class="text-2">${product.title}</p>
    <p class="text-3">Просторий вольєр • сіно без обмежень</p>
    <div class="box-5">
      <div class="box-6">
        <p class="text-4">1 800 ₴</p>
      </div>
      <img class="img-3" src="data:image/svg+xml;base64,…(asset-2.svg, 1 KB)" alt="">
    </div>
  </div>
</div>
        `;
}