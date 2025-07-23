import cross from './cross.png';
export default function IngredientsList(props) {
    const ingredientListItems = props.ingredients.map((ingredient) => (
        <li key={ingredient}>
            <span className="ingredient-text">{ingredient}</span>
            <button 
                className ="remove"
                onClick={() => props.removeIngredient(ingredient)} 
                aria-label={`Remove ${ingredient}`}
            >
                <img src={cross} alt = "remove"/>
            </button>
        
        
        </li>
        
    ))
    return(
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientListItems}</ul>
            {props.ingredients.length > 2 && <div className="get-recipe-container">
                <div ref ={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>)

}