const cocktailsURL = "http://localhost:3000/cocktails"
const ingredientsURL = "http://localhost:3000/ingredients"
const cocktailForm = document.getElementById("cocktail-form")
const imageInput = document.getElementById("input-image-url")
const cocktailNameInput = document.getElementById("input-cocktail-name")
const instructionsInput = document.getElementById("input-instructions")
const cocktailList = document.getElementById("cocktail-list")
const searchBar = document.getElementById("searchBar")
const liquor = document.getElementById("liquor")


liquor.addEventListener("change", function(e){
let arr = Cocktail.allCocktails.filter(cocktail => {
    for( let ing of cocktail.ingredients){
        if(ing.name.toLowerCase().includes(e.target.value)){
            return true
        }}
})

Cocktail.renderCocktails(arr)
})





searchBar.addEventListener("keyup", function(e){
    const searchInput = e.target.value.toLowerCase()
    const searchResult = Cocktail.allCocktails.filter( cocktail => {
    
      if ( cocktail.name.toLowerCase().includes(searchInput)){
        return true
        
      } 
  })

Cocktail.renderCocktails(searchResult)
 })

 cocktailForm.addEventListener("submit",  Cocktail.submitCocktail)

Cocktail.fetchCocktails()