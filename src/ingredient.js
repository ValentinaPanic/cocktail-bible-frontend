class Ingredient{

    constructor(ingredient){
        // debugger
        this.id = ingredient.id
        this.name = ingredient.name
        this.cocktail_id = ingredient.cocktail_id

    }

    static createIngredient(e){
    
          e.preventDefault()
        const li = document.createElement('li')
        const ingredientName = e.target.children[0].value
        const ingredientList = e.target.nextElementSibling
        const cocktailId = e.target.parentElement.dataset.id
//  debugger
 Ingredient.submitIngredient(ingredientName, ingredientList, cocktailId)
        e.target.reset()
    }
    
    renderIngredient(ingredientList){
        //  debugger
        const li = document.createElement('li')
      
        li.dataset.id = this.cocktail_id
        li.innerText = this.name

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = "X"
        li.appendChild(deleteBtn)
        ingredientList.appendChild(li)
        
}

 static submitIngredient(ingredientName, ingredientList, cocktailId){

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
    .then(response => response.json())
    .then(ingredient => {
        let newIngredient = new Ingredient(ingredient)
        newIngredient.renderIngredient(ingredientList)
    })
    .catch(err => alert(err))
    }
    
}