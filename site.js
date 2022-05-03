// prettier-ignore

const products = [
    {
        id: 0,
        title: 'Kal tvoey mamashi',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 20,
        price: 108,
    },
    {
        id: 1,
        title: 'Drisnya 9000',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 15,
        price: 69,
    },
    {
        id: 2,
        title: 'Podliva',
        description:
            "5656Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 50,
        price: 223,
    },
    {
        id: 3,
        title: 'Drisnya',
        description:
            "12Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 75,
        price: 288,
    },
    {
        id: 4,
        title: 'Zhizha Zhizhi',
        description:
            "343Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 100,
        price: 1488
    },
    {
        id: 5,
        title: 'Govna pyatno',
        description:
            "444Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        img: 'http://via.placeholder.com/150x150',
        weight: 20,
        price: 420,
    },
]

function renderCatalogProducts() {
    const parentNode = document.getElementById('products-grid')

    products.forEach((product) => {
        let productNode = document.createElement('div')
        productNode.classList.add('product-item')
        productNode.innerHTML = `
            <div class="product-item-h1">${product.title}</div>
            <img src="${product.img}" />
            <div class="product-item-p">${product.description}</div>
            <span class="weight">${product.weight} gr</span>
            <span class="cost">${product.price} $</span>
            <div class="toCartButton" buttonId="${product.id}">ADD TO CART</div>`
        parentNode.appendChild(productNode)
    })
}

function getCartProducts() {
    let result = []
    let cart = getCart()
    cart.forEach((cartItem, index) => {
        result[index] = cart[index]
        result[index].fields = products.find(
            (product) => product.id === cartItem.product_id
        )
    })
    return result
}

function getCartProductSubtotal(cartProduct) {
    let result =
        parseInt(cartProduct.fields.price, 10) *
        parseInt(cartProduct.quantity, 10)
    return result
}

function getCartProductsTotalCost() {
    let cart = getCartProducts()
    let total = 0
    let subtotal = 0
    cart.forEach((cartProduct) => {
        total += getCartProductSubtotal(cartProduct)
    })
    return total
}

function getCartTotalItems() {
    let quantity = 0
    let result = 0
    let cart = getCart()
    cart.forEach((cartProduct) => {
        quantity = parseInt(cartProduct.quantity, 10)
        result += quantity
    })
    return result
}

function renderCartTable() {
    let cartProducts = getCartProducts()
    let cartTableNode = document.getElementById('cart-table')
    cartProducts.forEach((resultProduct, index) => {
        let cartTableRowNode = document.createElement('div')
        cartTableRowNode.classList.add('cart-item')
        cartTableRowNode.innerHTML = `
            <img src="${cartProducts[index].fields.img}" />
            <div class="cart-product-text">${
                cartProducts[index].fields.title
            }</div>
            <div class="cart-weight">${
                cartProducts[index].fields.weight
            } gr</div>
            <div class="art-table-quantity">${
                cartProducts[index].quantity
            } units</div>
            <div class="cart-cost">${cartProducts[index].fields.price} $</div>
            <div class="cart-totalcost">${getCartProductSubtotal(
                cartProducts[index]
            )} $</div>
            <button onclick="removeFromCart(${
                cartProducts[index].product_id
            })">DELETE</button>`
        cartTableNode.appendChild(cartTableRowNode)
    })
}

function renderCartWidget() {
    let totalItems = getCartTotalItems()
    let totalCost = getCartProductsTotalCost()
    document.getElementById(
        'header-cart-item-counter'
    ).innerHTML = `${totalItems}`
    document.getElementById(
        'header-cart-price-counter'
    ).innerHTML = `${totalCost} $`
}

function registerListenerToAddtoCart() {
    let elements = document.getElementsByClassName('toCartButton')
    elements = Array.from(elements)
    elements.forEach((el) => {
        el.addEventListener('click', addToCart)
    })
}

function addToCart() {
    let productId = this.getAttribute('buttonId')
    if (findProductIndexInCart(productId) !== -1) {
        return
    }
    let newCartProduct = { product_id: +productId, quantity: 1 }
    let cart = getCart().concat(newCartProduct)
    updateCart(cart)
}

function removeFromCart(product_id) {
    let cart = getCart()
    let cartIndex = findProductIndexInCart(product_id)
    cart.splice(cartIndex, 1)
    updateCart(cart)
    location.reload()
}

function getCart() {
    let cart = JSON.parse(localStorage.getItem('CART'))
    if (cart === null) {
        return []
    }
    return JSON.parse(localStorage.getItem('CART'))
}

function findProductIndexInCart(productId) {
    let cart = getCart()
    let item = cart.find((cartItem) => cartItem.product_id == +productId)
    let index = cart.indexOf(item)
    return index
}

function updateCart(cart) {
    localStorage.setItem('CART', JSON.stringify(cart))
    renderCartWidget()
}

function clearCart() {
    updateCart([])
    location.reload()
}

//MAIN FUNCTION BLOCK
function getPageName() {
    let path = window.location.pathname
    let PageName = path.split('/').pop().slice(0, -5)
    return PageName
}

function main() {
    renderCartWidget()

    console.log(getCartProductsTotalCost())
    console.log(getCartTotalItems())
    const PageName = getPageName()
    if (PageName === 'cart') {
        renderCartTable()
    }
    if (PageName === 'catalog') {
        renderCatalogProducts()
        registerListenerToAddtoCart()
    }
}
main()
