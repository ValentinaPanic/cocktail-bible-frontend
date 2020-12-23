class Cocktail{

    static allCocktails = []

    constructor(cocktail){
    //    debugger
        this.id = cocktail.id
        this.name = cocktail.attributes.name
        this.image = cocktail.attributes.image
        this.instructions = cocktail.attributes.instructions
        this.ingredients = cocktail.attributes.ingredients
        // debugger
        Cocktail.allCocktails.push(this)
        
    }

        static renderCocktails(){
        for (let cocktail of this.allCocktails){
           
            cocktail.renderCocktail()
        }
    }
         static fetchCocktails(){
             fetch(cocktailsURL)
            .then(response => response.json())
            .then(cocktails => {
            // debugger
             
                for(let cocktail of cocktails.data){
                let newCocktailList = new Cocktail(cocktail)
              newCocktailList.renderCocktail       
        }

        this.renderCocktails()
        })
     
    }
        renderCocktail(){
     
        const cocktailList = document.getElementById("cocktail-list")
        const cocktailLi = document.createElement('li')
        
        cocktailLi.dataset.id = this.id
        cocktailList.appendChild(cocktailLi)
        //cocktail html 
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
        //rendering ingredients per cocktail
        this.ingredients.forEach(ingredient =>{
            
            let newIngr = new Ingredient(ingredient)
           newIngr.renderIngredient(ingredientList)
        
    })
    
    cocktailLi.append( h3, img, ingredientList, ingredientForm, p, deleteBtn)

    cocktailForm.reset()
 
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
        // debugger
        let newCocktail = new Cocktail(cocktail.data)
        console.log(newCocktail)
        newCocktail.renderCocktail()
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

