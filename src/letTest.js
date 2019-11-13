let test1 = false
function test(){
    test1 = true
    console.log(test1)
}
test()
if (test1){
    console.log(test1)
}else if (!test1){
    console.log("Failed")
}