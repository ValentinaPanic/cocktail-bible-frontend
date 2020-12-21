const cocktailsURL = "http://localhost:3000/cocktails"
const ingredientsURL = "http://localhost:3000/ingredients"
const cocktailForm = document.getElementById("cocktail-form")
const imageInput = document.getElementById("input-image-url")
const cocktailNameInput = document.getElementById("input-cocktail-name")
const instructionsInput = document.getElementById("input-instructions")



cocktailForm.addEventListener("submit",  Cocktail.submitCocktail)
Cocktail.fetchCocktails()


 
//     function renderIngredient(e){
//         // console.log(e.target.nextElementSibling)
//         e.preventDefault()
        
//         let li = document.createElement('li')
//         let ingredientList = e.target.nextElementSibling
//         let ingredientName = e.target.children[0].value
//         li.innerText = ingredientName
//         const cocktailId = e.target.parentElement.dataset.id
        
//         ingredientList.appendChild(li)
//         e.target.reset()
//         submitIngredient(ingredientName, cocktailId)
// }

//  function submitIngredient(ingredientName, cocktailId){

//     fetch(ingredientsURL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },
//         body: JSON.stringify({
//            name: ingredientName,
//            cocktail_id: cocktailId
//         })
//     })
//     .catch(error => alert(error))
//     //    console.log(cocktailId) 
    // }
 

  
