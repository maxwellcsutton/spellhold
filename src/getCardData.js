// for live

let rawCardName = localStorage["submission"]
// for testing in the command line
// const fetch = require("node-fetch")
// let rawCardName = "force of will"
let cardName = rawCardName.split(" ").join("+")
let cardData = []

function createCardDataObjectforEachSet(index){
    let price = index.prices.usd
    let foilPrice = index.prices.usd_foil
    let buyPrice = Math.ceil(price * 60) / 100
    let foilBuyPrice = Math.ceil(foilPrice * 60) / 100
    let obj = new Object()
    obj.name = index.name
    obj.setCode = index.set
    obj.setName = index.set_name
    obj.rarity = index.rarity
    obj.color = index.colors
    obj.cost = index.mana_cost
    obj.type = index.type_line
    obj.text = index.oracle_text
    if (price){
    obj.price = "$"+index.prices.usd
    obj.projectedBuyPrice = "$"+buyPrice
    } else if (!price){
        obj.price = "Printings in this set are only available in foil."
        obj.projectedBuyPrice = "Printings in this set are only available in foil."
    }
    if (foilPrice){
    obj.foilPrice = "$"+index.prices.usd_foil
    obj.projectedFoilBuyPrice = "$"+foilBuyPrice
    } else if (!foilPrice){
        obj.foilPrice = "Printings in this set are only available in non-foil."
        obj.projectedFoilBuyPrice = "Printings in this set are only available in non-foil."
    }
    obj.link = index.purchase_uris.tcgplayer
    obj.image = index.image_uris.small
    if (price || foilPrice){
        cardData.push(obj)
    }
    return 
}

async function getCardData(){
    let response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=!%22${cardName}%22`)
    let json = await response.json()
    let allPrintingsObj = json.data
    allPrintingsObj.forEach(createCardDataObjectforEachSet)
    //console.log(cardData)
}

//getCardData()

async function printCardData(){
    await getCardData()
    let staticCardInfo = document.getElementById('static-card-info');
    let staticParent = document.createElement("p")
    let staticChild = staticCardInfo.appendChild(staticParent)
    staticChild.innerHTML = 
        `<b>Color: </b>${cardData[0].color}<br>
        <b>Mana Cost: </b>${cardData[0].cost}<br>
        <b>Type: </b>${cardData[0].type}<br>
        <b>Rules Text: </b>${cardData[0].text}<br>`
    let dynamicCardInfo = document.getElementById('dynamic-card-info');
    cardData.forEach((elem)=>{
        let dynamicImageParent = document.createElement("p")
        let dynamicImage = dynamicCardInfo.appendChild(dynamicImageParent)
        dynamicImage.innerHTML = `<img id="card-image" src=${elem.image} alt=${elem.setCode}>`
        let dynamicParent = document.createElement("p")
        let dynamicInfoChild = dynamicCardInfo.appendChild(dynamicParent)
        dynamicInfoChild.innerHTML = 
            `<b>Set Name: </b>${elem.setName}<br>
            <b>Set Code: </b>${elem.setCode.toUpperCase()}<br>
            <b>Rarity: </b>${elem.rarity.charAt(0).toUpperCase() + elem.rarity.slice(1)}<br>
            <b>Price: </b>${elem.price}<br>
            <b>Projected Buy Price: </b>${elem.projectedBuyPrice}<br>
            <b>Foil Price: </b>${elem.foilPrice}<br>
            <b>Projected Foil Buy Price: </b>${elem.projectedFoilBuyPrice}<br>
            <a href=${elem.link} target="_blank">Check TCGPlayer.com</a>`
      })
}

printCardData()

