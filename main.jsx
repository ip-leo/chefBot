import React from 'react';
import IngredientsList from './IngredientsList';
import ChefBotRecipe from './ChefBotRecipe';
import { getRecipe } from './Response';

export default function Main({
    ingredients,
    setIngredients,
    recipeShown,
    setRecipeShown,
    inputValue,
    setInputValue
}) {
    function removeIngredient(ingredientToRemove) {
        setIngredients(prev =>
            prev.filter(ingredient => ingredient !== ingredientToRemove)
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get('ingredient');
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            setInputValue("");
        }
    }

    async function toggleRecipeShown() {
        const recipeMarkdown = await getRecipe(ingredients);
        setRecipeShown(recipeMarkdown);
    }

    return (
        <main>
            {ingredients.length < 3 && (
                <h2 className="intro">Enter what ingredients you have! (Minimum 3)</h2>
            )}

            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. eggs"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                    removeIngredient={removeIngredient}
                />
            )}

            {recipeShown && <ChefBotRecipe recipeShown={recipeShown} />}
        </main>
    );
}
