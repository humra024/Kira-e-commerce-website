// cart start

let listProductHTML = document.querySelector('.pro-container');
let products=[];
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.closeCart');
let cartQuantSpan = document.querySelector(".cart-quant");
// let cartQuantSpan = document.querySelectorAll(".cart-quant"); or by class for multiple elements
let cart=[]

//cart items menu sidebar
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})


// Home-product items
const addDataToHTML = () => {
    listProductHTML.innerHTML='';
    // remove datas default from HTML

    // add new datas
    if(products.length > 0) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('pro');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    </div>
                <h4>$${product.price}</h4>
            </div>
            <button class="button-cart"><i class="fa-solid fa-cart-shopping cart addCart"></i></button>`;                listProductHTML.appendChild(newProduct);
        });
    }
}

//product cart icon clicked
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let cart_btn = positionClick.parentElement; //cart icon inside button inside pro div
        let id_product = cart_btn.parentElement.dataset.id;
        addToCart(id_product);
        body.classList.add('showCart');
    }
})

//product added to cart
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){ //if this product is not in cart and cart is empty
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){ //if this product is not in cart and cart is not empty
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{//if this product is already in cart
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let price_item=0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>`;
            price_item=price_item+(info.price * item.quantity);
        })
    }
    cartQuantSpan.innerText = totalQuantity;
    // updateCartQuantities(totalQuantity); for multiple elements
    
    //cart total
    let itemTotal = document.createElement('div');
    listCartHTML.appendChild(itemTotal);
    itemTotal.innerHTML =
    `<div>
        <hr/>
        <h4 align="center" style="margin-top:10px">Cart Total =$${price_item}<h4>
    </div>`
}
//for multiple elements
// const updateCartQuantities = (totalQuantity) => {
//     // cartQuantSpan.forEach(span => {
//     //     span.innerText = totalQuantity;
//     // }); or 
//     for (let i = 0; i < cartQuantSpan.length; i++) {
//         cartQuantSpan[i].innerText = totalQuantity;
//     }
// };


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}


const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(products);
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
// cart end


// Script for navigation bar
const bar=document.getElementById('bar');
const nav=document.getElementById('navbar');
const close=document.getElementById('close');

//if the navbar is showing on the screen or not, if bar clicked
bar.addEventListener('click',() => {
    nav.classList.add('active');
    body.classList.remove('showCart');
})

close.addEventListener('click',() => {
        nav.classList.remove('active');
})

iconCart.addEventListener('click', () => {
    nav.classList.remove('active');
})


// const bars = document.querySelectorAll('#bar');
// const navs = document.querySelectorAll('.cnavbar');
// const close = document.querySelectorAll('#close');

// //if the navbar is showing on the screen or not, if bar clicked
// bars.forEach((bar, index) => {
//     bar.addEventListener('click', () => {
//         navs[index].classList.add('active');
//         body.classList.remove('showCart');
//     })

//     close[index].addEventListener('click', () => {
//         navs[index].classList.remove('active');     
//     })

//     iconCart.addEventListener('click', () => {
//         navs[index].classList.remove('active');
// })

// });
