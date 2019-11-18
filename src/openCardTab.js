function openCardTab(event, code) {
    let i
    let tabContent = document.getElementsByClassName("tab-results")
    let tabLinks = document.getElementsByClassName("tab-links")
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none"
    }
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "")
    }
    let display = document.getElementById(code).style.display
    console.log(display)
    if (display == "none"){
      document.getElementById(code).style.display = "block"
      //for whatever reasonj this doesn't work because even though it sets to to block and shows it here
      //it somehow still returns none?  leaving this code here until i can figure out why it works because it doesn't break anything
    } else if (display == "block"){
      document.getElementById(code).style.display = "none"
    }
    event.currentTarget.className += " active"
  }
