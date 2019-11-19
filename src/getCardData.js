// for live
let cardName = sessionStorage["submission"]
// for testing in the command line - (npm i node-fetch)
// const fetch = require("node-fetch")
// let cardName = ""
let cardData = []

async function getCardData(){
    //fetches the card data and constructs the cardData array of card data objects for each printing
    let response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=!%22${cardName}%22`)
    let json = await response.json()
    let allPrintingsObj = json.data
    allPrintingsObj.forEach(createCardDataObjectforEachSet)
    // console.log(cardData)
}

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

export {getCardData, cardData}
