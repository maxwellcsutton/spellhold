function openCardTab(event, code) {
    let i
    let tabContent = document.getElementsByClassName("tab-results");
    let tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(code).style.display = "block";
    event.currentTarget.className += " active";
  }
