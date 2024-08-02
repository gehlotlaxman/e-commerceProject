import { getCartProductFromLS } from './getCartProducts';
import { showToast } from './showToast';
import { updateCartValue } from './updateCartValue';
// to get the cart from the localStorage 
// to update the cart from value and also to get the data always ready for localStorage
getCartProductFromLS();

// add to data into localStorage
export const addToCart = (event, id, stock) => {
	let arrLocalStorageProduct = getCartProductFromLS();

	const currentProdElem = document.querySelector(`#card${id}`);
	// console.log(currentProdElem);
	let quantity = currentProdElem.querySelector('.productQuantity').innerText;
	let price = currentProdElem.querySelector('.productPrice').innerText;
	// console.log(quantity, price);
	price = price.replace('₹', '');

	let existingProd = arrLocalStorageProduct.find(curProd => curProd.id === id);

	if (existingProd && quantity > 1) {
		quantity = Number(existingProd.quantity) + Number(quantity);
		price = Number(price * quantity);
		let updatedCart = { id, quantity, price };
		updatedCart = arrLocalStorageProduct.map(curProd => {
			return curProd.id === id ? updatedCart : curProd;
		});

        console.log(updatedCart);
        localStorage.setItem('cartProductLS', JSON.stringify(updatedCart));
        // show toast when product added to the cart
		showToast("add" , id);
	}

	if (existingProd) {
		return false;
	}

	price = Number(price * quantity);
	quantity = Number(quantity);

	// let updateCart = {id,quantity,price}; // Array of an objects..
	arrLocalStorageProduct.push({ id, quantity, price });
	localStorage.setItem('cartProductLS', JSON.stringify(arrLocalStorageProduct));

	//update the Cart button Value
	updateCartValue(arrLocalStorageProduct);
     // show toast when product added to the cart
	showToast("add" , id);
};
