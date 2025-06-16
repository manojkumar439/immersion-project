let allProducts = [];

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  allProducts = data.products;
  renderProducts(allProducts);
}

function searchProducts() {
  const input = document.getElementById('searchInput').value.trim();
  const error = document.getElementById('error');
  error.textContent = '';

  if (!input) {
    error.textContent = 'Search field cannot be empty.';
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${input}`)
    .then(res => res.json())
    .then(data => {
      if (data.products.length === 0) {
        error.textContent = 'No products found.';
        renderProducts([]);
      } else {
        allProducts = data.products;
        renderProducts(allProducts);
      }
    })
    .catch(() => {
      error.textContent = 'Failed to fetch data.';
    });
}

function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
    `;
    container.appendChild(card);
  });
}

function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;

  if (sortValue === 'price') {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'rating') {
    allProducts.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(allProducts);
}


fetchProducts();
