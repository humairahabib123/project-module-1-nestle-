// filter function:
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list")
    const product = document.querySelectorAll(".store-item")
    const pname = storeitems.getElementsByTagName("h5")

    for (let i = 0; i < pname.length; i++) {
        const match = product[i].getElementsByTagName("h5")[0];

        if (match) {
            let textvalue = match.textContent || match.innerHTML

            if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                product[i].style.display = "";

            }
            else {
                product[i].style.display = "none";
            }

        }

    }
}
// add to cart button functionality:

class cartItem{
    constructor(name,desc, img, price){
        this.name = name
        this.desc = desc
        this.img = img
        this.price = price
        this.quantity = 1
    }
}

// local storage:

class localCart{
    static key = 'cartItems'

    static getLocalCartItems(){
        let cartMap = new Map()
        const cart = localStorage.getItem(localCart.key)
        if(cart===null || cart.length===0) return cartMap
      return new Map (Object.entries(JSON.parse(cart)))
    }
    static addItemToLocalCart(id, item){
        let cart = localCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        elsecart.set(id, item)
        localStorage.setItem (localCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }

    static removeItemFromCart(id){
        let cart = localCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            if(mapItem.quantity>1)
            {
                mapItem.quantity -=1
            cart.set(id, mapItem)
        }
        else
        cart.delete(id)
        }
        if (cart.length === 0)
        localStorage.clear()
        else
        localStorage.setItem (localCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }
}

// cart icon display:

const cartIcon = document.querySelector('.cart-lg') 
const cartWindow = document.querySelector('.cart-window')
cartWindow.inWindow = 0
// cart buttons functionality:
const addToCartBtns = document.querySelectorAll('.store-item-icon')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
} )

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-item")
    const img = e.target.previousElementSibling.src
    const name = e.target.nextElementSibling.children[0].textContent
    const price = e.target.nextElementSibling.children[1].textContent
    price = price.replace("Price: Rs", '')
    const item = new cartItem(name, desc, img, price)
    localCart.addItemToLocalCart(id, item)
 console.log(price)

}

cartIcon.addEventListener('mouseover' , ()=>{
    if(cartWindow.classList.contains('hide'))
    cartWindow.classList.remove('hide')

})

cartIcon.addEventListener('mouseleave' ,()=>{
    // if(cartWindow.classList.contains('hide'))
    setTimeout( () =>{
        if(cartWindow.inWindow===0)
        {
            cartWindow.classList.add('hide')
        }
    } ,500)
    // cartWindow.classList.add('hide')

})

cartWindow.addEventListener('mouseover', ()=>{
    cartWindow.inWindow = 1

})

cartWindow.addEventListener('mouseleave', ()=>{
    cartWindow.inWindow = 1
    cartWindow.classList.add('hide')
})


function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML=""
    const items = localCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
        `
        <img src="${value.img}"> 
                       <div class="details">
                           <h3>${value.name}</h3>
                           <p>${value.desc}
                            <span class="quantity">Quantity: ${value.quantity}</span>
                               <span class="price">Price: $ ${price}</span>
                           </p>
                       </div>
                       <div class="cancel"><i class="fas fa-window-close"></i></div>
        `
       cartItem.lastElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key)
       })
        cartWrapper.append(cartItem)
    }

    if(count > 0){
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `SubTotal: Rs:${total}`
    }
    else
    cartIcon.classList.remove('non-empty')
}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})

