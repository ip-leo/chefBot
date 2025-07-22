import ReactMarkdown from 'react-markdown'

export default function ChefBotRecipe(props) {
    return(
        <section class = "recipe-container" aria-live='polite'>
            <h2>Suggested Recipe</h2>
            <ReactMarkdown>{props.recipeShown}</ReactMarkdown>
        </section>
    )

}