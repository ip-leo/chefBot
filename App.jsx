import React from 'react';
import Main from './main';
import Header from './Header';

export default function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");

    function handleReset() {
        setIngredients([]);
        setRecipeShown("");
        setInputValue("");
    }

    return (
        <>
            <Header handleReset={handleReset} />
            <Main
                ingredients={ingredients}
                setIngredients={setIngredients}
                recipeShown={recipeShown}
                setRecipeShown={setRecipeShown}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        </>
    );
}
