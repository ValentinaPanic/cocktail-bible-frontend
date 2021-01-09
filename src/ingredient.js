class Ingredient{

    constructor(ingredient){
       console.log(ingredient)
        this.id = ingredient.id
        this.name = ingredient.name
        this.cocktail_id = ingredient.cocktail_id
        // this.cocktail = ingredient.cocktail

    }

    static createIngredient(e){
        
          e.preventDefault()
        const li = document.createElement('li')
        const ingredientName = e.target.children[0].value
        const ingredientList = e.target.previousElementSibling
        const cocktailId = e.target.parentElement.dataset.id
       
        Ingredient.submitIngredient(ingredientName, ingredientList, cocktailId)
        e.target.reset()
        
    }
    
    renderIngredient(ingredientList){
      
    
        const li = document.createElement('li')
        li.className = "list-group-item"
        li.dataset.id = this.id
        li.innerText = this.name
        const cocktailId = this.cocktail_id

        const lnbr = document.createElement('br')
        const deleteBtn = document.createElement('button')
        deleteBtn.className = "badge badge-pill badge-primary"
        deleteBtn.innerText = "Remove"
        
        li.append(lnbr, deleteBtn)

        deleteBtn.addEventListener("click", this.deleteIngredient)
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
           cocktail_id: cocktailId,
           ingredientList: ingredientList
        })
    })
    .then(response => response.json())
    .then(ingredient => {
       
        let newIngredient = new Ingredient(ingredient)
           
        const cocktail = Cocktail.allCocktails.find(c => parseInt(c.id) === newIngredient.cocktail_id)
        cocktail.ingredients.push(newIngredient)
        
        newIngredient.renderIngredient(ingredientList)
    
    })
    .catch(err => alert(err))
   
    }
    
    deleteIngredient(){
        
        const ingrId = this.parentElement.dataset.id
             fetch(`${ingredientsURL}/${ingrId}`,{
             method: "DELETE"
         })
         
         this.parentElement.remove()
     }
}