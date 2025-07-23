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
    const recipeSection = React.useRef(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (recipeShown !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [recipeShown])

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
        if (ingredients.length < 3) {
            setError("Please enter at least 3 ingredients to get a recipe.");
            return

        }
        setRecipeShown("");    
        setIsLoading(true)
        setError("")
        const TIMEOUT_MS = 10_000
        const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out. Please try again.")), TIMEOUT_MS))
        try {
        const recipeMarkdown = await Promise.race([
        getRecipe(ingredients),
        timeoutPromise
        ])
        setRecipeShown(recipeMarkdown || "")
        } catch (err) {
            setError(err.message)
        } 
        finally {
            setIsLoading(false)
        }
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
                    ref = {recipeSection}
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                    removeIngredient={removeIngredient}
                />
            )}
            {isLoading && (
            <div className="loading-container">
                <img src="/loading.gif" alt="Loading…" />
            </div>
            )}


            {!isLoading && !error && recipeShown && (
                <div ref={recipeSection}>
                <ChefBotRecipe recipeShown={recipeShown} />
                </div>
            )}

            {error && (
            <div className="error-message" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p>{error}</p>
            <button className="retry-button" onClick={toggleRecipeShown} disabled={isLoading}>
                Retry
            </button>
            </div>
            )}

        </main>
    );
}
