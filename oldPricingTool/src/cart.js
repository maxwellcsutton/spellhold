// TODO
// 1.make this reload whenever the cart tab is opened
// 2.make the data display in a table
// 3.maybe scrap all this and use a library
let rawCartSaleData = [JSON.parse(sessionStorage.getItem("saleData"))]
let rawCartPurchaseData = [JSON.parse(sessionStorage.getItem("purchaseData"))]
let cartSaleData = rawCartSaleData.flat(Infinity)
let cartPurchaseData = rawCartPurchaseData.flat(Infinity)

let cartContents = document.getElementById("cart")

cartSaleData.forEach((sale)=>{
    if (!sale){
        return
    }
    // console.log(sale.name)
    // console.log(sale.setCode)
    // console.log(sale.quantity)
    // console.log(sale.price)
    // console.log(sale.foil)
    let cartSaleParent = document.createElement("div")
    let cartSaleChild = cartContents.appendChild(cartSaleParent)
    cartSaleChild.innerHTML = `
    <div id=cart-sale-contents class="cart-contents">
        <form>
            ${sale.setCode.toUpperCase()} ${sale.name} ${sale.foil}
            <input id="cart-price-selling-${sale.setCode}" class="card-price" type="text" value="${sale.price}">
            <input id="cart-quantity-selling-${sale.setCode}" class="card-quantity" type="number" value="${sale.quantity}">
        </form>
    </div>`
})
cartPurchaseData.forEach((purchase)=>{
    if (!purchase){
        return
    }
    let cartPurchaseParent = document.createElement("div")
    let cartPurchaseChild = cartContents.appendChild(cartPurchaseParent)
    cartPurchaseChild.innerHTML = `
    <div id=cart-purchase-contents class="cart-contents">
        <form>
            ${purchase.setCode.toUpperCase()} ${purchase.name} ${purchase.foil}
            <input id="cart-price-buying-${purchase.setCode}" class="card-price" type="text" value="${purchase.price}">
            <input id="cart-quantity-buying-${purchase.setCode}" class="card-quantity" type="number" value="${purchase.quantity}">
        </form>
    </div>`
    // console.log(purchase.name)
    // console.log(purchase.setCode)
    // console.log(purchase.quantity)
    // console.log(purchase.price)
    // console.log(purchase.foil)
})