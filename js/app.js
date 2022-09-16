const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list")
    const product = document.querySelectorAll(".store-item")
    const pname = storeitems.getElementsByTagName("h5")

    for (let i = 0; i < pname.length; i++) {
        const match = product[i].getElementsByTagName("h5")[0];

        if (match){
            let textvalue = match.textContent || match.innerHTML

            if (textvalue.toUpperCase().indexOf(searchbox) > -1)
{
    product[i].style.display = "";

}
else{
    product[i].style.display="none";
}

} 
        
    }
}