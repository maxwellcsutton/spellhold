// for live

let rawCardName = localStorage["submission"]
// for testing in the command line - (npm i node-fetch)
// const fetch = require("node-fetch")
// let rawCardName = "Jace, Vryn's Prodigy // Jace, Telepath Unbound"
let cardName = rawCardName.split(" ").join("+")
let specialCharacterCheck = cardName.includes(",")
if (specialCharacterCheck){
    cardName = cardName.split(",").join("")
}
let cardData = []

function createCardDataObjectforEachSet(index){
    let price = index.prices.usd
    let foilPrice = index.prices.usd_foil
    let buyPrice = Math.ceil(price * 60) / 100
    let foilBuyPrice = Math.ceil(foilPrice * 60) / 100
    let isDoubleSided = index.card_faces
    let isCreature = index.power
    let isPlaneswalker = index.loyalty
    let obj = new Object()
    obj.name = index.name
    obj.setCode = index.set
    obj.setName = index.set_name
    obj.rarity = index.rarity
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
    if (!isDoubleSided){
        obj.color = index.colors
        obj.cost = index.mana_cost
        obj.type = index.type_line
        obj.text = index.oracle_text
        obj.image = index.image_uris.normal
        if (isCreature){
            obj.power = index.power
            obj.toughness = index.toughness
        }
        if (isPlaneswalker){
            obj.loyalty = isPlaneswalker
        }
    } else if (isDoubleSided){
        let faces = []
        obj.cardFaces = faces
        isDoubleSided.forEach((side)=>{
            let isDoubleSidedCreature = side.power
            let isDoubleSidedPlaneswalker = side.loyalty
            let doubleSided = new Object()
            doubleSided.name = side.name
            doubleSided.color = side.colors
            doubleSided.cost = side.mana_cost
            doubleSided.type = side.type_line
            doubleSided.text = side.oracle_text
            doubleSided.image = side.image_uris.normal
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
    if (price || foilPrice){
        // this finds multiple printings from the same set (since magic used to print the same card with different arts in the same set) and increments them
        cardData.forEach((set)=>{
            let findDuplicates = Object.values(set).includes(obj.setCode)
            if (findDuplicates){
                obj.setCode = index.set +=1
            }
        })
        cardData.push(obj)
    }
    return 
}

async function getCardData(){
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
    if (!isDoubleSided){
        let staticCardDataHTML =
            `<b>Color: </b>${cardData[0].color}<br>
            <b>Mana Cost: </b>${cardData[0].cost}<br>
            <b>Type: </b>${cardData[0].type}<br>
            <b>Rules Text: </b>${cardData[0].text}<br>`
         if (!cardData[0].cardFaces){
            if (!isCreature && !isPlaneswalker){
                staticChild1.innerHTML = staticCardDataHTML
            } else if (isCreature){
                staticChild1.innerHTML = staticCardDataHTML + 
                    `<b>Power: </b>${cardData[0].power}<br>
                    <b>Toughness: </b>${cardData[0].toughness}<br>`
            } else if (isPlaneswalker){
                staticChild1.innerHTML = staticCardDataHTML + 
                    `<b>Loyalty: </b>${cardData[0].loyalty}<br>`
            }
        }
    } else if (isDoubleSided) {
        let staticParent2 = document.createElement("p")
        let staticChild2 = staticCardInfo.appendChild(staticParent2)
        let eachFaceHTML = []
        let eachFace = cardData[0].cardFaces
        eachFace.forEach((face)=>{
            let staticCardDataHTML = 
            `<b>Name: </b>${face.name}<br>
            <b>Color: </b>${face.color}<br>
            <b>Mana Cost: </b>${face.cost}<br>
            <b>Type: </b>${face.type}<br>
            <b>Rules Text: </b>${face.text}<br>`
            let isCreature = face.power
            let isPlaneswalker = face.loyalty
            if (!isCreature && !isPlaneswalker){
                eachFaceHTML.push(staticCardDataHTML)
            } else if (isCreature){
                staticCardDataHTML = staticCardDataHTML + 
                    `<b>Power: </b>${face.power}<br>
                    <b>Toughness: </b>${face.toughness}<br>`
                eachFaceHTML.push(staticCardDataHTML)
            } else if (isPlaneswalker) {
                staticCardDataHTML = staticCardDataHTML +
                    `<b>Loyalty: </b>${face.loyalty}<br>`
                eachFaceHTML.push(staticCardDataHTML)
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
        dynamicTabButtons.innerHTML =
            `<button class="tablinks" onclick="openCardTab(event, ${elem.setCode})">${elem.setCode.toUpperCase()}</button>
            <div id=${elem.setCode} class="tabcontent" align="left"><h3 align="center">${elem.setCode.toUpperCase()}</h3></div>`
        let dynamicCardInfo = document.getElementById(`${elem.setCode}`);
        let dynamicImageParent1 = document.createElement("p")
        let dynamicImage1 = dynamicCardInfo.appendChild(dynamicImageParent1)
        if (!isDoubleSided){
            dynamicImage1.innerHTML = `<img id="card-image" src=${elem.image} alt=${elem.setCode} width="50%" height="50%">`
        } else if (isDoubleSided){
            let dynamicImageParent2 = document.createElement("p")
            let dynamicImage2 = dynamicCardInfo.appendChild(dynamicImageParent2)
            dynamicImage1.innerHTML = `<img id="card-image" src=${elem.cardFaces[0].image} alt=${elem.setCode} style="float: left" width="50%" height="50%">`
            dynamicImage2.innerHTML = `<img id="card-image" src=${elem.cardFaces[1].image} alt=${elem.setCode} style="float: left" width="50%" height="50%">`
        }
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
