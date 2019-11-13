// for live

let rawCardName = localStorage["submission"]
// for testing
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
    if (price !== null){
    obj.price = index.prices.usd
    obj.projectedBuyPrice = buyPrice
    }
    if (foilPrice){
    obj.foilPrice = index.prices.usd_foil
    obj.projectedFoilBuyPrice = foilBuyPrice
    }
    obj.link = index.purchase_uris.tcgplayer
    obj.image = index.image_uris.small
    if (price !== null || foilPrice){
        cardData.push(obj)
    }
    return 
}

async function getCardData(){
    let response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=!%22${cardName}%22`)
    let json = await response.json()
    let allPrintingsObj = json.data
    allPrintingsObj.forEach(createCardDataObjectforEachSet)
    console.log(cardData)
}

getCardData()
