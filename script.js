import desserts from "./data.js";

const dessertElem = document.querySelector("#product-list");
const listTexts = [];

function genererCards() {
  desserts.forEach(desset => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="product-image">
        <img src="${desset.image.desktop}" class="product-img" />
        <div class="add-btn-container">
          <button class="btn-add-to-cart">
            <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
            <p>Add to Cart</p>
          </button>
        </div>
        <div class="btn-quantity">
          <img src="assets/images/icon-decrement-quantity.svg" alt="Decrement" style="width: 15px; height: 15px;cursor: pointer; margin-left=50px" class="quantity-btn minus"/>
          <p class="quantity">1</p>
          <img src="assets/images/icon-increment-quantity.svg" alt="Increment" class="quantity-btn plus" />
        </div>
      </div>
      <div class="product-info">
        <p class="product-type">${desset.category}</p>
        <p class="product-name">${desset.name}</p>
        <p class="product-price">$<span class="price">${desset.price}</span></p>
      </div>
    `;
    dessertElem.appendChild(card);
  });
}

genererCards();

const all = Array.from(document.querySelectorAll('.product-card'));
all.forEach((element, index) => {
  const addBtn = element.querySelector(".btn-add-to-cart");
  const quantityBtns = element.querySelector(".btn-quantity");
  const totalNum = document.querySelector("#cart-count");
  const emptyCart = document.querySelector(".cart-empty");
  const totalPriceContainer = document.querySelector(".cart-total");
  const carbonNeutral = document.querySelector(".cart-note");
  const confirmBtn = document.querySelector("#btn-confirm-order");
  const borderImg = element.querySelector(".product-img");
  const price = element.querySelector(".price");
  const add = element.querySelector(".plus");
  const remove = element.querySelector(".minus");
  let quantity = element.querySelector(".quantity");
  const totalValue = document.querySelector("#cart-total-price");

  addBtn.addEventListener("click", () => {
    quantityBtns.style.display = "flex";
    borderImg.style.border = "solid 2px var(--red)";
    borderImg.style.borderRadius = "10px";
    totalValue.innerText = parseFloat(totalValue.innerText) + parseFloat(price.innerText);
    totalNum.innerText = parseFloat(totalNum.innerText) + 1;
    emptyCart.style.display = "none";
    totalPriceContainer.style.display = "flex";
    carbonNeutral.style.display = "flex";
    confirmBtn.style.display = "block";
    genertext(index);
  });

  add.addEventListener("click", () => {
    quantity.innerText = parseFloat(quantity.innerText) + 1;
    totalNum.innerText = parseFloat(totalNum.innerText) + 1;
    totalValue.innerText = parseFloat(totalValue.innerText) + parseFloat(price.innerText);
  });

  remove.addEventListener("click", () => {
    if (quantity.innerText == 1) {
      quantityBtns.style.display = "none";
      borderImg.style.border = "none";
      totalNum.innerText = parseFloat(totalNum.innerText) - 1;
      totalValue.innerText = parseFloat(totalValue.innerText) - parseFloat(price.innerText);
    } else {
      quantity.innerText = parseFloat(quantity.innerText) - 1;
      totalNum.innerText = parseFloat(totalNum.innerText) - 1;
      totalValue.innerText = parseFloat(totalValue.innerText) - parseFloat(price.innerText);
    }
  });
});

function genertext(index = null) {
  document.querySelector(".cart-items").innerHTML = "";
  if (index != null) {
    listTexts.push(desserts[index]);
  }
  listTexts.filter(elem => elem !== undefined);
  listTexts.forEach(elem => {
    if (elem) {
      const text = document.createElement("div");
      text.classList.add("cart-item");
      text.innerHTML = `
        <div class="cart-item-info">
          <p class="cart-item-name">${elem.name}</p>
          <p><span><span class="valueText">1</span>x</span> @ $<span class="pricecard">${elem.price}</span> $<span class="totall">${elem.price}</span></p>
        </div>
        <div class="cart-item-remove">
          <img src="assets/images/icon-remove-item.svg" alt="Remove item" />
        </div>
      `;
      document.querySelector(".cart-items").appendChild(text);
    }

    let minuus = document.querySelectorAll(".minus");
    minuus.forEach(mini => {
      mini.addEventListener("click", function() {
        const card = mini.closest(".cart-item");
        const name = card.querySelector(".cart-item-name").textContent;
        const quantity = mini.nextElementSibling.textContent;
        const texts = document.querySelectorAll(".cart-item");
        texts.forEach(textElem => {
          const para = textElem.querySelector(".cart-item-info");
          const cardName = para.querySelector(".cart-item-name").textContent;
          let total = para.querySelector(".totall");
          const priceCard = para.querySelector(".pricecard").textContent;
          const valueinput = para.querySelector(".valueText");
          if (name == cardName) {
            valueinput.textContent = quantity;
            total.textContent = quantity * priceCard;
          }
        });
        if (parseInt(quantity) < 1) {
          removeText(name);
        }
      });
    });

    let pluss = document.querySelectorAll(".plus");
    pluss.forEach(plus => {
      plus.addEventListener("click", function() {
        const card = plus.closest(".cart-item");
        const name = card.querySelector(".cart-item-name").textContent;
        const quantity = plus.previousElementSibling.textContent;
        const texts = document.querySelectorAll(".cart-item");
        texts.forEach(textElem => {
          const para = textElem.querySelector(".cart-item-info");
          const cardName = para.querySelector(".cart-item-name").textContent;
          let total = para.querySelector(".totall");
          const priceCard = para.querySelector(".pricecard").textContent;
          const valueinput = para.querySelector(".valueText");
          if (name == cardName) {
            valueinput.textContent = quantity;
            total.textContent = quantity * priceCard;
          }
        });
      });
    });
  });
}

function removeText(name) {
  const index = listTexts.findIndex(item => item.name === name);
  if (index !== -1) {
    listTexts.splice(index, 1);
  }
  genertext();
}

const confirmBtnFinal = document.getElementById("btn-confirm-order");

const modal = document.createElement("div");
modal.classList.add("order-modal");
modal.innerHTML = `
  <div class="order-content">
    <img src="assets/images/icon-order-confirmed.svg"/">
    <h2>Order Confirmed</h2>
    <p>We hope you enjoy your food!</p>
    <div class="order-items">
    </div>
    <p class="order-total">Order Total: <span class="final-price"><b>0</b></span>$</p>
    <button class="reset-order">Start New Order</button>
  </div>
`;
modal.style.display ="none"
document.body.appendChild(modal);

confirmBtnFinal.addEventListener("click", () => {
  const orderItems = modal.querySelector(".order-items");
  const finalPrice = modal.querySelector(".final-price");
  orderItems.innerHTML = "";

  let total = 0;
  const usedNames = [];

  listTexts.forEach(item => {
    const card = all.find(c => c.querySelector(".product-name").textContent === item.name);
    const quant = card.querySelector(".quantity").textContent;
    const price = item.price;
    const subTotal = quant * price;
    total += subTotal;

    if (!usedNames.includes(item.name)) {
      orderItems.innerHTML += `
  <div class="item-row" style="display: flex; align-items: center; gap: 1rem;">
    <img src="${item.image.desktop}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" />
    <div>
      <p style="font-weight: bold;">${item.name}</p>
      <p>${quant} x $${price} = $${subTotal.toFixed(2)}</p>
    </div>
  </div>
  <hr>
`;
      usedNames.push(item.name);
    }
  });

  finalPrice.textContent = total.toFixed(2);
  modal.style.display = "flex";
});


modal.querySelector(".reset-order").addEventListener("click", () => {
  listTexts.length = 0;
  document.querySelector(".cart-items").innerHTML = "";
  document.getElementById("cart-count").innerText = "0";
  document.getElementById("cart-total-price").innerText = "0";
  modal.style.display = "none";

  all.forEach(card => {
    card.querySelector(".btn-quantity").style.display = "none";
    card.querySelector(".product-img").style.border = "none";
    card.querySelector(".quantity").innerText = "1";
  });

  document.querySelector(".cart-note").style.display = "none";
  document.querySelector(".cart-total").style.display = "none";
  document.querySelector(".cart-empty").style.display = "block";
  confirmBtnFinal.style.display = "none";
});