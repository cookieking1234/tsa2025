let selectedToppings = [];

const cart = {};

function addToCart(productName, productPrice) {
    if (cart[productName]) {
        cart[productName].quantity += 1;
        cart[productName].totalPrice += productPrice;
    } else {
        cart[productName] = {
            quantity: 1,
            totalPrice: productPrice
        };
    }
    updateCartDisplay();
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("cartUpdated"));
}

function addToCart(productName, productPrice) {
    const cart = getCart();
    if (cart[productName]) {
        cart[productName].quantity += 1;
        cart[productName].totalPrice += productPrice;
    } else {
        cart[productName] = {
            quantity: 1,
            totalPrice: productPrice
        };
    }
    saveCart(cart);
}

function updateCartDisplay(containerId = "cart") {
    const cart = getCart();
    const cartList = document.getElementById(containerId);
    if (!cartList) return;

    cartList.innerHTML = '';

    Object.entries(cart).forEach(([product, item]) => {
        const li = document.createElement('li');
        li.innerText = `${product} - Quantity: ${item.quantity} - Total: $${item.totalPrice.toFixed(2)}`;
        cartList.appendChild(li);
    });
}

// Auto-update when cart changes
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay(); // initial display
    document.addEventListener("cartUpdated", () => updateCartDisplay());
});

function updateCartDisplay(containerId = "cart") {
    const cart = getCart();
    const cartList = document.getElementById(containerId);
    if (!cartList) return;

    cartList.innerHTML = '';
    let total = 0;

    Object.entries(cart).forEach(([product, item]) => {
        total += item.totalPrice;
        const li = document.createElement('li');
        li.innerText = `${product} - Qty: ${item.quantity} - Total: $${item.totalPrice.toFixed(2)}`;
        cartList.appendChild(li);
    });

    const totalLi = document.createElement('li');
    totalLi.innerText = `Cart Total: $${total.toFixed(2)}`;
    cartList.appendChild(totalLi);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();

    document.addEventListener("cartUpdated", () => updateCartDisplay());

    const clearCartBtn = document.querySelector(".clearCartBtn");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            document.dispatchEvent(new CustomEvent("cartUpdated"));
        });
    }

    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify({}));
    }

    updateCartDisplay();

    document.addEventListener("cartUpdated", () => updateCartDisplay());

    // ✅ Attach toggleTopping to all topping buttons
    document.querySelectorAll(".layer").forEach(button => {
        button.addEventListener("click", toggleTopping);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();

    document.addEventListener("cartUpdated", () => updateCartDisplay());

    const checkCartBtn = document.querySelector(".checkout-btn");
    if (checkCartBtn) {
        checkCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            document.dispatchEvent(new CustomEvent("cartUpdated"));
        });
    }

    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify({}));
    }

    updateCartDisplay();

    document.addEventListener("cartUpdated", () => updateCartDisplay());

    // ✅ Attach toggleTopping to all topping buttons
    document.querySelectorAll(".layer").forEach(button => {
        button.addEventListener("click", toggleTopping);
    });
});


document.getElementById("viewCartBtn").addEventListener("click", function () {
    document.getElementById("cartBox").classList.add("visible");
});