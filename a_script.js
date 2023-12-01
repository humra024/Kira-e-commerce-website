
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

// iconCart.addEventListener('click', () => {
//     nav.classList.remove('active');
// })



//either make separate js files for html files for navbar
//or use getElementsByClassName/querySelectorAll and use loop