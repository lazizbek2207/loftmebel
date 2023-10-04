const row = document.querySelector("#row")
const searchInput = document.querySelector("#search")
const favouriteContent = document.querySelector('#favourite-content')


favouriteContent.addEventListener("click",function(){
     location.href = "./favourite.html"
})


let allData  =[];


let favourite = false;

function getProducts() {

    fetch("https://6427fbdc46fd35eb7c492488.mockapi.io/student", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            allData= [...data];
            innerProduct(data);
          let  allFavouite = data.filter(element=>element.active);
           localStorage.setItem("allFavouite",JSON.stringify(allFavouite))

        })
        .catch(error => console.log(error))
}

getProducts();

let html = "";
function innerProduct(data) {

    checkFavourite(data)
    data.forEach(element => {
        html += `
     <div class="card">
     <div class="card-header" onclick="setId(${element.id})">
         <img src="${element.url}" alt="">
     </div>
     <div class="card-active" onclick="getId(${element.id})" >
     ${
        element.active?'<i class="bi bi-heart-fill"></i>':'<i class="bi bi-heart"></i>'
     }
     
     
       </div>
     <div class="card-body">
         <h3 class="card-title">${element.title ? element.title : "..."}</h3>
             <p class="card-name">${element.name}</p>
             <h3 class="card-price">${element.price}₽</h3>
             <h5 class="card-size">Размеры</h5>
             <div class="card-details">
                 <div class="card-details-item">
                     <div class="card-details-name">ШИРИНА</div>
                     <div class="card-details-size">${element.width} СМ</div>
                     
                 </div>
                 &times;
                 <div class="card-details-item">
                     <div class="card-details-name">ГЛУБИНА</div>
                     <div class="card-details-size">${element.depth} СМ</div>
                     
                 </div>
                 &times;
                 <div class="card-details-item">
                     <div class="card-details-name">ВЫСОТА</div>
                     <div class="card-details-size">${element.heigth ? element.heigth : 0} СМ</div>
                     
                 </div>
             </div>
          
             <button class="card-btn">Добавить в корзину</button>
     </div>
 </div>
     `

    });

    row.innerHTML = html;
    html = "";

}


function getId(id) {
    fetch(`https://6427fbdc46fd35eb7c492488.mockapi.io/student/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => updateProduct(data))
        .catch(error => console.log(error))
}

function updateProduct(data) {
    let d = { ...data };
    d.active = !data.active;

    if(d.active){
        messageBoxDisplayed(true, add)
    }
    else{
        messageBoxDisplayed(true, remove)
    }
   

    fetch(`https://6427fbdc46fd35eb7c492488.mockapi.io/student/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(d),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => getProducts())
        .catch(error => console.log(error))
}

function setId(id){
   localStorage.setItem("productId",id)
   location.href = "product.html"
}



function checkFavourite(data){
    favouriteContent.innerHTML="";
    favourite=false;
    data.map(item=>{
        if(item.active){
            favourite = true;
        }
    })
    favouriteContent.innerHTML= `${favourite?`<i class="bi bi-heart-fill"></i>`:`<i class="bi bi-heart"></i>`}`
}

searchInput.addEventListener("keyup",getSearchInputValue)

function getSearchInputValue(){
   let filterdData =  allData.filter(element=>element.title.toLowerCase().includes(searchInput.value.toLowerCase()));
   innerProduct(filterdData)
}
