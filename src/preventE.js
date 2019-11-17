// prevent people from typing e, +, or - into my quanitity field
    let quantityField = document.getElementById(`quantity-${elem.setCode}`)
    let invalidChars = ["e", "+", "-"]
    quantityField.addEventListener("input", ()=>{
        console.log(this.value)
        this.value = this.value.replace(/[e\+\-]/gi, "");
        });
    quantityField.addEventListener("keydown", (e)=>{
     if (invalidChars.includes(e.key)) {
         e.preventDefault();
         }
    })