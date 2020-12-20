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
    .then(response => response.json())
    .then(cocktailObj => renderCocktail(cocktailObj))
  
}
fetchCocktails()
function fetchCocktails(){
    fetch(cocktailsURL)
    .then(response => response.json())
    .then(cocktails =>  cocktails.data.forEach(cocktail => renderCocktail(cocktail))
)}

 function renderCocktail(cocktailObj){
      console.log(cocktailObj.id)
       
        const cocktailList = document.getElementById("cocktail-list")
         const cocktailLi = document.createElement('li')
        cocktailLi.dataset.id = cocktailObj.id
        cocktailList.appendChild(cocktailLi)
        //cocktail html 
        const h3 = document.createElement('h3')
        h3.innerText = cocktailObj.attributes.name
        const img = document.createElement('img')
        img.src = cocktailObj.attributes.image
        img.width = 200
        const p = document.createElement('p')
        p.innerText = cocktailObj.attributes.instructions

        //delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete Cocktail"
        deleteBtn.addEventListener("click", deleteCocktail)
        //ingredient form
        const ingredientForm = document.createElement('form')
        ingredientForm.innerHTML += `<input type="text" id="ingredient-input" placeholder ="Ingredient">
        <input type="submit" value="Add">`

    
        ingredientForm.addEventListener("submit", renderIngredient)

        const ingredientList = document.createElement("ul")
        //rendering ingredients per cocktail
        cocktailObj.attributes.ingredients.forEach(ingredient =>{
        const ingredientLi = document.createElement('li')
        ingredientLi.innerText = ingredient.name

        ingredientList.appendChild(ingredientLi)
        
    })
    
    cocktailLi.append( h3, img, ingredientList, ingredientForm, p, deleteBtn)
    cocktailForm.reset()
 
 }

 function deleteCocktail(e){
    //  console.log(e.target.parentElement)
    const cocktailId = e.target.parentElement.dataset.id

     fetch(`${cocktailsURL}/${cocktailId}`,{
         method: "DELETE"
     })

     e.target.parentElement.remove()
 }

    function renderIngredient(e){
        // console.log(e.target.nextElementSibling)
        e.preventDefault()
        
        let li = document.createElement('li')
        let ingredientList = e.target.nextElementSibling
        let ingredientName = e.target.children[0].value
        li.innerText = ingredientName
        const cocktailId = e.target.parentElement.dataset.id
        console.log(cocktailId)
        ingredientList.appendChild(li)
        e.target.reset()
        submitIngredient(ingredientName, cocktailId)
}

 function submitIngredient(ingredientName, cocktailId){

    fetch(ingredientsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
           name: ingredientName,
           cocktail_id: cocktailId
        })
    })
    .catch(error => alert(error))
    //    console.log(cocktailId) 
    }
 

  
