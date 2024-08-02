import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
    
     let productSubTotal = document.querySelector(".productSubTotal");
     let productFinalTotal = document.querySelector(".productFinalTotal");
     let productTax = document.querySelector(".productTax");
     let localCartProducts = getCartProductFromLS();
     let initialValue = 0;
     let totalProductPrice = localCartProducts.reduce((accumulator, curElem) => {
         let productPrice = parseInt(curElem.price) || 0;
         return accumulator + productPrice;
     },initialValue)  ;

     productSubTotal.innerText = `₹${totalProductPrice}`;
     productTax = productTax.innerText.replace("₹", "");
     console.log(productTax);
     productFinalTotal.textContent = `₹${(Number(totalProductPrice) + Number(productTax))}`;
     
};