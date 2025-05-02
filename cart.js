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



document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".layer").forEach(button => {
        const topping = button.getAttribute("data-topping");

        button.addEventListener("click", () => {
            toggleToppingSelection(topping);
        });
    });
});



function toggleToppingSelection(topping) {
    const index = selectedToppings.indexOf(topping);

    if (index > -1) {
        selectedToppings.splice(index, 1); // Remove if already selected
    } else {
        selectedToppings.push(topping); // Add if not selected
    }

    console.log("Selected toppings:", selectedToppings);
}


function resetToppings() {
    selectedToppings = [];
    document.querySelectorAll('.layer.active').forEach(btn => btn.classList.remove("active"));
}

function addToCartCustom(productName, productPrice, toppings = []) {
    const cart = getCart();
    const key = `${productName} (${toppings.join(", ") || "No toppings"})`;

    if (cart[key]) {
        cart[key].quantity += 1;
        cart[key].totalPrice += productPrice;
    } else {
        cart[key] = {
            quantity: 1,
            totalPrice: productPrice,
            toppings
        };
    }

    saveCart(cart);
    resetToppings();
}

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


document.querySelectorAll(".viewCartBtn").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("cartBox").classList.add("visible");
    });
});

document.querySelectorAll(".viewCartBtn2").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("cartBox").classList.add("visible");
    });
});
