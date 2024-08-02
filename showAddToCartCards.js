import products from './api/products.json';
import { fetchQuantityFromCartLS } from './public/fetchQuantityFromCartLS';
import { getCartProductFromLS } from './public/getCartProducts';
import { incrementDecrement } from './public/incrementDecrement';
import { removeProductFromCart } from './public/removeProductFromCart';
import { updateCartProductTotal } from './public/updateCartProductTotal';

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter(curProd => {
	// console.log(curProd.name);
	// return  cartProducts.includes(curProd.id);
	return cartProducts.some(curElem => curElem.id === curProd.id);
});

// console.log(filterProducts);

// to update the addToCart page

const cartElement = document.querySelector('#productCartContainer');
const templateContainer = document.querySelector('#productCartTemplate');

const showCartProduct = () => {
	filterProducts.forEach(curProd => {
		const { category, id, image, name, stock, price } = curProd;
		let productClone = document.importNode(templateContainer.content, true);

		const lSActualData = fetchQuantityFromCartLS(id, price);
		productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
		productClone.querySelector('.category').textContent = category;
		productClone.querySelector('.productName').textContent = name;
		productClone.querySelector('.productImage').src = image;

		productClone.querySelector('.productQuantity').textContent =
			lSActualData.quantity;
		productClone.querySelector('.productPrice').textContent =
			lSActualData.price;

		productClone
			.querySelector('.stockElement')
			.addEventListener('click', event => {
				incrementDecrement(event, id, stock, price);
			});

		productClone
			.querySelector('.remove-to-cart-button')
			.addEventListener('click', () => removeProductFromCart(id));

		cartElement.append(productClone);
	});
};
// showing the cartProducts

showCartProduct();

// Calculating the card total in our cartProducts page.

updateCartProductTotal();
