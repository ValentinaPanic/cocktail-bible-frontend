class Cocktail{

    static allCocktails = []

    constructor(cocktail){
       
        this.id = cocktail.id
        this.name = cocktail.attributes.name
        this.image = cocktail.attributes.image
        this.instructions = cocktail.attributes.instructions
        this.ingredients = cocktail.attributes.ingredients
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
            for(let cocktail of cocktails.data){
            let newCocktailList = new Cocktail(cocktail)
          
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
        h3.innerText = this.name
        const img = document.createElement('img')
        img.src = this.image
        img.width = 200
        const p = document.createElement('p')
        p.innerText = this.instructions

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
        this.ingredients.forEach(ingredient =>{
        const ingredientLi = document.createElement('li')
        ingredientLi.innerText = ingredient.name

        ingredientList.appendChild(ingredientLi)
        
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
        
        let newCocktail = new Cocktail(cocktail)
        newCocktail.renderCocktail()}
        )}
}

