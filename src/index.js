const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

// Lista de produtos com base nos ids fornecidos
function productListMount(ids, productsList ) {
	return productsList.filter(({ id }) => ids.includes(id))
}

// Mapeamento de produtos para validação
function productsListValidation(cart) {
	return cart.map(({ name, category }) => ({ name, category }))
}

// Verifica looks selecionados
function looksVerify(cart) {
	return cart.reduce((looks, product) => {
		return looks.includes(product.category) ?
		looks :
		[...looks, product.category];
	}, []);
}

// Cálculo do valor total sem promoção
function totalPriceNoPromotion(cart) {
	return cart.reduce((price, product) => {
		return price + product.regularPrice;
	}, 0).toFixed(2)
}

// Cálculo do valor total com promoção
function totalPricePromotion(cart, promotion) {
	return cart.reduce((price, product) => {
		const pricePromotion = product.promotions.find(({looks}) =>
			looks.includes(promotion)
		)
		return pricePromotion ? price + pricePromotion.price : price + product.regularPrice
	}, 0).toFixed(2)
}

function getShoppingCart(ids, productsList) {
	
	const cart = productListMount(ids, productsList )

	const products = productsListValidation(cart)
	
	const looks = looksVerify(cart)

	// Tipo de Promoção
	const promotion = promotions[looks.length - 1]

	const fullPrice = totalPriceNoPromotion(cart)

	const totalPrice = totalPricePromotion(cart, promotion)

	// Calcula o valor do descont e o percentual de desconto
	const discountValue = (fullPrice - totalPrice).toFixed(2)
	const discount = (`${((discountValue * 100) / fullPrice).toFixed(2)}%`)
	
	// Monta o resultado para ser enviado ao fim da função
	return {
		products, 
		promotion, 
		totalPrice,
		discountValue,
		discount
	}
}

module.exports = { getShoppingCart };
