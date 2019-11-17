// mostly copied from w3 schools tutorial, had to make some edits to make it work how I wanted to
// mainly encoding and handling submit better
// ill save writing my own autocomplete function for the react refactor
let cardNames = []

async function fetchCardNames(){
    let response = await fetch("https://api.scryfall.com/catalog/card-names")
    let json = await response.json()
    cardNames = json.data
    cardNames.forEach((elem, i, cardNames)=>{
      cardNames[i] = encodeURIComponent(elem).replace(/'/g, "%27")
    })
    return cardNames
};

async function autocomplete(inp) {
    await fetchCardNames()
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        val = encodeURIComponent(val).replace(/'/g, "%27")
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < cardNames.length; i++) {
          if (cardNames[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + decodeURIComponent(cardNames[i]).substr(0, val.length) + "</strong>";
            b.innerHTML += decodeURIComponent(cardNames[i]).substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + cardNames[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = decodeURIComponent(this.getElementsByTagName("input")[0].value)
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        console.log(e.keyCode)
        console.log(this.value)
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          // if the enter key is pressed and the card doesnt exist, prevent the form from being submitted
          let cardExists = cardNames.includes(encodeURIComponent(this.value))
          console.log(cardExists)
          if (!cardExists){
            e.preventDefault()
          }
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.getElementById("search-bar"));
  document.addEventListener("submit", function (){
      let submission = document.getElementById("search-bar").value
      localStorage["submission"] = submission
  })



  