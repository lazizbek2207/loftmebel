const favouriteRow  =document.querySelector("#favourite-row")


const data = JSON.parse(localStorage.getItem("allFavouite"))

if(data.length>0){

}
else{
    favouriteRow.innerHTML = `<img src="./img/notdata.avif" alt="">`
}