import {getCardData, cardData} from "./getCardData.js"

printCardData()

async function printCardData(){
    await getCardData()
    if (cardData == undefined || cardData.length < 1){
        print404()
        return
    }
    printStaticData()
    cardData.forEach(printDynamicData)
    // removing cart data for merge to master
    // cardData.forEach(printCartLogic)
}

function printStaticData(){
    // this will display all the info that doesn't change per set at the top, but I might
    // move all the card data together once I add tabs for each set
    let staticCardInfo = document.getElementById('static-card-info');
    let staticParent1 = document.createElement("p")
    let staticChild1 = staticCardInfo.appendChild(staticParent1)
    let isCreature = cardData[0].power
    let isPlaneswalker = cardData[0].loyalty
    let isDoubleSided = cardData[0].cardFaces
    // more logic for handling double sided cards, creatures, and planeswalkers
    if (!isDoubleSided){
        let staticResultsTemplate =
            `<b>Color: </b>${cardData[0].color}<br>
            <b>Mana Cost: </b>${cardData[0].cost}<br>
            <b>Type: </b>${cardData[0].type}<br>
            <b>Rules Text: </b>${cardData[0].text}<br>`
         if (!cardData[0].cardFaces){
            if (!isCreature && !isPlaneswalker){
                staticChild1.innerHTML = staticResultsTemplate
            } else if (isCreature){
                staticChild1.innerHTML = staticResultsTemplate + 
                    `<b>Power: </b>${cardData[0].power}<br>
                    <b>Toughness: </b>${cardData[0].toughness}<br>`
            } else if (isPlaneswalker){
                staticChild1.innerHTML = staticResultsTemplate + 
                    `<b>Loyalty: </b>${cardData[0].loyalty}<br>`
            } else {
                staticChild1.innerHTML = `Failed to display card data`
            }
        }
    } else if (isDoubleSided) {
        let staticParent2 = document.createElement("p")
        let staticChild2 = staticCardInfo.appendChild(staticParent2)
        let eachFaceHTML = []
        let eachFace = cardData[0].cardFaces
        eachFace.forEach((face)=>{
            let staticResultsTemplate = 
            `<b>Name: </b>${face.name}<br>
            <b>Color: </b>${face.color}<br>
            <b>Mana Cost: </b>${face.cost}<br>
            <b>Type: </b>${face.type}<br>
            <b>Rules Text: </b>${face.text}<br>`
            let isCreature = face.power
            let isPlaneswalker = face.loyalty
            if (!isCreature && !isPlaneswalker){
                eachFaceHTML.push(staticResultsTemplate)
            } else if (isCreature){
                staticResultsTemplate = staticResultsTemplate + 
                    `<b>Power: </b>${face.power}<br>
                    <b>Toughness: </b>${face.toughness}<br>`
                eachFaceHTML.push(staticResultsTemplate)
            } else if (isPlaneswalker) {
                staticResultsTemplate = staticResultsTemplate +
                    `<b>Loyalty: </b>${face.loyalty}<br>`
                eachFaceHTML.push(staticResultsTemplate)
            } else {
                eachFaceHTML.push(`Failed to display card data`)
            }
        })
        staticChild1.innerHTML = eachFaceHTML[0]
        staticChild2.innerHTML = eachFaceHTML[1]
        }
}

function printDynamicData(elem){
    // this will display all info that changes per set
    let isDoubleSided = cardData[0].cardFaces
    let isSplitOrNormal = cardData[0].image
    let dynamicTab = document.getElementById("tab-buttons")
    let dynamicTabParent = document.createElement("button")
    let dynamicTabButtons = dynamicTab.appendChild(dynamicTabParent)
    dynamicTabButtons.innerHTML = `<button class="tab-links" onclick="openCardTab(event, '${elem.setCode}')">${elem.setCode.toUpperCase()}</button>`
    let cardImage = "No Image Found"
    if (isSplitOrNormal){
        cardImage = `<img class="card-image" src=${elem.image} alt=${elem.setCode}>`
    } else if (isDoubleSided){
        cardImage = `<img class="card-image" src=${elem.cardFaces[0].image} alt=${elem.setCode}>
                    <img class="card-image" src=${elem.cardFaces[1].image} alt=${elem.setCode}>`
    } else {
        `<img class="card-image" src="https://ih0.redbubble.net/image.740534994.5777/mp,840x830,matte,f8f8f8,t-pad,750x1000,f8f8f8.u1.jpg" alt="Failed to display image">`
    }
    let dynamicResultsTemplate = 
        `<div id=${elem.setCode} class="tab-results">
            <h1 class="results-title">${elem.setName}</h1>
            <div class="image-container">
            ${cardImage}
            </div>
            <div class="content-container">
                <b>Set Name: </b>${elem.setName}<br>
                <b>Set Code: </b>${elem.setCode.toUpperCase()}<br>
                <b>Collector's Number: </b>${elem.collectorsNumber}<br>
                <b>Rarity: </b>${elem.rarity.charAt(0).toUpperCase() + elem.rarity.slice(1)}<br>
                <b>Price: </b>${elem.price}<br>
                <b>Projected Buy Price: </b>${elem.projectedBuyPrice}<br>
                <b>Foil Price: </b>${elem.foilPrice}<br>
                <b>Projected Foil Buy Price: </b>${elem.projectedFoilBuyPrice}<br><br>
                <a href=${elem.link} target="_blank">Check TCGPlayer.com</a><br><br>
            </div>
        </div>`

    let dynamicTabContent = document.getElementById("tab-content")
    let dynamicTabContentParent = document.createElement("div")
    let dynamicTabContentChild = dynamicTabContent.appendChild(dynamicTabContentParent)
    dynamicTabContentChild.innerHTML = dynamicResultsTemplate
}

function printCartLogic(elem){
        // this is to stop people from typing or copy/pasting e, -, or + into the number field
        // and also provides the logic for the fake cart system
        let cartElements = document.getElementById(`add-to-fake-cart-${elem.setCode}`)
        let cartScripts = document.createElement("script")
        cartScripts.type = "text/javascript"
        let setCode = elem.setCode.replace(/[()]/g, "")
        let sellQuantityField = `sellQuantityField_${setCode}`
        let sellInvalidChars = `sellInvalidChars_${setCode}`
        let buyQuantityField = `buyQuantityField_${setCode}`
        let buyInvalidChars = `buyInvalidChars_${setCode}`
        let sellPrice = `sellPrice_${setCode}`
        let sellQuantity = `sellQuantity_${setCode}`
        let sellButton = `sellButton_${setCode}`
        let sellFoil = `sellFoil_${setCode}`
        let sellScriptsContent = document.createTextNode(`
            let ${sellQuantityField} = document.getElementById("quantity-selling-${elem.setCode}")
            let ${sellInvalidChars} = ["e", "+", "-"]
            ${sellQuantityField}.addEventListener("input", ()=>{
                ${sellQuantityField}.value = ${sellQuantityField}.value.replace(/[e\+\-]/gi, "");
            });
            ${sellQuantityField}.addEventListener("keydown", (e)=>{
                if (${sellInvalidChars}.includes(e.key)) {
                    e.preventDefault();
                }
            })
            let ${sellPrice} = document.getElementById("price-selling-${elem.setCode}")
            let ${sellQuantity} = document.getElementById("quantity-selling-${elem.setCode}")
            let ${sellButton} = document.getElementById("sell-button-${elem.setCode}")
            let ${sellFoil} = document.getElementById("foil-selling-dropdown-${elem.setCode}")
            ${sellButton}.addEventListener("click", ()=>{
                let sale = new Object()
                sale.name = "${elem.name}"
                sale.setCode = "${elem.setCode}"
                sale.quantity = ${sellQuantity}.value
                sale.price = ${sellPrice}.value
                sale.foil = ${sellFoil}.value
                saleData.push(sale)
                sessionStorage.setItem("saleData", JSON.stringify(saleData))
                let storedSaleData = sessionStorage.getItem("saleData")
                console.log(storedSaleData)
        })`)
        let buyPrice = `buyPrice_${setCode}`
        let buyQuantity = `buyQuantity_${setCode}`
        let buyButton = `buyButton_${setCode}`
        let buyFoil = `buyFoil_${setCode}`
        let buyScriptsContent = document.createTextNode(`
            let ${buyQuantityField} = document.getElementById("quantity-buying-${elem.setCode}")
            let ${buyInvalidChars} = ["e", "+", "-"]
            ${buyQuantityField}.addEventListener("input", ()=>{
                ${buyQuantityField}.value = ${buyQuantityField}.value.replace(/[e\+\-]/gi, "");
            });
            ${buyQuantityField}.addEventListener("keydown", (e)=>{
                if (${buyInvalidChars}.includes(e.key)) {
                    e.preventDefault();
                }
            })
            let ${buyPrice} = document.getElementById("price-buying-${elem.setCode}")
            let ${buyQuantity} = document.getElementById("quantity-buying-${elem.setCode}")
            let ${buyButton} = document.getElementById("buy-button-${elem.setCode}")
            let ${buyFoil} = document.getElementById("foil-buying-dropdown-${elem.setCode}")
            ${buyButton}.addEventListener("click", ()=>{
                let purchase = new Object()
                purchase.name = "${elem.name}"
                purchase.setCode = "${elem.setCode}"
                purchase.quantity = ${buyQuantity}.value
                purchase.price = ${buyPrice}.value
                purchase.foil = ${buyFoil}.value
                purchaseData.push(purchase)
                sessionStorage.setItem("purchaseData", JSON.stringify(purchaseData))
                let storedPurchaseData = sessionStorage.getItem("purchaseData")
                console.log(storedPurchaseData)
        })`)
        cartScripts.appendChild(sellScriptsContent)
        cartScripts.appendChild(buyScriptsContent)
        cartElements.appendChild(cartScripts)
}

function print404(){
    // this will display a 404 error message if the search fails for whatever reason
    let allPrintings = document.getElementById("all-printings")
    let error404 = document.getElementById("error-404")
    allPrintings.style.display = "none"
    error404.style.display = "block"
}