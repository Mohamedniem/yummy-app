
//loading screen

$(window).ready(function(){
  $("#loading").fadeOut(1000)
})



//sidebar section
$(".xmark").hide()
let sbw=$(".yummyside").innerWidth()
$(".sidebar").animate({left:-sbw},0)
$(".bars").click(function() {
    let sbv=$(".sidebar").css("left")
    if(sbv == "0px"){
        $(".sidebar").animate({left:-sbw},1000)
        $(".xbars").show()
        $(".xmark").hide()
        $(".links ul li ").animate({top:300},500)
    }else{
        $(".sidebar").animate({left:0},1000)
        $(".xbars").hide()
        $(".xmark").show()
        $(".links ul li ").eq(0).animate({top:0},1000)    
        $(".links ul li ").eq(1).animate({top:0},1100)    
        $(".links ul li ").eq(2).animate({top:0},1200)    
        $(".links ul li ").eq(3).animate({top:0},1300)    
        $(".links ul li ").eq(4).animate({top:0},1400)    
    }
})




//main section
let main=document.getElementById("main")


async function displayMain(term){
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let result=await data.json()
    console.log(result.meals);
    displayMainData(result.meals)
     
}
displayMain("")

function displayMainData(arrData) {
    let box=``
    for(let i=0;i<arrData.length;i++){
        box+= `<div class="col-md-3 mt-5 " >
        <div class="image bg-danger d-flex justify-content-center align-items-center rounded position-relative ">
          <img class="main-image w-100 rounded" src="${arrData[i].strMealThumb}" alt="" >
          <div class="layer rounded position-absolute d-flex align-items-center">
            <h2 class="mx-2">${arrData[i].strMeal}</h2>
          </div>
        </div>
      </div>`}
      main.innerHTML=box 
}




//######################################################################
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//common function

function common() {
    main.classList.add("d-none")
    $(".sidebar").animate({left:-sbw},1000)
    $(".xbars").show()
    $(".xmark").hide()
    
}

//######################################################################
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//search section
let formSearch=document.getElementById("formSearch")
document.querySelector(".searchBut").addEventListener("click",function(){

    formSearch.classList.remove("d-none")
    ContacUs.classList.add("d-none")
    Ingredients.classList.add("d-none")
    Area.classList.add("d-none")
    cateogries.classList.add("d-none")
    $(".sidebar").animate({left:-sbw},1000)
    $(".xbars").show()
    $(".xmark").hide()
    main.classList.add("d-none")
    
})



//cateogries section

let cateogries=document.getElementById("cateogries")
document.querySelector(".CateogBut").addEventListener("click",async function(){
 
    let response1=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data=await response1.json()
    // arrcat=data.categories
    console.log(data.categories);
    cateogries.classList.remove("d-none")
    ContacUs.classList.add("d-none")
    formSearch.classList.add("d-none")
    common()
    displayCatog(data.categories)
})
function displayCatog(arrcat){
    let box1=''
    for (let i = 0; i < arrcat.length; i++) {
        box1+=`<div onclick='displayCatogMeals("${arrcat[i].strCategory}")' class="col-md-3 my-5  ">
        <div class="image d-flex justify-content-center align-items-center rounded position-relative ">
          <img class="main-image w-100 rounded" src="${arrcat[i].strCategoryThumb}" alt="">
          <div class="layer rounded position-absolute  text-center">
            <h4>${arrcat[i].strCategory}</h4>
            <p>${arrcat[i].strCategoryDescription}</p>
          </div>
        </div> 
      </div>`
    }

    cateogries.innerHTML=box1
}

async function displayCatogMeals(e) {
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`)
  let data=await response.json()
  let arrcateog=data.meals
  displayCatogMealsNew(arrcateog)
  }


function displayCatogMealsNew(arrcat1) {

  let box4=``
  for (let i = 0; i < arrcat1.length; i++) {
    box4+=`<div class="col-md-3 mt-5 ">
    <div class="image bg-danger d-flex justify-content-center align-items-center rounded position-relative ">
      <img class="main-image w-100 rounded" src="${arrcat1[i].strMealThumb}" alt="">
      <div class="layer rounded position-absolute d-flex align-items-center">
        <h2 class="mx-2">${arrcat1[i].strMeal}</h2>
      </div>
    </div>
  </div>`
    
  }
  cateogries.innerHTML=box4
  
}

//######################################################################
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//Area section
let Area=document.getElementById("Area")

document.querySelector(".AreaBut").addEventListener("click",async function(){
    let response2=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let data2=await response2.json()
    Area.classList.remove("d-none")
    cateogries.classList.add("d-none")
    ContacUs.classList.add("d-none")
    formSearch.classList.add("d-none")
    common()
    console.log(data2.meals);
    displayArea(data2.meals)
})

function displayArea(arrArea) {
    let box2=""
    for(let i=0;i<arrArea.length;i++){
        box2+=`<div onclick='displayAreaMeals("${arrArea[i].strArea}")' class="col-md-3 mt-5 text-center cursor" >
        <div class=" d-flex justify-content-center align-items-center ">
          <i class="fa-solid fa-house-laptop icon text-white"></i> 
        </div>
        <h3 class="text-white">${arrArea[i].strArea}</h3>
      </div>`}
      Area.innerHTML=box2
}



async function displayAreaMeals(cateog) {
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cateog}`)
  let data9=await response.json()
  console.log(data9.meals)
  displayAreaMealsAll(data9.meals)

}
// displayAreaMeals("Chinese")

function displayAreaMealsAll(arrArea2) {
  let box6=""
  for(let i=0;i<arrArea2.length;i++){
    box6+=`<div class="col-md-3 mt-5 ">
    <div class="image bg-danger d-flex justify-content-center align-items-center rounded position-relative ">
      <img class="main-image w-100 rounded" src="${arrArea2[i].strMealThumb}" alt="">
      <div class="layer rounded position-absolute d-flex align-items-center">
        <h2 class="mx-2">${arrArea2[i].strMeal}</h2>
      </div>
    </div>
  </div>`}
  Area.innerHTML=box6

  
}



//Ingredients section


let Ingredients=document.getElementById("Ingredients")


document.querySelector(".IngredBut").addEventListener("click",async function(){
    let response3=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let data3=await response3.json()
    Ingredients.classList.remove("d-none")
    Area.classList.add("d-none")
    cateogries.classList.add("d-none")
    formSearch.classList.add("d-none")
    common()
    displayIngredients(data3.meals.slice(0,20))
})

function displayIngredients(arrIngredients) {
  let box3=""
    for(let i=0;i<arrIngredients.length;i++){
      box3+=`<div onclick='Ingredientsfilter("${arrIngredients[i].strIngredient}")' class="col-md-3 mt-5 text-center cursor overflow-hidden" >
      <div class=" d-flex justify-content-center align-items-center text-white">
        <i class="fa-solid fa-drumstick-bite icon text-white"></i>
      </div>
      <h3 class="text-white">${arrIngredients[i].strIngredient}</h3>
      <p class="text-white fs-6 text-wrap px-3">${arrIngredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>`
    }
    Ingredients.innerHTML=box3
}

async function Ingredientsfilter(params) {
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${params}`)
  let data7=await response.json()
  console.log(data7.meals);
  displayIngredientsfilter(data7.meals)
  
}
// Ingredientsfilter('chicken_breast')

function displayIngredientsfilter(paramsss) {
  let box7=''
  for(let i=0;i<paramsss.length;i++){
  box7+=`<div class="col-md-3 mt-5 ">
  <div class="image bg-danger d-flex justify-content-center align-items-center rounded position-relative ">
    <img class="main-image w-100 rounded" src="${paramsss[i].strMealThumb}" alt="">
    <div class="layer rounded position-absolute d-flex align-items-center">
      <h2 class="mx-2">${paramsss[i].strMeal}</h2>
    </div>
  </div>
</div>
  `
  }
  Ingredients.innerHTML=box7
}





// search section

let ContacUs=document.getElementById("ContacUs")
document.querySelector(".ContactBut").addEventListener("click",function(){
    ContacUs.classList.remove("d-none")
    Ingredients.classList.add("d-none")
    Area.classList.add("d-none")
    cateogries.classList.add("d-none")
    formSearch.classList.add("d-none")
    common()
})





let SearchbyName=document.getElementById("SearchbyName")
let Searchbyfirstletter=document.getElementById("Searchbyfirstletter")


SearchbyName.addEventListener("keyup",async function() {

  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`)
  let searchdata=await response.json()
  main.classList.remove("d-none")
  console.log(searchdata.meals);
  displayMainData(searchdata.meals)

  
})



Searchbyfirstletter.addEventListener("keyup", async function(){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`)
  let searchletter=await response.json()
  main.classList.remove("d-none")
  console.log(searchletter.meals);
  displayMainData(searchletter.meals)
})



// form section

let EnterName=document.getElementById("EnterName")
let EnterEmail=document.getElementById("EnterEmail")
let EnterPhone=document.getElementById("EnterPhone")
let EnterAge=document.getElementById("EnterAge")
let EnterPassword=document.getElementById("EnterPassword")
let RePassword=document.getElementById("RePassword")
let submit=document.getElementById("submit")






let nameRegex = /^[a-zA-Z\-]+$/

let emailregex  = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

let phoneregex = /^01[0125][0-9]{8}$/


let ageregex = /^[1-9][0-9]?$|^100$/


let passwordregex =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
console.log(passwordregex.test("1a234aAS35"));


function validation() {
  
  if(nameRegex.test(EnterName.value)==true && emailregex.test(EnterEmail.value)==true && phoneregex.test(EnterPhone.value) && ageregex.test(EnterAge.value)==true && passwordregex.test(EnterPassword.value)==true && EnterPassword.value==RePassword.value ){
    console.log("good");
    submit.removeAttribute("disabled")
      } else {
        submit.setAttribute("disabled", true)
      }
    

}

  


