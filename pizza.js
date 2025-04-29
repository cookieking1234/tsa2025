document.addEventListener("DOMContentLoaded", function() {
  for (let x = 1; x <= 8; x++) {
      const button = document.querySelector(`#btn-topping${x}`);
      if (button) {
          button.addEventListener("click", function() {
              this.classList.toggle("active");

              const toppingName = this.getAttribute('data-topping');
              const toppingImage = document.getElementById(`topping-${toppingName}`);

              if (toppingImage) {
                  toppingImage.style.opacity = toppingImage.style.opacity === "1" ? "0" : "1";
              }
          });
      }
  }
});