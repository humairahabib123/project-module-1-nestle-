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

// cart icon display:

const cartIcon = document.querySelector('.cart-lg') 
const cartWindow = document.querySelector('.cart-window')
cartWindow.inWindow = 0


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
    cartWindow.classList.add('hide')

})

cartWindow.addEventListener('mouseover', ()=>{
    this.inWindow = 1

})