// for live
let cardName = sessionStorage["submission"]
// for testing in the command line - (npm i node-fetch)
// const fetch = require("node-fetch")
// let cardName = ""
let cardData = []
let saleData = [JSON.parse(sessionStorage.getItem("saleData"))]
let purchaseData = [JSON.parse(sessionStorage.getItem("purchaseData"))]


function createCardDataObjectforEachSet(index){
    let price = index.prices.usd
    let foilPrice = index.prices.usd_foil
    let buyPrice = Math.ceil(price * 60) / 100
    let foilBuyPrice = Math.ceil(foilPrice * 60) / 100
    let isDoubleSided = index.card_faces
    let isCreature = index.power
    let isPlaneswalker = index.loyalty
    // creates an object of all relevant card data
    let obj = new Object()
    obj.name = index.name
    obj.setCode = index.set
    obj.setName = index.set_name
    obj.collectorsNumber = index.collector_number
    obj.rarity = index.rarity
    if (price){
    // if the non foil price exists, add it to the object
    obj.price = "$"+index.prices.usd
    obj.projectedBuyPrice = "$"+buyPrice
    } else if (!price){
        // if it doesn't, say so
        obj.price = "N/A"
        obj.projectedBuyPrice = "N/A"
    }
    if (foilPrice){
        //same for foil price
    obj.foilPrice = "$"+index.prices.usd_foil
    obj.projectedFoilBuyPrice = "$"+foilBuyPrice
    } else if (!foilPrice){
        obj.foilPrice = "N/A"
        obj.projectedFoilBuyPrice = "N/A"
    }
    obj.link = index.purchase_uris.tcgplayer
    if (!isDoubleSided){
        // double sided cards exist, this checks if it is double sided, and if it isn't, parses the json normally
        obj.color = index.colors
        obj.cost = index.mana_cost
        obj.type = index.type_line
        obj.text = index.oracle_text
        obj.image = index.image_uris.normal
        //creatures and planeswalkers have additional information on the card that other card types don't have.  This checks if it exists
        //then if it does, adds it to the object
        if (isCreature){
            obj.power = index.power
            obj.toughness = index.toughness
        }
        if (isPlaneswalker){
            obj.loyalty = isPlaneswalker
        }
    } else if (isDoubleSided){
        //if the card IS double sided, instead get the information for both the front and back of the card
        let faces = []
        obj.cardFaces = faces
        isDoubleSided.forEach((side)=>{
            let isDoubleSidedCreature = side.power
            let isDoubleSidedPlaneswalker = side.loyalty
            let isntSplit = side.image_uris
            let doubleSided = new Object()
            doubleSided.name = side.name
            doubleSided.color = side.colors
            doubleSided.cost = side.mana_cost
            doubleSided.type = side.type_line
            doubleSided.text = side.oracle_text
            if (isntSplit){
                //split cards and adventures will fall into this block, but their image is in the normal image location
                //so if the card isn't split, get the image of each side
                doubleSided.image = side.image_uris.normal
            } else if (!isntSplit){
                //and if it isn't split, do what would be done for a normal card
                obj.image = index.image_uris.normal
                doubleSided.color = index.colors
            }
            // if you're reading this and are unfamiliar with magic, look up Jace, Vryn's Prodigy to see how this can get hairy
            // and why I have so much handling for double-sided cards
            if (isDoubleSidedCreature){
                doubleSided.power = side.power
                doubleSided.toughness = side.toughness
            }
            if (isDoubleSidedPlaneswalker){
                doubleSided.loyalty = side.loyalty
            }
            faces.push(doubleSided)
        })
    }
    //this excludes all online only printings
    let paperPrintingExists = index.games
    if (paperPrintingExists.includes("paper")){
        // this finds multiple printings from the same set (since magic used to print the same card with different arts in the same set) and increments them
        let increment = 1
        cardData.forEach((set)=>{
            //set is the index of the array, each index of the array contains setCode : (the actual set code)
            let findDuplicates = Object.values(set).includes(obj.setCode)
            //searches the array of card data objects for for a duplicate setCode
            if (findDuplicates){
                //if theres a duplicate, findDuplicates = true so add (1) to the setCode
                obj.setCode = index.set + "(" + increment + ")"
                increment++
            }
        })
        //pushes each individual card object to an array of card objects for later use
        cardData.push(obj)
    }
    return 
}

async function getCardData(){
    //fetches the card data and constructs the cardData array of card data objects for each printing
    let response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=!%22${cardName}%22`)
    let json = await response.json()
    let allPrintingsObj = json.data
    allPrintingsObj.forEach(createCardDataObjectforEachSet)
    // console.log(cardData)
}

// getCardData()

async function printCardData(){
    await getCardData()
    //this will display all the info that doesn't change per set at the top, but I might
    //move all the card data together once I add tabs for each set
    let staticCardInfo = document.getElementById('static-card-info');
    let staticParent1 = document.createElement("p")
    let staticChild1 = staticCardInfo.appendChild(staticParent1)
    let isCreature = cardData[0].power
    let isPlaneswalker = cardData[0].loyalty
    let isDoubleSided = cardData[0].cardFaces
    let isSplitOrNormal = cardData[0].image
    if (!isDoubleSided){
        // more logic for handling double sided cards, creatures, and planeswalkers
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
    cardData.forEach((elem)=>{
        //this will display all info that changes per set
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
                    <form id="add-to-fake-cart-${elem.setCode}">
                        <b>Selling to customer: </b><br>
                        <select id="foil-selling-dropdown-${elem.setCode}">
                            <option value="Non-foil">Non-foil</option>
                            <option value="Foil">Foil</option>
                        </select>
                        Price: <input id="price-selling-${elem.setCode}" class="card-price" type="text" value=${elem.price}>
                        Quantity: <input id="quantity-selling-${elem.setCode}" class="card-quantity" type="number" min="1" value="1">
                        <input id="sell-button-${elem.setCode}" type="button" value="Sell"><br><br>
                        <b>Buying from customer: </b><br>
                        <select id="foil-buying-dropdown-${elem.setCode}">
                            <option value="Non-foil">Non-foil</option>
                            <option value="Foil">Foil</option>
                        </select>
                        Price: <input id="price-buying-${elem.setCode}" class="card-price" type="text" value=${elem.projectedBuyPrice}>
                        Quantity: <input id="quantity-buying-${elem.setCode}" class="card-quantity" type="number" min="1" value="1">
                        <input id="buy-button-${elem.setCode}" type="button" value="Buy">
                    </form>
                </div>
            </div>`

        let dynamicTabContent = document.getElementById("tab-content")
        let dynamicTabContentParent = document.createElement("div")
        let dynamicTabContentChild = dynamicTabContent.appendChild(dynamicTabContentParent)
        dynamicTabContentChild.innerHTML = dynamicResultsTemplate
        //this is to stop people from typing or copy/pasting e, -, or + into the number field
        //and also provides the logic for the fake cart system
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
    })
}

printCardData()
