const cocktailsURL = "http://localhost:3000/cocktails"
const cocktailDiv = document.getElementById("cocktail-id")
const cocktailName = document.getElementById("cocktail-name")
const ingredientUl = document.getElementById("ingredient-list")
const cocktailImage = document.getElementById("cocktail-image")
const cocktailInstrcts = document.getElementById("instructions")


function fetchCocktails(){
    fetch(cocktailsURL)
    .then(response => response.json())
    .then(cocktails => 
        cocktails.data.forEach(cocktail =>{
            
            cocktailImage.src = cocktail.attributes.image
            cocktailName.innerText = cocktail.attributes.name
        
            ingredientList(cocktail)
            cocktailInstrcts.innerText = cocktail.attributes.instructions
 
        })
     )}

     function ingredientList(cocktail){
        let ingredients = cocktail.attributes.ingredients
      
        return ingredients.map(ingr => {

            let li = document.createElement('li')
            // let ingredient = ingr.name
             li.innerText = ingr.name
             ingredientUl.appendChild(li)
            
            })

            // for (i = 0; i < ingredients.length; i++){
            //     let li = document.createElement('li')
            //     let ing = ingredients[i].name
            //     li.innerText = ing
            //    ingredientUl.appendChild(li)
            // }
            
     }
fetchCocktails()
