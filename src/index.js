const cocktailsURL = "http://localhost:3000/cocktails"
const ingredientsURL = "http://localhost:3000/ingredients"
const cocktailForm = document.getElementById("cocktail-form")
const imageInput = document.getElementById("input-image-url")
const cocktailNameInput = document.getElementById("input-cocktail-name")
const instructionsInput = document.getElementById("input-instructions")



cocktailForm.addEventListener("submit", (e) => {submitCocktail(e)})


function submitCocktail(e){
    e.preventDefault()
   fetch(cocktailsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
           image: imageInput.value,
           name: cocktailNameInput.value,
           instructions: instructionsInput.value
           
        })
    })
   
     renderCocktail(cocktailNameInput.value,imageInput.value, instructionsInput.value)
}

 function renderCocktail(name, image, instructions){
    //  console.log(name, image, instructions)
    const cocktailList = document.getElementById("cocktail-list")
   
    const cocktailMarkup =`
    
            <h3 id="cocktail-name">${name}</h3><br>
            <img src=${image} id="cocktail-image" width="250" height="250"><br>
        
            <label type="text">Instructions:</label>
            <p id="instructions">${instructions}</p><br>
        `
    
    const ingredientForm = document.createElement('form')
    ingredientForm.innerHTML += `<input type="text" id="ingredient-input" placeholder ="Ingredient">
    <input type="submit" value="Add">`

    
     ingredientForm.addEventListener("submit", (e) => renderIngredient(e))

    const ingrDiv = document.getElementById("ingredient-list")
    const ingredientList = document.createElement("ul")
   
    cocktailList.innerHTML += cocktailMarkup
    cocktailList.append( ingredientForm, ingredientList)
    cocktailForm.reset()
 
 }

function renderIngredient(e){

    e.preventDefault()
    let li = document.createElement('li')
    let ingredientList = e.target.nextElementSibling
    let ingredientName = e.target.children[0].value
    li.innerText = ingredientName

    ingredientList.appendChild(li)
    e.target.reset()
    submitIngredient(ingredientName)
}

 function submitIngredient(ingredientName){

    fetch(ingredientsURL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
           name: ingredientName
           
        })
    })
        
    }
 
fetchCocktails()
function fetchCocktails(){
    fetch(cocktailsURL)
    .then(response => response.json())
    .then(cocktails =>{ 
        cocktails.data.forEach(cocktail =>{
            const cocktailData = cocktail.attributes
            // const ingList = cocktailData.ingredients.forEach(ingr => { ingr.name})
            renderCocktail(cocktailData.name, cocktailData.image, cocktailData.instructions)
           
        })}
     )}

    

    //  function renderIngredient(cocktail){
    //     let ingredients = cocktail.attributes.ingredients
      
    //         return ingredients.map(ingr => {

    //         let li = document.createElement('li')
    //         li.innerText = ingr.name
    //         ingredientUl.appendChild(li)
    //         submitIngredient()
    //         })
    //  }

    

    

