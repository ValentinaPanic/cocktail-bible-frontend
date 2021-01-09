class Cocktail{

    static allCocktails = []

    constructor(cocktail){
     
        this.id = cocktail.id
        this.name = cocktail.attributes.name
        this.image = cocktail.attributes.image
        this.instructions = cocktail.attributes.instructions
        this.ingredients = cocktail.attributes.ingredients
     
        Cocktail.allCocktails.push(this)
        this.renderCocktail()
    }

        static renderCocktails(cocktails){
            cocktailList.innerHTML = ""
          for (let cocktail of cocktails){
            cocktail.renderCocktail()

        }
    }
         static fetchCocktails(){
             fetch(cocktailsURL)
            .then(response => response.json())
            .then(cocktails => {
                   for(let cocktail of cocktails.data){
                let newCocktailList = new Cocktail(cocktail)
                   }

        })
     
    }
        renderCocktail(){
     
        // const cocktailList = document.getElementById("cocktail-list")
        const cocktailLi = document.createElement('li')
        
        cocktailLi.dataset.id = this.id
        cocktailList.appendChild(cocktailLi)
            const h3 = document.createElement('h3')
        h3.className=("card-header")
        h3.innerText = this.name
        const img = document.createElement('img')
        img.src = this.image
        img.width = 200
        const p = document.createElement('p')
        p.className = "card-text"
        p.innerText = this.instructions

        //delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-primary btn-sm"
        deleteBtn.innerText = "Delete Cocktail"
        deleteBtn.addEventListener("click", this.deleteCocktail)

        //ingredient form
        const ingredientForm = document.createElement('form')
        ingredientForm.innerHTML += `<input type="text"  class="form-control" id="ingredient-input" placeholder ="Ingredient">
        <input type="submit" class="btn btn-primary btn-sm" value="Add">`

    
        ingredientForm.addEventListener("submit", Ingredient.createIngredient)

        const ingredientList = document.createElement("ul")
        ingredientList.className = "list-group list-group-flush"
          ingredientList.dataset.id = this.id
        //rendering ingredients per cocktail
        console.log(this.ingredients)
        this.ingredients.forEach(ingredient =>{
          
            let newIngr = new Ingredient(ingredient)
          
            newIngr.renderIngredient(ingredientList)
        })
    
    cocktailLi.append( h3, img, ingredientList, ingredientForm, p, deleteBtn)

}

static submitCocktail(e){
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
    .then(cocktail => {
        let newCocktail = new Cocktail(cocktail.data)
      
        cocktailForm.reset()
    })
    
}

        deleteCocktail(){

            const cocktailId = this.parentElement.dataset.id
        
             fetch(`${cocktailsURL}/${cocktailId}`,{
                 method: "DELETE"
             })
             .catch(err => alert(err))
             this.parentElement.remove()
         }


     
}

