const cocktailsURL = "http://localhost:3000/cocktails"
const cocktailDiv = document.getElementById("cocktail-container")

function fetchCocktails(){
    fetch(cocktailsURL)
    .then(response => response.json())
    .then(cocktails => 
        cocktails.data.forEach(cocktail =>{
            
            // const ingredient = cocktail.attributes.ingredients.forEach(ing =>{
            //     console.log(ing.name)
            // })
            // console.log(ingredient)
            const cocktailMarkup = `
            <div data-id={cocktail.id}>
            <img src=${cocktail.attributes.image} width="250" height="250">
            <h3 id="cocktail-name">${cocktail.attributes.name}</h3>
            <ul id="ingredient-list">
               ${ingredientList(cocktail)}
            </ul>
            <p id="instructions">Instructions:<br> ${cocktail.attributes.instructions}</p>
            </div>
            `
            cocktailDiv.innerHTML += cocktailMarkup
        })
     )}

     function ingredientList(cocktail){
        let ingredients = cocktail.attributes.ingredients
       
        return ingredients.map(ingr => {

            return ingr.name
            })

     }
fetchCocktails()
