function openCardTab(event, code) {
    let i
    let tabContent = document.getElementsByClassName("tab-results")
    let tabLinks = document.getElementsByClassName("tab-links")
    let shown = false
    if (document.getElementById(code).style.display == "block"){
      shown = true
    }
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none"
    }
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "")
    }
    if (!shown){
      document.getElementById(code).style.display = "block"
      event.currentTarget.className += " active"
    } else if (shown){
      document.getElementById(code).style.display = "none"
      event.currentTarget.className.replace(" active", "")
    }
  }
